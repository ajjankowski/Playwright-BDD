import { expect, test } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';
import { LoginPage } from '../pages/login.page';
import { loginData, puppyData } from '../test-data/login.data';

let loginPage: LoginPage;
let dashboardPage: DashboardPage;

const userLogin = loginData.userLogin;
const userPassword = loginData.userPassword;
const firstName = puppyData.firstName;
const lastName = puppyData.lastName;
const address = puppyData.address;
const mobileNumber = puppyData.mobileNumber;
const email = puppyData.email;

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
});

test('user can see dashboard elements', async ({ page }) => {

    // I login as administrator
    await loginPage.login(userLogin, userPassword);

    // I check visibility of (...) panel
    await expect(dashboardPage.depositPanel).toBeVisible();
    await expect(dashboardPage.withdrawPanel).toBeVisible();
    await expect(dashboardPage.transferPanel).toBeVisible();
    await expect(dashboardPage.numberOfTransactionsPanel).toBeVisible();
    await expect(dashboardPage.cashflowPanel).toBeVisible();
    await expect(dashboardPage.transactionMixPanel).toBeVisible();
});

test('user can check puppy account list', async ({ page }) => {

    // I login as administrator
    await loginPage.login(userLogin, userPassword);

    // I open Puppy Accouts subpage
    await dashboardPage.puppyAccountButton.click();
    await dashboardPage.puppyAccountListButton.click();
    await expect(dashboardPage.puppyAccountListHeader).toBeVisible();

    // I check presence of (...) puppy
    await expect(dashboardPage.poodlePuppy).toBeVisible();
    await expect(dashboardPage.siberianPuppy).toBeVisible();
    await expect(dashboardPage.goldenPuppy).toBeVisible();
});

test('user cannot add a puppy account with existing email', async ({ page }) => {

    // I login as administrator
    await loginPage.login(userLogin, userPassword);

    // I open New Puppy Account subpage
    await dashboardPage.puppyAccountButton.click();
    await dashboardPage.newPuppyAccountButton.click();

    // I fill up new puppy data
    await dashboardPage.fillUpPuppyData(firstName, lastName, address, mobileNumber, email);

    // I try to send puppy data with existing email
    await dashboardPage.confirmButton.click();
    await expect(dashboardPage.emailAlreadyUsedError).toBeVisible();
});
