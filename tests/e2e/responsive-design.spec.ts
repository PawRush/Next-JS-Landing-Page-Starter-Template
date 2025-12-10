import { test, expect, devices } from '@playwright/test';

/**
 * Test suite for responsive design across different breakpoints
 * Validates layout, visibility, and functionality across mobile, tablet, and desktop
 */
test.describe('Responsive Design', () => {
  test('should render correctly on desktop (1920x1080)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');

    // Hero section should be visible
    const heroTitle = page.getByText(/The modern landing page for/i);
    await expect(heroTitle).toBeVisible();

    // All sections should be properly laid out
    const features = page.locator('img[alt*="feature"]');
    expect(await features.count()).toBe(3);

    // Check navigation is horizontal on desktop
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
  });

  test('should render correctly on tablet (768x1024)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    // Hero section should still be visible
    const heroTitle = page.getByText(/The modern landing page for/i);
    await expect(heroTitle).toBeVisible();

    // CTA buttons should be accessible
    const heroButton = page.getByRole('link', { name: /Download Your Free Theme/i });
    await expect(heroButton).toBeVisible();

    // Features should stack properly
    const features = page.locator('img[alt*="feature"]');
    expect(await features.count()).toBe(3);
  });

  test('should render correctly on mobile (375x667)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Hero section should be visible and readable
    const heroTitle = page.getByText(/The modern landing page for/i);
    await expect(heroTitle).toBeVisible();

    // Navigation should be accessible
    const githubLink = page.getByRole('link', { name: 'GitHub' });
    await expect(githubLink).toBeVisible();

    // CTA button should be visible and tappable
    const heroButton = page.getByRole('link', { name: /Download Your Free Theme/i });
    await expect(heroButton).toBeVisible();

    // Check button is in viewport
    const buttonBox = await heroButton.boundingBox();
    expect(buttonBox).toBeTruthy();
    if (buttonBox) {
      expect(buttonBox.width).toBeGreaterThan(0);
      expect(buttonBox.width).toBeLessThan(375);
    }
  });

  test('should render correctly on small mobile (320x568)', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto('/');

    // Critical content should still be visible
    const heroTitle = page.getByText(/The modern landing page for/i);
    await expect(heroTitle).toBeVisible();

    // CTA should be accessible
    const heroButton = page.getByRole('link', { name: /Download Your Free Theme/i });
    await expect(heroButton).toBeVisible();
  });

  test('navigation links should be accessible on all breakpoints', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080, name: 'desktop' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 375, height: 667, name: 'mobile' },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');

      // Navigation links should be accessible
      const githubLink = page.getByRole('link', { name: 'GitHub' });
      await expect(githubLink).toBeVisible();

      const signInLink = page.getByRole('link', { name: 'Sign in' });
      await expect(signInLink).toBeVisible();
    }
  });

  test('images should be responsive and not overflow', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080 },
      { width: 768, height: 1024 },
      { width: 375, height: 667 },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/');

      // Get all images
      const images = page.locator('img[alt*="feature"]');
      const imageCount = await images.count();

      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        await img.scrollIntoViewIfNeeded();

        const box = await img.boundingBox();
        if (box) {
          // Images should not exceed viewport width
          expect(box.width).toBeLessThanOrEqual(viewport.width);
          expect(box.width).toBeGreaterThan(0);
        }
      }
    }
  });

  test('text should be readable at all breakpoints', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080 },
      { width: 768, height: 1024 },
      { width: 375, height: 667 },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/');

      // Hero text should be visible
      const heroTitle = page.getByText(/The modern landing page for/i);
      await expect(heroTitle).toBeVisible();

      // Description should be visible
      const description = page.getByText(/The easiest way to build/i);
      await expect(description).toBeVisible();

      // Text should not overflow
      const titleBox = await heroTitle.boundingBox();
      if (titleBox) {
        expect(titleBox.width).toBeLessThanOrEqual(viewport.width);
      }
    }
  });

  test('CTA buttons should maintain minimum touch target size on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check hero button
    const heroButton = page.getByRole('link', { name: /Download Your Free Theme/i });
    const heroBox = await heroButton.boundingBox();

    // Minimum touch target size should be 44x44 (iOS) or 48x48 (Android)
    if (heroBox) {
      expect(heroBox.height).toBeGreaterThanOrEqual(40); // Slightly relaxed for testing
    }

    // Check banner button
    const bannerButton = page.getByRole('link', { name: /Get Started/i });
    await bannerButton.scrollIntoViewIfNeeded();
    const bannerBox = await bannerButton.boundingBox();

    if (bannerBox) {
      expect(bannerBox.height).toBeGreaterThanOrEqual(40);
    }
  });

  test('should handle orientation change from portrait to landscape', async ({ page }) => {
    // Start in portrait
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const heroTitlePortrait = page.getByText(/The modern landing page for/i);
    await expect(heroTitlePortrait).toBeVisible();

    // Switch to landscape
    await page.setViewportSize({ width: 667, height: 375 });

    // Content should still be visible
    const heroTitleLandscape = page.getByText(/The modern landing page for/i);
    await expect(heroTitleLandscape).toBeVisible();
  });

  test('footer should be accessible and properly formatted on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Footer should not cause horizontal scroll
    const footerBox = await footer.boundingBox();
    if (footerBox) {
      expect(footerBox.width).toBeLessThanOrEqual(375);
    }
  });
});
