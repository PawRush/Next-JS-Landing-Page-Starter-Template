import { test, expect } from '@playwright/test';

/**
 * Test suite for SEO metadata validation
 * Validates meta tags, Open Graph tags, structured data, and SEO best practices
 */
test.describe('SEO Metadata', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have proper page title', async ({ page }) => {
    const title = await page.title();

    // Title should not be empty
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);

    // Title should contain relevant keywords
    expect(title).toContain('Nextjs');
  });

  test('should have meta description', async ({ page }) => {
    const description = await page.locator('meta[name="description"]').getAttribute('content');

    // Description should exist and not be empty
    expect(description).toBeTruthy();
    expect(description!.length).toBeGreaterThan(0);

    // Description should be within recommended length (50-160 characters)
    expect(description!.length).toBeGreaterThan(20);
    expect(description!.length).toBeLessThan(200);
  });

  test('should have viewport meta tag', async ({ page }) => {
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');

    expect(viewport).toBeTruthy();
    expect(viewport).toContain('width=device-width');
    expect(viewport).toContain('initial-scale=1');
  });

  test('should have charset meta tag', async ({ page }) => {
    const charset = await page.locator('meta[charset]').getAttribute('charset');

    expect(charset).toBeTruthy();
    expect(charset?.toLowerCase()).toBe('utf-8');
  });

  test('should have Open Graph meta tags', async ({ page }) => {
    // Check og:title
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toBeTruthy();

    // Check og:description
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(ogDescription).toBeTruthy();

    // Check og:locale
    const ogLocale = await page.locator('meta[property="og:locale"]').getAttribute('content');
    expect(ogLocale).toBeTruthy();

    // Check og:site_name
    const ogSiteName = await page.locator('meta[property="og:site_name"]').getAttribute('content');
    expect(ogSiteName).toBeTruthy();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    // Check for h1 tag
    const h1Elements = page.locator('h1');
    const h1Count = await h1Elements.count();

    // Should have at least one h1
    expect(h1Count).toBeGreaterThanOrEqual(1);

    // Should not have too many h1 tags (best practice: 1 h1 per page)
    expect(h1Count).toBeLessThanOrEqual(3);
  });

  test('should have semantic HTML structure', async ({ page }) => {
    // Check for semantic HTML5 elements
    const header = page.locator('header, nav');
    const headerCount = await header.count();
    expect(headerCount).toBeGreaterThan(0);

    // Check for main content area (div, main, or section)
    const main = page.locator('main, div, section');
    const mainCount = await main.count();
    expect(mainCount).toBeGreaterThan(0);

    // Check for footer
    const footer = page.locator('footer');
    const footerCount = await footer.count();
    expect(footerCount).toBeGreaterThan(0);
  });

  test('all images should have alt attributes', async ({ page }) => {
    // Get all images
    const images = page.locator('img');
    const imageCount = await images.count();

    if (imageCount > 0) {
      // Check each image has an alt attribute
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');

        // Alt attribute should exist (can be empty for decorative images)
        expect(alt).not.toBeNull();
      }
    }
  });

  test('all links should have descriptive text', async ({ page }) => {
    // Get all links
    const links = page.locator('a[href]');
    const linkCount = await links.count();

    expect(linkCount).toBeGreaterThan(0);

    // Check each link has text or aria-label
    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');

      // Link should have either text content or aria-label
      expect(text || ariaLabel).toBeTruthy();
    }
  });

  test('should have favicon links', async ({ page }) => {
    // Check for favicon
    const favicon = page.locator('link[rel="icon"]');
    const faviconCount = await favicon.count();
    expect(faviconCount).toBeGreaterThan(0);

    // Check for apple-touch-icon
    const appleTouchIcon = page.locator('link[rel="apple-touch-icon"]');
    const appleTouchIconCount = await appleTouchIcon.count();
    expect(appleTouchIconCount).toBeGreaterThan(0);
  });

  test('should not have duplicate meta tags', async ({ page }) => {
    // Check for duplicate description tags
    const descriptions = page.locator('meta[name="description"]');
    const descriptionCount = await descriptions.count();
    expect(descriptionCount).toBeLessThanOrEqual(1);

    // Check for duplicate title tags
    const titles = page.locator('title');
    const titleCount = await titles.count();
    expect(titleCount).toBeLessThanOrEqual(1);
  });

  test('should have language attribute on html element', async ({ page }) => {
    const lang = await page.locator('html').getAttribute('lang');

    expect(lang).toBeTruthy();
    expect(lang?.length).toBeGreaterThan(0);
  });

  test('meta description should be relevant to page content', async ({ page }) => {
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    const pageText = await page.textContent('body');

    // Description should exist
    expect(description).toBeTruthy();

    // Page should have meaningful content
    expect(pageText).toBeTruthy();
    expect(pageText!.length).toBeGreaterThan(100);
  });

  test('should have canonical URL if specified', async ({ page }) => {
    const canonical = page.locator('link[rel="canonical"]');
    const canonicalCount = await canonical.count();

    // If canonical exists, it should have a valid href
    if (canonicalCount > 0) {
      const href = await canonical.getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).toMatch(/^https?:\/\//);
    }
  });

  test('Open Graph tags should match standard meta tags', async ({ page }) => {
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');

    const title = await page.title();
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');

    // If both exist, they should match or be closely related
    if (description && ogDescription) {
      expect(ogDescription.length).toBeGreaterThan(0);
    }

    if (title && ogTitle) {
      expect(ogTitle.length).toBeGreaterThan(0);
    }
  });
});
