import {expect} from '@playwright/test'
import {signInTest as test} from '../fixtures/sign-in.fixture'

test.use({
  user: {
    email: 'nicolas.morel@gmail.com',
    password: 'super_password',
    name: 'Nicolas Morel',
  },
})

test('Sign-in', async ({page}) => {
  await page.goto('')

  // Automatically redirected to /login
  await expect(page).toHaveURL(/\/login$/)

  await page.locator('[name="email"]').click()
  await page.locator('[name="email"]').fill('nicolas.morel@gmail.com')
  await page.locator('[name="password"]').click()
  await page.locator('[name="password"]').fill('super_password')
  await page.locator('button[type="submit"]').click()

  // We should be on the home page now
  await expect(page.getByRole('heading', {name: 'Welcome to Gladia!'})).toBeVisible()
  // And connected with the right account
  await expect(page.getByRole('link', {name: 'Nicolas Morel'})).toBeVisible()
})
