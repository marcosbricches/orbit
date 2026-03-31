import { test, expect } from '@playwright/test'

test('app loads and redirects to dashboard', async ({ page }) => {
  await page.goto('/')
  await expect(page).not.toHaveTitle('Error')
  await page.waitForURL(/dashboard/, { timeout: 5000 })
  await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible()
})

test('tasks page loads', async ({ page }) => {
  await page.goto('/tasks')
  await expect(page.getByRole('heading', { name: /tasks/i })).toBeVisible()
})

test('projects page loads', async ({ page }) => {
  await page.goto('/projects')
  await expect(page.getByRole('heading', { name: /projects/i })).toBeVisible()
})
