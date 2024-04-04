import { Page } from '@playwright/test';

export class Login {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    static buttons = {
        login: '//*[@id="field-login-loginSubmit"]'
    };
    static fields = {
        username: '#field-login-login',
        password: '#field-login-password'
    };
    async login(username: string, password: string) {
        await this.page.fill(Login.fields.username, username);
        await this.page.fill(Login.fields.password, password);
        await this.page.click(Login.buttons.login);
    }
}

export class Issue {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    static fields = {
        issueName: '#field-issues-issueName',
        descriptionText: '#field-issues-descriptionText'
    };

    static buttons = {
        addIssue: '[title="Add Issue"]',
        deleteIssue: '[title="Delete Issue"]',
        submit: '#field-issues-okSubmit'
    };

    async createIssue(issueName: string, issueDesc: string) {
        await this.page.click(Issue.buttons.addIssue);
        await this.page.fill(Issue.fields.issueName, issueName);
        await this.page.fill(Issue.fields.descriptionText, issueDesc);
        await this.page.click(Issue.buttons.submit);
    }

    async deleteIssueAfterCreation() {
        await this.page.click(Issue.buttons.deleteIssue);
        await this.page.click(Issue.buttons.submit);
    }

    async deleteIssueBySearchingForIssue(issueName: string) {
        await this.page.fill('#field-search-searchBox', issueName);
        await this.page.click('#field-search-searchSubmit');
        await this.page.click(`[title="${issueName}"]`);
        await this.page.click(Issue.buttons.deleteIssue);
        await this.page.click(Issue.buttons.submit);
    }

    async searchByUserName(userName: string) {
        await this.page.click(`[title="Search Options"]`);
        await this.page.click(`#ui-id-4`);
        await this.page.fill('#field-search-searchBox', userName);
        await this.page.click('#field-search-searchSubmit');
    }
}
