import { test, expect } from '@playwright/test';
import { PRACTICES } from '../src/data/practices.js';

const ROUTES = [
  '/', '/about-us', '/us-international-practice', '/drt-alliance', '/representative-matters', '/honors-recognitions',
  '/areas-of-practice', '/attorneys', '/investigators', '/offices', '/insights', '/contact',
  ...PRACTICES.map(p => `/areas-of-practice/${p.slug}`),
];

const isDesktop = testInfo => testInfo.project.name.startsWith('desktop') || testInfo.project.name.startsWith('laptop');

async function scrollThrough(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); }
    window.scrollTo(0, 0);
  });
}

test.describe('Every page', () => {
  for (const route of ROUTES) {
    test(`renders cleanly: ${route}`, async ({ page }) => {
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(route, { waitUntil: 'networkidle' });

      // Exactly one H1, and a unique document title
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page).toHaveTitle(/Diaz Reus/);

      await scrollThrough(page);
      await page.waitForLoadState('networkidle');

      // No horizontal overflow
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, 'horizontal overflow (px)').toBeLessThanOrEqual(0);

      // No broken images (every rendered <img> decoded with real dimensions)
      const broken = await page.evaluate(async () => {
        const imgs = [...document.images].filter(i => i.getBoundingClientRect().width > 0);
        imgs.forEach(i => { i.loading = 'eager'; });
        const settle = i => (i.complete && i.naturalWidth) ? null : Promise.race([i.decode().catch(() => {}), new Promise(r => setTimeout(r, 15000))]);
        await Promise.all(imgs.map(settle));
        return imgs.filter(i => i.naturalWidth === 0).map(i => i.currentSrc || i.src);
      });
      expect(broken, 'broken images').toEqual([]);

      // Every image has an alt attribute (decorative ones use alt="")
      const missingAlt = await page.locator('img:not([alt])').count();
      expect(missingAlt).toBe(0);

      // Shared container: every .container-x has the same left edge and never exceeds 1280px
      const containers = await page.evaluate(() => [...document.querySelectorAll('.container-x')]
        .filter(el => el.offsetParent !== null && !el.closest('[role="dialog"]'))
        .map(el => { const r = el.getBoundingClientRect(); return { left: Math.round(r.left), width: Math.round(r.width) }; }));
      expect(containers.length).toBeGreaterThan(2);
      const lefts = new Set(containers.map(c => c.left));
      expect([...lefts], 'container left edges').toHaveLength(1);
      for (const c of containers) expect(c.width).toBeLessThanOrEqual(1280);

      expect(errors, 'console / page errors').toEqual([]);
    });
  }
});

test.describe('Navigation', () => {
  test('desktop: primary nav, mega menu and dropdown', async ({ page }, testInfo) => {
    test.skip(!isDesktop(testInfo), 'desktop only');
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Primary' });
    await nav.getByRole('button', { name: 'Areas of Practice menu' }).click();
    await expect(page.getByRole('link', { name: 'Blockchain & Cryptocurrency' }).first()).toBeVisible();
    await page.getByRole('link', { name: 'Blockchain & Cryptocurrency' }).first().click();
    await expect(page).toHaveURL(/blockchain-and-cryptocurrency/);
    await expect(page.locator('h1')).toHaveAttribute('aria-label', 'Blockchain & Cryptocurrency');

    await nav.getByRole('link', { name: 'Global Offices' }).click();
    await expect(page).toHaveURL(/\/offices$/);
    await nav.getByRole('button', { name: 'About Us menu' }).click();
    await page.getByRole('link', { name: /Representative Matters/ }).first().click();
    await expect(page).toHaveURL(/representative-matters/);
  });

  test('sticky header stays visible after scrolling', async ({ page }) => {
    await page.goto('/');
    await page.mouse.wheel(0, 3000);
    await page.waitForTimeout(400);
    const top = await page.locator('header').evaluate(h => h.getBoundingClientRect().top);
    expect(top).toBe(0);
  });

  test('mobile/tablet: single menu toggle and working drawer', async ({ page }, testInfo) => {
    test.skip(isDesktop(testInfo), 'touch layouts only');
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Open menu' })).toHaveCount(1);
    await page.getByRole('button', { name: 'Open menu' }).click();
    const menu = page.getByRole('dialog', { name: 'Menu' });
    await expect(menu).toBeVisible();
    await menu.getByRole('button', { name: 'Show Areas of Practice links' }).click();
    await menu.getByRole('link', { name: 'Family Law' }).click();
    await expect(page).toHaveURL(/family-law/);
    await expect(menu).toBeHidden();
  });

  test('legacy diazreus.com URLs redirect', async ({ page }) => {
    await page.goto('/attorneys-conselors');
    await expect(page).toHaveURL(/\/attorneys$/);
    await page.goto('/drt-alliance-3');
    await expect(page).toHaveURL(/\/drt-alliance$/);
    await page.goto('/news-events');
    await expect(page).toHaveURL(/\/insights$/);
  });

  test('unknown route shows 404', async ({ page }) => {
    await page.goto('/this-does-not-exist');
    await expect(page.locator('h1')).toHaveText(/could not be found/);
  });
});

