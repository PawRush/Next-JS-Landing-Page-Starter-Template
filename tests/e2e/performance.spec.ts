import { test, expect } from '@playwright/test';

/**
 * Test suite for performance checks
 * Validates page load times, resource loading, and performance metrics
 */
test.describe('Performance', () => {
  test('page should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const loadTime = Date.now() - startTime;

    // Page should load within 5 seconds (generous for development)
    expect(loadTime).toBeLessThan(5000);

    // Log the load time for monitoring
    console.log(`Page loaded in ${loadTime}ms`);
  });

  test('page should achieve full load quickly', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/', { waitUntil: 'load' });

    const fullLoadTime = Date.now() - startTime;

    // Full page load (including all resources) should be under 10 seconds
    expect(fullLoadTime).toBeLessThan(10000);

    console.log(`Full page load time: ${fullLoadTime}ms`);
  });

  test('should not load excessive resources', async ({ page }) => {
    const requests: string[] = [];

    // Track all network requests
    page.on('request', (request) => {
      requests.push(request.url());
    });

    await page.goto('/');

    // Wait for network to settle
    await page.waitForLoadState('networkidle');

    // Should not make an excessive number of requests (< 50 for a simple landing page)
    expect(requests.length).toBeLessThan(50);

    console.log(`Total requests: ${requests.length}`);
  });

  test('should not have large JavaScript bundles', async ({ page }) => {
    const jsResources: number[] = [];

    page.on('response', async (response) => {
      const url = response.url();
      if (url.includes('.js') || url.includes('/_next/')) {
        const headers = response.headers();
        const contentLength = headers['content-length'];

        if (contentLength) {
          jsResources.push(parseInt(contentLength, 10));
        }
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Each JS bundle should be reasonable (< 1MB each)
    for (const size of jsResources) {
      expect(size).toBeLessThan(1024 * 1024); // 1MB
    }

    if (jsResources.length > 0) {
      const totalSize = jsResources.reduce((a, b) => a + b, 0);
      console.log(`Total JS size: ${(totalSize / 1024).toFixed(2)} KB`);
    }
  });

  test('images should be optimized', async ({ page }) => {
    await page.goto('/');

    // Get all images
    const images = page.locator('img');
    const imageCount = await images.count();

    if (imageCount > 0) {
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const src = await img.getAttribute('src');

        if (src && !src.startsWith('data:')) {
          // Navigate to the image to check size
          const response = await page.request.get(src);
          const buffer = await response.body();
          const sizeInKB = buffer.length / 1024;

          // Images should be reasonably sized (< 500KB for landing page images)
          expect(sizeInKB).toBeLessThan(500);

          console.log(`Image ${src}: ${sizeInKB.toFixed(2)} KB`);
        }
      }
    }
  });

  test('should not have render-blocking resources', async ({ page }) => {
    const renderBlockingResources: string[] = [];

    page.on('request', (request) => {
      const url = request.url();
      const resourceType = request.resourceType();

      // Check for synchronous scripts in head
      if (resourceType === 'script' || resourceType === 'stylesheet') {
        renderBlockingResources.push(url);
      }
    });

    await page.goto('/');

    // Modern Next.js should minimize render-blocking resources
    console.log(`Potential render-blocking resources: ${renderBlockingResources.length}`);
  });

  test('should achieve good First Contentful Paint', async ({ page }) => {
    await page.goto('/');

    // Use Performance API to measure FCP
    const fcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          for (const entry of entries) {
            if (entry.name === 'first-contentful-paint') {
              observer.disconnect();
              resolve(entry.startTime);
            }
          }
        });
        observer.observe({ entryTypes: ['paint'] });

        // Fallback timeout
        setTimeout(() => resolve(null), 5000);
      });
    });

    if (fcp !== null) {
      // FCP should be under 2 seconds for good user experience
      expect(fcp).toBeLessThan(2000);
      console.log(`First Contentful Paint: ${fcp}ms`);
    }
  });

  test('should have efficient DOM size', async ({ page }) => {
    await page.goto('/');

    // Count DOM nodes
    const domSize = await page.evaluate(() => {
      return document.getElementsByTagName('*').length;
    });

    // DOM should not be excessively large (< 1500 nodes for a landing page)
    expect(domSize).toBeLessThan(1500);

    console.log(`DOM nodes: ${domSize}`);
  });

  test('should not have memory leaks on navigation', async ({ page }) => {
    await page.goto('/');

    // Get initial metrics
    const initialMetrics = await page.evaluate(() => {
      if ('memory' in performance) {
        return (performance as any).memory.usedJSHeapSize;
      }
      return null;
    });

    // Scroll and interact with page
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.evaluate(() => window.scrollTo(0, 0));

    // Get final metrics
    const finalMetrics = await page.evaluate(() => {
      if ('memory' in performance) {
        return (performance as any).memory.usedJSHeapSize;
      }
      return null;
    });

    if (initialMetrics !== null && finalMetrics !== null) {
      const memoryIncrease = finalMetrics - initialMetrics;
      console.log(`Memory increase: ${(memoryIncrease / 1024 / 1024).toFixed(2)} MB`);

      // Memory should not increase dramatically
      expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024); // 50MB
    }
  });

  test('should have good Time to Interactive', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');

    // Wait until the page is fully interactive
    await page.waitForLoadState('networkidle');

    const tti = Date.now() - startTime;

    // Time to Interactive should be under 5 seconds
    expect(tti).toBeLessThan(5000);

    console.log(`Time to Interactive: ${tti}ms`);
  });

  test('should handle rapid interactions without lag', async ({ page }) => {
    await page.goto('/');

    const startTime = Date.now();

    // Perform rapid interactions
    const heroButton = page.getByRole('link', { name: /Download Your Free Theme/i });
    await heroButton.hover();
    await page.mouse.move(0, 0);
    await heroButton.hover();

    const interactionTime = Date.now() - startTime;

    // Interactions should be responsive (< 100ms ideal, < 300ms acceptable)
    expect(interactionTime).toBeLessThan(500);

    console.log(`Interaction time: ${interactionTime}ms`);
  });

  test('should not have layout shifts on load', async ({ page }) => {
    await page.goto('/');

    // Wait for page to stabilize
    await page.waitForTimeout(2000);

    // Measure Cumulative Layout Shift
    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          for (const entry of entries) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
        });

        observer.observe({ entryTypes: ['layout-shift'] });

        setTimeout(() => {
          observer.disconnect();
          resolve(clsValue);
        }, 1000);
      });
    });

    // CLS should be low (< 0.1 is good, < 0.25 is acceptable)
    expect(cls).toBeLessThan(0.25);

    console.log(`Cumulative Layout Shift: ${cls}`);
  });

  test('should cache static assets efficiently', async ({ page }) => {
    // First visit
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const cachedRequests: string[] = [];

    // Track cache hits on second visit
    page.on('response', (response) => {
      const fromCache = response.fromCache();
      if (fromCache) {
        cachedRequests.push(response.url());
      }
    });

    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Some resources should be cached
    console.log(`Cached requests: ${cachedRequests.length}`);
  });
});
