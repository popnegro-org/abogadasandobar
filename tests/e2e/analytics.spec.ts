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

  await expect.poll(() => analyticsRequests.length).toBe(0);

  const analyticsGlobals = await page.evaluate(() => ({
    gtag: typeof (window as Window & { gtag?: unknown }).gtag,
    dataLayer: typeof (window as Window & { dataLayer?: unknown }).dataLayer,
  }));

  expect(analyticsGlobals.gtag).toBe('undefined');
  expect(analyticsGlobals.dataLayer).toBe('undefined');
});
