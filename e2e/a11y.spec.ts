import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const routes = ['/dashboard', '/tasks', '/projects']

for (const route of routes) {
  test(`a11y: ${route}`, async ({ page }) => {
    await page.goto(route)
    await page.waitForLoadState('networkidle')
    // Wait for stagger animations to complete (max 0.6s on dashboard activity feed)
    await page.waitForTimeout(800)

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    // Write results to file for report generation
    const fs = await import('fs')
    const path = await import('path')
    const dir = path.join(process.cwd(), 'docs', 'accessibility', 'audits', 'raw')
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(
      path.join(dir, `${route.replace(/\//g, '_') || '_root'}.json`),
      JSON.stringify(results, null, 2),
    )

    const blocking = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious',
    )
    expect(
      blocking,
      `Critical/serious a11y violations on ${route}:\n` +
        blocking
          .map((v) => `  [${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} node(s))`)
          .join('\n'),
    ).toHaveLength(0)
  })
}
