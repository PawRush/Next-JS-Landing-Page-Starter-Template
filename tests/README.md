# Playwright E2E Tests

This directory contains end-to-end tests for the Next.js Landing Page using Playwright.

## Test Structure

### Test Files

1. **landing-page-sections.spec.ts**
   - Tests for all landing page sections rendering correctly
   - Validates Hero, Features, CTA Banner, and Footer sections
   - Checks content visibility and structure

2. **cta-interactions.spec.ts**
   - Tests for CTA buttons and user interactions
   - Validates button functionality and links
   - Checks keyboard accessibility and hover states

3. **responsive-design.spec.ts**
   - Tests responsive design across multiple breakpoints
   - Desktop (1920x1080), Tablet (768x1024), Mobile (375x667, 320x568)
   - Validates touch target sizes and layout adaptations

4. **seo-metadata.spec.ts**
   - Tests SEO metadata and best practices
   - Validates meta tags, Open Graph tags, and structured data
   - Checks heading hierarchy and semantic HTML

5. **performance.spec.ts**
   - Tests performance metrics and loading times
   - Validates resource loading, bundle sizes, and caching
   - Checks First Contentful Paint, Time to Interactive, and Layout Shifts

## Running Tests

### Prerequisites

```bash
# Install dependencies
npm install

# Install Playwright browsers (if not already installed)
npx playwright install
```

### Run All Tests

```bash
# Run all tests in headless mode
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests in UI mode (interactive)
npm run test:ui
```

### Run Specific Test Files

```bash
# Run landing page sections tests
npx playwright test landing-page-sections

# Run CTA interaction tests
npx playwright test cta-interactions

# Run responsive design tests
npx playwright test responsive-design

# Run SEO tests
npx playwright test seo-metadata

# Run performance tests
npx playwright test performance
```

### View Test Report

```bash
# Show last test report
npm run test:report
```

## Test Configuration

The tests are configured in `playwright.config.ts`:

- **Base URL**: http://localhost:3000
- **Projects**: Chromium (desktop), Mobile Chrome (Pixel 5), Tablet (iPad Pro)
- **Web Server**: Automatically starts dev server before tests
- **Reporters**: HTML report with screenshots on failure
- **Retries**: 2 retries in CI, 0 locally

## Writing New Tests

When adding new tests:

1. Create a new `.spec.ts` file in the `tests/e2e` directory
2. Import test and expect from `@playwright/test`
3. Use descriptive test names
4. Group related tests in `test.describe` blocks
5. Clean up state with `test.beforeEach` if needed

Example:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should do something', async ({ page }) => {
    // Your test code here
  });
});
```

## CI/CD Integration

These tests can be integrated into CI/CD pipelines:

```yaml
# GitHub Actions example
- name: Install dependencies
  run: npm ci

- name: Install Playwright Browsers
  run: npx playwright install --with-deps

- name: Run Playwright tests
  run: npm test
```

## Troubleshooting

### Tests failing on "page.goto"

- Ensure the dev server is running
- Check that port 3000 is not in use by another application
- The Playwright config automatically starts the dev server

### Timeout errors

- Increase timeout in playwright.config.ts
- Check network connectivity
- Ensure system has sufficient resources

### Browser not found

- Run `npx playwright install` to install browsers
- For CI, use `npx playwright install --with-deps`

## Best Practices

1. **Keep tests focused**: Each test should validate one specific behavior
2. **Use meaningful selectors**: Prefer role-based selectors over CSS selectors
3. **Avoid hardcoded waits**: Use Playwright's auto-waiting features
4. **Clean up after tests**: Use beforeEach/afterEach for setup/teardown
5. **Document complex tests**: Add comments for non-obvious test logic
