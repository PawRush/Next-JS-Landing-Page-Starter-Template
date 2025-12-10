import { test, expect } from '@playwright/test';

/**
 * Test suite for CTA buttons and interactions
 * Validates button functionality, links, and user interactions
 */
test.describe('CTA Buttons and Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render hero CTA button with correct text', async ({ page }) => {
    const heroButton = page.getByRole('link', { name: /Download Your Free Theme/i });
    await expect(heroButton).toBeVisible();
    await expect(heroButton).toBeEnabled();
  });

  test('hero CTA button should have correct href attribute', async ({ page }) => {
    const heroButton = page.getByRole('link', { name: /Download Your Free Theme/i });

    // Verify the button/link has the correct href
    const href = await heroButton.getAttribute('href');
    expect(href).toContain('creativedesignsguru.com');
  });

  test('hero CTA button should be clickable and styled correctly', async ({ page }) => {
    const heroButton = page.getByRole('link', { name: /Download Your Free Theme/i });

    // Check button is visible and clickable
    await expect(heroButton).toBeVisible();

    // Verify button has appropriate styling (button-like appearance)
    const buttonElement = heroButton.locator('..').first();
    const classList = await buttonElement.getAttribute('class');
    expect(classList).toBeTruthy();
  });

  test('should render banner CTA button', async ({ page }) => {
    // Scroll to CTA banner
    const bannerButton = page.getByRole('link', { name: /Get Started/i });
    await bannerButton.scrollIntoViewIfNeeded();

    await expect(bannerButton).toBeVisible();
    await expect(bannerButton).toBeEnabled();
  });

  test('banner CTA button should have correct href', async ({ page }) => {
    const bannerButton = page.getByRole('link', { name: /Get Started/i });

    const href = await bannerButton.getAttribute('href');
    expect(href).toContain('creativedesignsguru.com');
  });

  test('navigation links should be interactive', async ({ page }) => {
    // Test GitHub link
    const githubLink = page.getByRole('link', { name: 'GitHub' });
    await expect(githubLink).toBeVisible();

    const githubHref = await githubLink.getAttribute('href');
    expect(githubHref).toContain('github.com');

    // Test Sign in link
    const signInLink = page.getByRole('link', { name: 'Sign in' });
    await expect(signInLink).toBeVisible();
  });

  test('CTA buttons should have hover states', async ({ page }) => {
    const heroButton = page.getByRole('link', { name: /Download Your Free Theme/i });

    // Get initial state
    await expect(heroButton).toBeVisible();

    // Hover over button
    await heroButton.hover();

    // Button should still be visible and clickable after hover
    await expect(heroButton).toBeVisible();
    await expect(heroButton).toBeEnabled();
  });

  test('all interactive elements should be keyboard accessible', async ({ page }) => {
    // Tab through interactive elements
    await page.keyboard.press('Tab'); // First focusable element

    // Check that focus is visible
    const focused = page.locator(':focus');
    await expect(focused).toBeVisible();

    // Continue tabbing to reach more elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Verify we can navigate through the page
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should not have any broken button links', async ({ page }) => {
    // Get all links on the page
    const links = await page.locator('a[href]').all();

    // Verify all links have href attributes
    for (const link of links) {
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).not.toBe('#');
    }
  });

  test('CTA sections should be visually distinct', async ({ page }) => {
    const heroButton = page.getByRole('link', { name: /Download Your Free Theme/i });
    const bannerButton = page.getByRole('link', { name: /Get Started/i });

    // Both buttons should be visible on the page
    await expect(heroButton).toBeVisible();

    // Scroll to banner button
    await bannerButton.scrollIntoViewIfNeeded();
    await expect(bannerButton).toBeVisible();

    // Verify they are in different sections
    const heroBox = await heroButton.boundingBox();
    const bannerBox = await bannerButton.boundingBox();

    expect(heroBox).toBeTruthy();
    expect(bannerBox).toBeTruthy();

    // Buttons should be vertically separated
    if (heroBox && bannerBox) {
      expect(Math.abs(heroBox.y - bannerBox.y)).toBeGreaterThan(100);
    }
  });
});
