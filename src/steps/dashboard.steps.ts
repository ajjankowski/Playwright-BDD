import { Given, setDefaultTimeout, Then, When } from '@cucumber/cucumber';
import { chromium, expect, Page } from '@playwright/test';
import { loginData, puppyData } from '../../test-data/login.data';
import { DashboardPage } from '../pages/dashboard.page';
import { LoginPage } from '../pages/login.page';

let page: Page;
let loginPage: LoginPage;
let dashboardPage: DashboardPage;

const userLogin = loginData.userLogin;
const userPassword = loginData.userPassword;
const firstName = puppyData.firstName;
const lastName = puppyData.lastName;
const address = puppyData.address;
const mobileNumber = puppyData.mobileNumber;
const email = puppyData.email;

setDefaultTimeout(60 * 1000);

Given('I am logged in as an administrator', async function () {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await page.goto('http://localhost:8000/');
    await loginPage.login(userLogin, userPassword);
});

Then('I should see the deposit panel', async function () {
    await expect(dashboardPage.depositPanel).toBeVisible();
});

Then('I should see the withdraw panel', async function () {
    await expect(dashboardPage.withdrawPanel).toBeVisible();
});

Then('I should see the transfer panel', async function () {
    await expect(dashboardPage.transferPanel).toBeVisible();
});

Then('I should see the number of transactions panel', async function () {
    await expect(dashboardPage.numberOfTransactionsPanel).toBeVisible();
});

Then('I should see the cashflow panel', async function () {
    await expect(dashboardPage.cashflowPanel).toBeVisible();
});

Then('I should see the transaction mix panel', async function () {
    await expect(dashboardPage.transactionMixPanel).toBeVisible();
});

When('I open the Puppy Accounts subpage', async function () {
    await dashboardPage.puppyAccountButton.click();
    await dashboardPage.puppyAccountListButton.click();
});

Then('I should see the Puppy Accounts list header', async function () {
    await expect(dashboardPage.puppyAccountListHeader).toBeVisible();
});

Then('I should see the Poodle puppy', async function () {
    await expect(dashboardPage.poodlePuppy).toBeVisible();
});

Then('I should see the Siberian puppy', async function () {
    await expect(dashboardPage.siberianPuppy).toBeVisible();
});

Then('I should see the Golden puppy', async function () {
    await expect(dashboardPage.goldenPuppy).toBeVisible();
});

When('I open the New Puppy Account subpage', async function () {
    await dashboardPage.puppyAccountButton.click();
    await dashboardPage.newPuppyAccountButton.click();
});

When('I fill up new puppy data with existing email', async function () {
    await dashboardPage.fillUpPuppyData(firstName, lastName, address, mobileNumber, email);
    await dashboardPage.confirmButton.click();
});

Then('I should see an error message for email already used', async function () {
    await expect(dashboardPage.emailAlreadyUsedError).toBeVisible();
});
