import { test, expect } from '@playwright/test';

test('user cannot log in with incorrect data', async ({ page }) => {
    await page.goto('http://localhost:8000/app_generic/login');

    await page.getByPlaceholder('Username').fill('fake_username');
    await page.getByPlaceholder('Password').fill('fake_password');
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page.getByText('Please enter a correct')).toBeVisible();
});

test('user can log in and log out with correct data', async ({ page }) => {
    await page.goto('http://localhost:8000/app_generic/login');

    await page.getByPlaceholder('Username').fill('admin');
    await page.getByPlaceholder('Password').fill('password');
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page.getByText('For Test Automation Purposes')).toBeVisible();

    await page.getByRole('button', { name: 'Welcome, admin ' }).click();
    await page.getByRole('link', { name: ' Logout' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();

    await expect(page.getByRole('heading', { name: 'Welcome to Puppy Bank' })).toBeVisible();
});

test('user can explore about the app section', async ({ page }) => {
    await page.goto('http://localhost:8000/app_generic/login');

    await page.getByRole('link', { name: 'About the App' }).click();
    await expect(page.getByRole('heading', { name: 'Getting Started' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Puppy Bank Features' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'About Puppy Bank' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Why it was made?' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sources' })).toBeVisible();

    await page.getByRole('link', { name: ' Explore Now' }).click();
    await expect(page.getByRole('heading', { name: 'Welcome to Puppy Bank' })).toBeVisible();
});

test('user can see dashboard elements', async ({ page }) => {
    await page.goto('http://localhost:8000/app_generic/login');

    await page.getByPlaceholder('Username').fill('admin');
    await page.getByPlaceholder('Password').fill('password');
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page.getByText('Aggregate Deposit')).toBeVisible();
    await expect(page.getByText('Aggregate Withdraw')).toBeVisible();
    await expect(page.getByText('Aggregate Transfer')).toBeVisible();
    await expect(page.getByText('Number of Transactions')).toBeVisible();
    await expect(page.getByText('Cash Flow')).toBeVisible();
    await expect(page.getByText('Transaction Mix')).toBeVisible();
});

test('user can check puppy account list', async ({ page }) => {
    await page.goto('http://localhost:8000/app_generic/login');

    await page.getByPlaceholder('Username').fill('admin');
    await page.getByPlaceholder('Password').fill('password');
    await page.getByRole('button', { name: 'Log in' }).click();

    await page.getByRole('link', { name: ' Puppy Accounts ' }).click();
    await page.getByRole('link', { name: 'Puppy Account List' }).click();
    await expect(page.getByRole('heading', { name: 'Puppy Account List' })).toBeVisible();

    await expect(page.getByRole('link', { name: 'Poodle' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Siberian' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Golden' })).toBeVisible();
});

test('user cannot add a puppy account with existing email', async ({ page }) => {
    await page.goto('http://localhost:8000/app_generic/login');

    await page.getByPlaceholder('Username').fill('admin');
    await page.getByPlaceholder('Password').fill('password');
    await page.getByRole('button', { name: 'Log in' }).click();

    await page.getByRole('link', { name: ' Puppy Accounts ' }).click();
    await page.getByRole('link', { name: 'New Puppy Account' }).click();
    await page.locator('#id_first_name').fill('York');
    await page.locator('#id_last_name').fill('Puppy');
    await page.locator('#id_address').fill('Yorktown');
    await page.locator('#id_mobile_number').fill('123456789');
    await page.locator('#id_email_address').fill('poodle.white@puppy.com');
    await page.getByRole('button', { name: ' Confirm' }).click();

    await expect(page.getByText('Client with this Email')).toBeVisible();
});
