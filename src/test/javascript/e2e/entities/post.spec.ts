import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Post e2e test', () => {

    let navBarPage: NavBarPage;
    let postDialogPage: PostDialogPage;
    let postComponentsPage: PostComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Posts', () => {
        navBarPage.goToEntity('post');
        postComponentsPage = new PostComponentsPage();
        expect(postComponentsPage.getTitle()).toMatch(/baeldungappApp.post.home.title/);

    });

    it('should load create Post dialog', () => {
        postComponentsPage.clickOnCreateButton();
        postDialogPage = new PostDialogPage();
        expect(postDialogPage.getModalTitle()).toMatch(/baeldungappApp.post.home.createOrEditLabel/);
        postDialogPage.close();
    });

    it('should create and save Posts', () => {
        postComponentsPage.clickOnCreateButton();
        postDialogPage.setTitleInput('title');
        expect(postDialogPage.getTitleInput()).toMatch('title');
        postDialogPage.setContentInput('content');
        expect(postDialogPage.getContentInput()).toMatch('content');
        postDialogPage.setCreationDateInput('2000-12-31');
        expect(postDialogPage.getCreationDateInput()).toMatch('2000-12-31');
        postDialogPage.creatorSelectLastOption();
        postDialogPage.save();
        expect(postDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PostComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-post div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PostDialogPage {
    modalTitle = element(by.css('h4#myPostLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    titleInput = element(by.css('input#field_title'));
    contentInput = element(by.css('input#field_content'));
    creationDateInput = element(by.css('input#field_creationDate'));
    creatorSelect = element(by.css('select#field_creator'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTitleInput = function (title) {
        this.titleInput.sendKeys(title);
    }

    getTitleInput = function () {
        return this.titleInput.getAttribute('value');
    }

    setContentInput = function (content) {
        this.contentInput.sendKeys(content);
    }

    getContentInput = function () {
        return this.contentInput.getAttribute('value');
    }

    setCreationDateInput = function (creationDate) {
        this.creationDateInput.sendKeys(creationDate);
    }

    getCreationDateInput = function () {
        return this.creationDateInput.getAttribute('value');
    }

    creatorSelectLastOption = function () {
        this.creatorSelect.all(by.tagName('option')).last().click();
    }

    creatorSelectOption = function (option) {
        this.creatorSelect.sendKeys(option);
    }

    getCreatorSelect = function () {
        return this.creatorSelect;
    }

    getCreatorSelectedOption = function () {
        return this.creatorSelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
