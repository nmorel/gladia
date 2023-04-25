import {expect} from '@playwright/test'
import {PrismaClient} from '@gladia/db'
import {signUpTest as test} from '../fixtures/sign-up.fixture'

test.use({
  email: 'jane.doe@gmail.com',
})

test.describe('sign-up', () => {
  test('Sign-up with Jane Doe, change its name and delete the account', async ({page}) => {
    await page.goto('')

    // Automatically redirected to /login
    await expect(page).toHaveURL(/\/login$/)

    await page.getByRole('link', {name: 'Create one for free'}).click()
    // Should be redirected to sign-up page
    await expect(page).toHaveURL(/\/register$/)

    // Filling the form
    await page.locator('[name="email"]').click()
    await page.locator('[name="email"]').fill('jane.doe@gmail.com')
    await page.locator('[name="password"]').click()
    await page.locator('[name="password"]').fill('qwerty')
    await page.locator('[name="name"]').click()
    await page.locator('[name="name"]').fill('Jane Due')
    await page.locator('button[type="submit"]').click()

    // We should be on the home page now
    await expect(page.getByRole('heading', {name: 'Welcome to Gladia!'})).toBeVisible()

    // Go to profile page
    await page.getByTestId('header').getByRole('link', {name: 'Jane Due'}).click()

    // Fix the name
    await page.locator('[name="name"]').click()
    await page.locator('[name="name"]').fill('Jane Doe')
    await page.locator('button[type="submit"]').click()

    // The name should be updated on the header
    await expect(page.getByTestId('header').getByRole('link', {name: 'Jane Doe'})).toBeVisible()

    // Now delete the account
    await page.getByRole('button', {name: 'Delete my account'}).click()

    // Should be redirected to login
    await expect(page).toHaveURL(/\/login$/)
  })
})
