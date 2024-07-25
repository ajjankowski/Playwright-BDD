import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { loginData, loginWrongData } from '../test-data/login.data';

let loginPage: LoginPage;

const userLogin = loginData.userLogin;
const userWrongLogin = loginWrongData.userLogin;
const userPassword = loginData.userPassword;
const userWrongPassword = loginWrongData.userPassword;

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
});

test('user cannot log in with incorrect data', async ({ page }) => {

    // I try to login with incorrect data
    await loginPage.login(userWrongLogin, userWrongPassword);

    // I see incorrect login data error
    await expect(loginPage.incorrectLoginError).toBeVisible();
});

test('user can log in and log out with correct data', async ({ page }) => {

    // I login as administrator
    await loginPage.login(userLogin, userPassword);

    // I can see website dashboard
    await expect(loginPage.dashboardHeader).toBeVisible();

    // I log out
    await loginPage.logout();

    // I can see login header
    await expect(loginPage.loginHeader).toBeVisible();
});

test('user can explore about the app section', async ({ page }) => {

    // I open About the App subpage
    await loginPage.aboutTheAppButton.click();

    // I check visibility of (...) panel
    await expect(loginPage.gettingStartedPanel).toBeVisible();
    await expect(loginPage.puppyBankFeaturesPanel).toBeVisible();
    await expect(loginPage.aboutPuppyBankPanel).toBeVisible();
    await expect(loginPage.whyItWasMadePanel).toBeVisible();
    await expect(loginPage.sourcesPanel).toBeVisible();

    // I quit from About the App subpage
    await loginPage.exploreNowButton.click();
    await expect(loginPage.loginHeader).toBeVisible();
});
