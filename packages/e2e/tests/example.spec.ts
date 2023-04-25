import {test, expect} from '@playwright/test'

test('Login with John Doe', async ({page}) => {
  await page.goto('')

  // Automatically redirected to /login
  await expect(page).toHaveURL(/\/login$/)

  await page.locator('[name="email"]').click()
  await page.locator('[name="email"]').fill('john.doe@gmail.com')
  await page.locator('[name="password"]').click()
  await page.locator('[name="password"]').fill('azerty')
  await page.locator('button[type="submit"]').click()

  // We should be on the home page now
  await expect(page.getByRole('heading', {name: 'Welcome to Gladia!'})).toBeVisible()
  // And connected with the right account
  await expect(page.getByRole('link', {name: 'John Doe'})).toBeVisible()
})
