// Contact submission — preserves the existing diazreus.com Contact Form 7 integration.
// Original form: id 476 on /contact (fields: fullname, company, comment). The redesign
// keeps those field names and adds email + phone so the firm can actually reply.
//
// The CF7 REST endpoint only accepts the request when this site is served from
// diazreus.com (same origin) or the WordPress install allows this origin via CORS.
// If the request cannot be completed, we fall back to a prefilled email to info@diazreus.com
// so an inquiry is never silently lost.

export const CF7_ENDPOINT = 'https://diazreus.com/wp-json/contact-form-7/v1/contact-forms/476/feedback';
export const FALLBACK_EMAIL = 'info@diazreus.com';

export function validate(values) {
  const errors = {};
  if (!values.fullname?.trim()) errors.fullname = 'Please enter your full name.';
  if (!values.email?.trim()) errors.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (values.phone && !/^[+()\d\s.-]{6,}$/.test(values.phone)) errors.phone = 'Please enter a valid phone number.';
  if (!values.comment?.trim() || values.comment.trim().length < 10) errors.comment = 'Please tell us briefly how we can help (10+ characters).';
  if (!values.consent) errors.consent = 'Please acknowledge the notice above.';
  return errors;
}

export function mailtoHref(v) {
  const body = [
    `Name: ${v.fullname}`,
    v.company && `Company: ${v.company}`,
    `Email: ${v.email}`,
    v.phone && `Phone: ${v.phone}`,
    v.office && `Preferred office: ${v.office}`,
    '',
    v.comment,
  ].filter(x => x !== undefined && x !== false && x !== '').join('\n');
  return `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent('Website inquiry — ' + v.fullname)}&body=${encodeURIComponent(body)}`;
}

/** Returns { ok: true } on success, or { ok: false, fallback: mailto } when the endpoint is unavailable. */
export async function submitInquiry(v) {
  const fd = new FormData();
  fd.append('_wpcf7', '476');
  fd.append('_wpcf7_unit_tag', 'wpcf7-f476-o1');
  fd.append('_wpcf7_container_post', '0');
  fd.append('fullname', v.fullname);
  fd.append('company', v.company || '');
  fd.append('comment', [v.comment, '', `Email: ${v.email}`, v.phone && `Phone: ${v.phone}`, v.office && `Preferred office: ${v.office}`].filter(Boolean).join('\n'));
  fd.append('your-email', v.email);
  fd.append('phone', v.phone || '');
  try {
    const res = await fetch(CF7_ENDPOINT, { method: 'POST', body: fd });
    const json = await res.json().catch(() => ({}));
    if (res.ok && json.status === 'mail_sent') return { ok: true };
    return { ok: false, fallback: mailtoHref(v), message: json.message };
  } catch {
    return { ok: false, fallback: mailtoHref(v) };
  }
}
