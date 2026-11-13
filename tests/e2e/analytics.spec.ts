import { expect, test } from '@playwright/test';

test('does not load the production GA4 tag on localhost or Preview hosts', async ({ page }) => {
  const analyticsRequests: string[] = [];

  page.on('request', (request) => {
    const url = request.url();
    if (
      url.includes('googletagmanager.com/gtag/js') ||
      url.includes('google-analytics.com/g/collect') ||
      url.includes('region1.google-analytics.com/g/collect')
    ) {
      analyticsRequests.push(url);
    }
  });

  await page.goto('/');
  // The tag loader uses requestIdleCallback (4s timeout) or a 2.5s fallback.
  await page.waitForTimeout(4500);

  expect(analyticsRequests).toHaveLength(0);

  const analyticsGlobals = await page.evaluate(() => ({
    gtag: typeof (window as Window & { gtag?: unknown }).gtag,
    dataLayer: typeof (window as Window & { dataLayer?: unknown }).dataLayer,
  }));

  expect(analyticsGlobals.gtag).toBe('undefined');
  expect(analyticsGlobals.dataLayer).toBe('undefined');
});
