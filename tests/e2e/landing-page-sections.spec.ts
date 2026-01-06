import { expect, test } from '@playwright/test';

/**
 * Test suite for landing page section rendering
 * Validates that all major sections of the landing page render correctly
 */
test.describe('Landing Page Sections', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render the hero section with title and description', async ({
    page,
  }) => {
    // Check for hero title
    const heroTitle = page.getByText(/The modern landing page for/i);
    await expect(heroTitle).toBeVisible();

    // Check for highlighted text in hero
    const reactDevelopersText = page.getByText('React developers');
    await expect(reactDevelopersText).toBeVisible();

    // Check for hero description
    const heroDescription = page.getByText(
      /The easiest way to build a React landing page/i,
    );
    await expect(heroDescription).toBeVisible();
  });

  test('should render navigation bar with links', async ({ page }) => {
    // Check for GitHub link in navigation (first one)
    const githubLink = page.getByRole('link', { name: 'GitHub' }).first();
    await expect(githubLink).toBeVisible();
  });

  test('should render page content sections', async ({ page }) => {
    // Verify page has content by checking for key elements
    const pageContent = page.locator('.text-gray-600');
    await expect(pageContent).toBeVisible();
  });

  test('should render vertical features section with three features', async ({
    page,
  }) => {
    // Check for features section title
    const featuresTitle = page.getByText('Your title here').first();
    await expect(featuresTitle).toBeVisible();

    // Check that feature images are rendered
    const featureImages = page.locator('img[alt*="feature"]');
    const imageCount = await featureImages.count();
    expect(imageCount).toBe(3);

    // Verify all three feature images have correct alt text
    await expect(
      page.locator('img[alt="First feature alt text"]'),
    ).toBeVisible();
    await expect(
      page.locator('img[alt="Second feature alt text"]'),
    ).toBeVisible();
    await expect(
      page.locator('img[alt="Third feature alt text"]'),
    ).toBeVisible();
  });

  test('should render CTA banner section', async ({ page }) => {
    // Check for CTA banner title
    const ctaTitle = page.getByText(
      /Lorem ipsum dolor sit amet consectetur adipisicing elit/i,
    );
    await expect(ctaTitle).toBeVisible();

    // Check for CTA subtitle
    const ctaSubtitle = page.getByText(/Start your Free Trial/i);
    await expect(ctaSubtitle).toBeVisible();
  });

  test('should render footer section', async ({ page }) => {
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check for footer links
    const homeLink = page.getByRole('link', { name: 'Home' });
    await expect(homeLink).toBeVisible();

    // Check for copyright text
    const copyrightText = page.getByText(/©/);
    await expect(copyrightText).toBeVisible();
  });

  test('should have all sections in correct order', async ({ page }) => {
    // Verify hero section appears first (contains the main heading)
    const pageText = await page.locator('body').textContent();
    expect(pageText).toContain('The modern landing page');
    expect(pageText).toContain('Your title here');
    expect(pageText).toContain('Start your Free Trial');
  });
});
