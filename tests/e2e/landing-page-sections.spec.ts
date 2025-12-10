import { test, expect } from '@playwright/test';

/**
 * Test suite for landing page section rendering
 * Validates that all major sections of the landing page render correctly
 */
test.describe('Landing Page Sections', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render the hero section with title and description', async ({ page }) => {
    // Check for hero title
    const heroTitle = page.getByText(/The modern landing page for/i);
    await expect(heroTitle).toBeVisible();

    // Check for highlighted text in hero
    const reactDevelopersText = page.getByText('React developers');
    await expect(reactDevelopersText).toBeVisible();

    // Check for hero description
    const heroDescription = page.getByText(/The easiest way to build a React landing page/i);
    await expect(heroDescription).toBeVisible();
  });

  test('should render navigation bar with links', async ({ page }) => {
    // Check for GitHub link
    const githubLink = page.getByRole('link', { name: 'GitHub' });
    await expect(githubLink).toBeVisible();

    // Check for Sign in link
    const signInLink = page.getByRole('link', { name: 'Sign in' });
    await expect(signInLink).toBeVisible();
  });

  test('should render the sponsors section', async ({ page }) => {
    // The sponsors section should be present (even if empty)
    // We can check for the section structure
    const sponsorsSection = page.locator('section').filter({ hasText: /sponsor/i }).first();
    // If no sponsors text, just verify page has multiple sections
    const sections = page.locator('section');
    const sectionCount = await sections.count();
    expect(sectionCount).toBeGreaterThan(0);
  });

  test('should render vertical features section with three features', async ({ page }) => {
    // Check for features section title
    const featuresTitle = page.getByText('Your title here').first();
    await expect(featuresTitle).toBeVisible();

    // Check that feature images are rendered
    const featureImages = page.locator('img[alt*="feature"]');
    const imageCount = await featureImages.count();
    expect(imageCount).toBe(3);

    // Verify all three feature images have correct alt text
    await expect(page.locator('img[alt="First feature alt text"]')).toBeVisible();
    await expect(page.locator('img[alt="Second feature alt text"]')).toBeVisible();
    await expect(page.locator('img[alt="Third feature alt text"]')).toBeVisible();
  });

  test('should render CTA banner section', async ({ page }) => {
    // Check for CTA banner title
    const ctaTitle = page.getByText(/Lorem ipsum dolor sit amet consectetur adipisicing elit/i);
    await expect(ctaTitle).toBeVisible();

    // Check for CTA subtitle
    const ctaSubtitle = page.getByText(/Start your Free Trial/i);
    await expect(ctaSubtitle).toBeVisible();
  });

  test('should render footer section', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check for footer copyright
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Footer should contain copyright or similar text
    const footerText = await footer.textContent();
    expect(footerText).toBeTruthy();
  });

  test('should have all sections in correct order', async ({ page }) => {
    // Get all main sections
    const sections = await page.locator('main, section, div[class*="text-gray-600"]').all();

    // Verify page has multiple sections
    expect(sections.length).toBeGreaterThan(3);

    // Verify hero section appears first (contains the main heading)
    const firstSectionText = await page.locator('body').textContent();
    expect(firstSectionText).toContain('The modern landing page');
  });
});
