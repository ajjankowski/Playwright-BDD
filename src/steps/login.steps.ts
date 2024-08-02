import { Given, setDefaultTimeout, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { chromium, Page } from 'playwright';
import { loginData, loginWrongData } from '../../test-data/login.data';
import { LoginPage } from '../pages/login.page';

let page: Page;
let loginPage: LoginPage;

const userLogin = loginData.userLogin;
const userWrongLogin = loginWrongData.userLogin;
const userPassword = loginData.userPassword;
const userWrongPassword = loginWrongData.userPassword;

setDefaultTimeout(60 * 1000);

Given('I navigate to the login page', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    await page.goto('http://localhost:8000/');
});

When('I try to login with incorrect data', async () => {
    await loginPage.login(userWrongLogin, userWrongPassword);
});

Then('I should see incorrect login data error', async () => {
    await expect(loginPage.incorrectLoginError).toBeVisible();
    await page.close();
});

When('I login with correct data', async () => {
    await loginPage.login(userLogin, userPassword);
});

Then('I should see the website dashboard', async () => {
    await expect(loginPage.dashboardHeader).toBeVisible();
});

When('I log out', async () => {
    await loginPage.logout();
});

Then('I should see the login header', async () => {
    await expect(loginPage.loginHeader).toBeVisible();
    await page.close();
});

When('I open About the App subpage', async () => {
    await loginPage.aboutTheAppButton.click();
});

Then('I should see the {string} panel', async (panelName: string) => {
    await loginPage.checkPanel(panelName);
});

When('I quit from About the App subpage', async () => {
    await loginPage.exploreNowButton.click();
});