test.describe('Search', () => {
  test('finds an attorney and opens the profile', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Search/ }).first().click();
    await page.getByRole('combobox', { name: 'Search' }).fill('Michael Diaz');
    await page.getByRole('option').first().click();
    await expect(page).toHaveURL(/attorneys\?person=michael-diaz-jr/);
    await expect(page.getByRole('dialog', { name: 'Michael Diaz, Jr.' })).toBeVisible();
  });
});

test.describe('Attorney directory', () => {
  test('filters by region, office, practice and name', async ({ page }) => {
    await page.goto('/attorneys');
    const count = async () => Number((await page.getByText(/^\d+ attorneys?$/).textContent()).split(' ')[0]);
    const all = await count();
    expect(all).toBeGreaterThan(50);

    await page.getByRole('combobox', { name: 'Region' }).selectOption('Europe');
    const europe = await count();
    expect(europe).toBeGreaterThan(0);
    expect(europe).toBeLessThan(all);

    await page.getByRole('combobox', { name: 'Office' }).selectOption('frankfurt');
    expect(await count()).toBe(2);

    await page.getByRole('button', { name: /Clear filters/ }).click();
    await page.getByLabel('Name').fill('Coronado');
    expect(await count()).toBe(1);

    await page.getByRole('button', { name: /Clear filters/ }).click();
    await page.getByRole('combobox', { name: 'Practice area' }).selectOption('white-collar-crime-government-sanctions');
    expect(await count()).toBeGreaterThan(0);
    expect(page.url()).toContain('practice=white-collar-crime-government-sanctions');
  });

  test('profile drawer shows bio, contact and closes with Escape', async ({ page }) => {
    await page.goto('/attorneys');
    await page.getByRole('button', { name: 'View profile of Robert I. Targ' }).click();
    const drawer = page.getByRole('dialog', { name: 'Robert I. Targ' });
    await expect(drawer).toBeVisible();
    await expect(drawer.getByRole('link', { name: /rtarg@diazreus.com/ })).toHaveAttribute('href', 'mailto:rtarg@diazreus.com');
    await expect(drawer.getByLabel('Biography')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(drawer).toBeHidden();
  });
});

test.describe('Offices', () => {
  test('region tabs and search filter the directory', async ({ page }) => {
    await page.goto('/offices');
    await expect(page.getByText('41 offices', { exact: true })).toBeVisible();
    await page.getByRole('tab', { name: /^Europe/ }).click();
    await expect(page.getByText('8 offices', { exact: true })).toBeVisible();
    await page.getByRole('tab', { name: /^All/ }).click();
    await page.getByPlaceholder('Search city, country or address').fill('Shanghai');
    await expect(page.getByText('1 office', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Shanghai' })).toBeVisible();
  });

  test('home map: selecting an office updates the detail panel', async ({ page }) => {
    await page.goto('/');
    const section = page.locator('#global-presence');
    await section.scrollIntoViewIfNeeded();
    await section.getByRole('button', { name: 'Madrid, Spain' }).click();
    await expect(section.getByText('Avda. de Brasil, 17, 28020 Madrid')).toBeVisible();
  });
});

test.describe('Practice areas', () => {
  test('directory search narrows results', async ({ page }) => {
    await page.goto('/areas-of-practice');
    await expect(page.getByText(`Showing ${PRACTICES.length} of ${PRACTICES.length} practice areas`)).toBeVisible();
    await page.getByPlaceholder('Search practice areas').fill('OFAC');
    await expect(page.getByText(/Showing [1-9] of/)).toBeVisible();
  });

  test('every practice page has hero, services, related areas and CTA', async ({ page }) => {
    for (const p of PRACTICES) {
      await page.goto(`/areas-of-practice/${p.slug}`);
      await expect(page.locator('h1')).toHaveAttribute('aria-label', p.title);
      await expect(page.getByRole('heading', { name: 'Legal services' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Explore related areas.' })).toBeAttached();
      await expect(page.getByRole('link', { name: /Discuss your matter/ })).toBeVisible();
    }
  });

  test('cards in a grid row share the same height', async ({ page }, testInfo) => {
    test.skip(!isDesktop(testInfo), 'multi-column layouts');
    await page.goto('/areas-of-practice');
    const heights = await page.locator('main ul li article').evaluateAll(els => els.slice(0, 3).map(e => Math.round(e.getBoundingClientRect().height)));
    expect(new Set(heights).size).toBe(1);
  });
});

test.describe('Contact form', () => {
  test('validates required fields and shows the disclaimer', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByText(/does not establish an attorney-client relationship/).first()).toBeVisible();
    await page.getByRole('button', { name: /Send message/ }).click();
    await expect(page.getByText('Please enter your full name.')).toBeVisible();
    await expect(page.getByText('Please enter your email address.')).toBeVisible();
    await expect(page.getByLabel(/Full name/)).toBeFocused();
  });

  test('submits original CF7 field names (endpoint mocked)', async ({ page }) => {
    let body = '';
    await page.route('**/contact-form-7/v1/contact-forms/476/feedback', async route => {
      body = route.request().postData() || '';
      await route.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify({ status: 'mail_sent' }) });
    });
    await page.goto('/contact');
    await page.getByLabel(/Full name/).fill('Test Person');
    await page.getByLabel(/Company/).fill('Example Co');
    await page.getByLabel(/^Email/).fill('test@example.com');
    await page.getByLabel(/How can we help/).fill('We need advice on a cross-border dispute.');
    await page.getByLabel(/I understand/).check();
    await page.getByRole('button', { name: /Send message/ }).click();
    await expect(page.getByRole('status')).toContainText('Thank you, Test.');
    for (const field of ['name="fullname"', 'name="company"', 'name="comment"', 'name="_wpcf7"']) expect(body).toContain(field);
  });

  test('falls back to a prefilled email when the endpoint is unreachable', async ({ page }) => {
    await page.route('**/contact-form-7/**', route => route.abort());
    await page.goto('/contact');
    await page.getByLabel(/Full name/).fill('Test Person');
    await page.getByLabel(/^Email/).fill('test@example.com');
    await page.getByLabel(/How can we help/).fill('We need advice on a cross-border dispute.');
    await page.getByLabel(/I understand/).check();
    await page.getByRole('button', { name: /Send message/ }).click();
    await expect(page.getByRole('link', { name: 'Send via email' })).toHaveAttribute('href', /^mailto:info@diazreus\.com/);
  });
});

test.describe('Accessibility basics', () => {
  test('skip link and keyboard focus', async ({ page }, testInfo) => {
    test.skip(!isDesktop(testInfo), 'keyboard');
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  });

  test('content is visible with reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByRole('heading', { name: /International Perspective/ })).toBeVisible();
  });
});
