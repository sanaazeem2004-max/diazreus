import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2, Mail, AlertCircle } from 'lucide-react';
import { validate, submitInquiry } from '../lib/contact.js';
import { CONTACT_DISCLAIMER } from '../data/site.js';
import { OFFICES, REGIONS } from '../data/offices.generated.js';

const INITIAL = { fullname: '', company: '', email: '', phone: '', office: '', comment: '', consent: false };

function Field({ id, label, error, required, children }) {
  return (
    <div>
      <label htmlFor={id} className="field-label">{label}{required && <span className="text-brand" aria-hidden> *</span>}</label>
      {children}
      {error && <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1 text-[13px] text-red-700"><AlertCircle className="h-3.5 w-3.5" aria-hidden />{error}</p>}
    </div>
  );
}

export default function ContactForm({ className = '' }) {
  const [v, setV] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({ status: 'idle' });

  const set = k => e => setV(s => ({ ...s, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const a11y = k => ({ id: `cf-${k}`, name: k, 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `cf-${k}-error` : undefined });

  const onSubmit = async e => {
    e.preventDefault();
    const errs = validate(v);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`cf-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setState({ status: 'sending' });
    const res = await submitInquiry(v);
    setState(res.ok ? { status: 'sent' } : { status: 'fallback', href: res.fallback });
  };

  return (
    <div className={`relative rounded-xl2 bg-mist p-6 sm:p-10 ${className}`}>
      <AnimatePresence mode="wait">
        {state.status === 'sent' ? (
          <motion.div key="ok" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[420px] flex-col items-start justify-center" role="status">
            <CheckCircle2 className="h-10 w-10 text-brand" aria-hidden />
            <p className="mt-5 text-2xl font-medium tracking-tight">Thank you, {v.fullname.split(' ')[0]}.</p>
            <p className="mt-2 max-w-md text-ink-500">Your message has been sent to Diaz Reus. A member of our team will be in touch.</p>
            <button onClick={() => { setV(INITIAL); setState({ status: 'idle' }); }} className="btn btn-outline mt-8">Send another message</button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} aria-label="Contact Diaz Reus">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="cf-fullname" label="Full name" required error={errors.fullname}>
                <input {...a11y('fullname')} value={v.fullname} onChange={set('fullname')} autoComplete="name" placeholder="First and last name" className="field" />
              </Field>
              <Field id="cf-company" label="Company" error={errors.company}>
                <input {...a11y('company')} value={v.company} onChange={set('company')} autoComplete="organization" placeholder="The company you represent" className="field" />
              </Field>
              <Field id="cf-email" label="Email" required error={errors.email}>
                <input {...a11y('email')} type="email" value={v.email} onChange={set('email')} autoComplete="email" placeholder="name@company.com" className="field" />
              </Field>
              <Field id="cf-phone" label="Phone" error={errors.phone}>
                <input {...a11y('phone')} type="tel" value={v.phone} onChange={set('phone')} autoComplete="tel" placeholder="+1 (000) 000-0000" className="field" />
              </Field>
              <div className="sm:col-span-2">
                <Field id="cf-office" label="Preferred office">
                  <select {...a11y('office')} value={v.office} onChange={set('office')} className="field cursor-pointer">
                    <option value="">All locations</option>
                    {REGIONS.map(r => (
                      <optgroup key={r} label={r}>
                        {OFFICES.filter(o => o.region === r).map(o => <option key={o.slug} value={`${o.city}, ${o.country}`}>{o.city}, {o.country}</option>)}
                      </optgroup>
                    ))}
                  </select>
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field id="cf-comment" label="How can we help?" required error={errors.comment}>
                  <textarea {...a11y('comment')} value={v.comment} onChange={set('comment')} rows={4} placeholder="What we can do for you" className="field resize-y" />
                </Field>
              </div>
            </div>
            <p className="mt-6 rounded-2xl bg-white p-4 text-[13px] leading-relaxed text-ink-500" id="contact-disclaimer">{CONTACT_DISCLAIMER}</p>
            <label className="mt-4 flex cursor-pointer items-start gap-3 text-[13px] text-ink-600">
              <input type="checkbox" {...a11y('consent')} checked={v.consent} onChange={set('consent')} className="mt-0.5 h-4 w-4 rounded border-line text-ink focus:ring-ink" />
              <span>I understand that submitting this form does not create an attorney-client relationship.</span>
            </label>
            {errors.consent && <p id="cf-consent-error" className="mt-1.5 text-[13px] text-red-700">{errors.consent}</p>}

            {state.status === 'fallback' && (
              <div className="mt-5 rounded-2xl border border-line bg-white p-4 text-sm" role="alert">
                <p className="font-medium">We couldn’t reach our form service from this page.</p>
                <p className="mt-1 text-ink-500">Your message is ready — send it by email instead and it will reach the same team.</p>
                <a href={state.href} className="btn btn-dark mt-3 !py-2.5"><Mail className="h-4 w-4" />Send via email</a>
              </div>
            )}

            <button type="submit" disabled={state.status === 'sending'} className="btn btn-dark mt-6 w-full disabled:opacity-70">
              {state.status === 'sending' ? <><Loader2 className="h-4 w-4 animate-spin" />Sending…</> : <>Send message <ArrowRight className="h-4 w-4" /></>}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
