import { test, expect } from '@playwright/test'

test.describe('Reddit Client - Smoke Tests', () => {
  test('should load the application', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Reddit Client/)
  })

  test('should render the root element', async ({ page }) => {
    await page.goto('/')
    const root = page.locator('#root')
    await expect(root).toBeVisible()
  })
})
