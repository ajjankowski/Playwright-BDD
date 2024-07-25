import { Page } from "@playwright/test";

export class LoginPage {
    constructor(private page: Page) { }

    usernameInput = this.page.getByPlaceholder('Username');
    passwordInput = this.page.getByPlaceholder('Password');
    loginButton = this.page.getByRole('button', { name: 'Log in' });

    incorrectLoginError = this.page.getByText('Please enter a correct');
    dashboardHeader = this.page.getByText('For Test Automation Purposes');

    userProfileButton = this.page.getByRole('button', { name: 'Welcome, admin' });
    logoutButton = this.page.getByRole('link', { name: 'Logout' });
    logoutConfirmationButton = this.page.getByRole('link', { name: 'Logout' });
    loginHeader = this.page.getByRole('heading', { name: 'Welcome to Puppy Bank' });

    aboutTheAppButton = this.page.getByRole('link', { name: 'About the App' });
    gettingStartedPanel = this.page.getByRole('heading', { name: 'Getting Started' });
    puppyBankFeaturesPanel = this.page.getByRole('heading', { name: 'Puppy Bank Features' });
    aboutPuppyBankPanel = this.page.getByRole('heading', { name: 'About Puppy Bank' });
    whyItWasMadePanel = this.page.getByRole('heading', { name: 'Why it was made?' });
    sourcesPanel = this.page.getByRole('heading', { name: 'Sources' });
    exploreNowButton = this.page.getByRole('link', { name: 'Explore Now' });

    async login(userLogin: string, userPassword: string): Promise<void> {
        await this.usernameInput.fill(userLogin);
        await this.passwordInput.fill(userPassword);
        await this.loginButton.click();
    }

    async logout(): Promise<void> {
        await this.userProfileButton.click();
        await this.logoutButton.click();
        await this.logoutConfirmationButton.click();
    }
}
