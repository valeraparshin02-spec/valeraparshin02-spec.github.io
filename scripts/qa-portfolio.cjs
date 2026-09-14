const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const base = process.env.QA_URL || 'http://127.0.0.1:4173/';
const output = path.resolve('.qa');
fs.mkdirSync(output, { recursive: true });
(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const results = [];
  for (const width of [1440, 1024, 768, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: 950 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(output, `hero-${width}.png`) });
    await page.evaluate(async () => {
      for (const img of document.images) img.loading = 'eager';
      await Promise.all([...document.images].map(img => img.decode().catch(() => {})));
    });
    await page.screenshot({ path: path.join(output, `desktop-${width}.png`), fullPage: width === 1440 || width === 390 });
    const geometry = await page.evaluate(() => ({
      width: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      cards: document.querySelectorAll('.project').length,
      hidden: [...document.querySelectorAll('section')].filter(e => getComputedStyle(e).opacity === '0' || getComputedStyle(e).filter !== 'none').map(e => e.id),
      images: [...document.images].filter(e => !e.complete || !e.naturalWidth).map(e => e.src),
      overflow: [...document.querySelectorAll('body *')].filter(e => {const r=e.getBoundingClientRect(); return r.width && (r.right > innerWidth + 1 || r.left < -1) && !e.closest('.skip-link')}).map(e=>e.className?.baseVal ?? e.className ?? e.tagName),
    }));
    if (width <= 800) await page.getByRole('button', { name: 'Открыть меню', exact: true }).click();
    await page.locator('.navigation a[href="#cases"]').click();
    const target = await page.locator('#cases').boundingBox();
    const header = await page.locator('.header').boundingBox();
    if (target.y < header.height - 1) errors.push('Cases anchor covered by header');
    if (width <= 800 && await page.locator('.menu-toggle').getAttribute('aria-expanded') !== 'false') errors.push('Menu did not close');
    const gallery = page.locator('.project').first();
    await gallery.getByRole('button', { name: 'Следующий экран Altera Estate', exact: true }).click();
    if (!(await gallery.locator('.project-frame img').getAttribute('src')).includes('02.')) errors.push('Gallery next failed');
    await gallery.getByRole('button', { name: 'Предыдущий экран Altera Estate', exact: true }).click();
    if (!(await gallery.locator('.project-frame img').getAttribute('src')).includes('01.')) errors.push('Gallery previous failed');
    const detail = page.locator('.project-details').first();
    await detail.locator('summary').click();
    if (!(await detail.getAttribute('open') !== null)) errors.push('Details failed');
    for (const id of ['services', 'approach', 'process', 'contact']) {
      await page.evaluate(id => { location.hash = id; }, id);
      const box = await page.locator(`#${id}`).boundingBox();
      if (box.y < header.height - 1) errors.push(`${id} anchor covered`);
    }
    const brokenLinks = await page.locator('a[href=""],a[href="#"],a:not([href])').count();
    results.push({ ...geometry, anchorTop: target.y, brokenLinks, errors });
    await page.close();
  }
  await browser.close();
  console.log(JSON.stringify(results, null, 2));
  fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify(results, null, 2));
  if (results.some(r => r.errors.length || r.scrollWidth > r.width || r.hidden.length || r.images.length || r.overflow.length || r.brokenLinks || r.cards !== 7)) process.exitCode = 1;
})().catch(e => { console.error(e); process.exitCode = 1 });
