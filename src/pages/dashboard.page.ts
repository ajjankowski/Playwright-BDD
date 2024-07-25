import { Page } from "@playwright/test";

export class DashboardPage {
    constructor(private page: Page) { }

    depositPanel = this.page.getByText('Aggregate Deposit');
    withdrawPanel = this.page.getByText('Aggregate Withdraw');
    transferPanel = this.page.getByText('Aggregate Transfer');
    numberOfTransactionsPanel = this.page.getByText('Number of Transactions');
    cashflowPanel = this.page.getByText('Cash Flow');
    transactionMixPanel = this.page.getByText('Transaction Mix');

    puppyAccountButton = this.page.getByRole('link', { name: 'Puppy Accounts' });
    puppyAccountListButton = this.page.getByRole('link', { name: 'Puppy Account List' });
    puppyAccountListHeader = this.page.getByRole('heading', { name: 'Puppy Account List' });
    poodlePuppy = this.page.getByRole('link', { name: 'Poodle' });
    siberianPuppy = this.page.getByRole('link', { name: 'Siberian' });
    goldenPuppy = this.page.getByRole('link', { name: 'Golden' });

    newPuppyAccountButton = this.page.getByRole('link', { name: 'New Puppy Account' });
    firstNamePuppyInput = this.page.locator('#id_first_name');
    lastNamePuppyInput = this.page.locator('#id_last_name');
    addressPuppyInput = this.page.locator('#id_address');
    mobileNumberPuppyInput = this.page.locator('#id_mobile_number');
    emailAddressPuppyInput = this.page.locator('#id_email_address');
    confirmButton = this.page.getByRole('button', { name: 'Confirm' });
    emailAlreadyUsedError = this.page.getByText('Client with this Email');

    async fillUpPuppyData(firstName: string, lastName: string, address: string, mobileNumber: string, email: string): Promise<void> {
        await this.firstNamePuppyInput.fill(firstName);
        await this.lastNamePuppyInput.fill(lastName);
        await this.addressPuppyInput.fill(address);
        await this.mobileNumberPuppyInput.fill(mobileNumber);
        await this.emailAddressPuppyInput.fill(email);
    }
}
