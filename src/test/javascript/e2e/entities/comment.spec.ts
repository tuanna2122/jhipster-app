import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Comment e2e test', () => {

    let navBarPage: NavBarPage;
    let commentDialogPage: CommentDialogPage;
    let commentComponentsPage: CommentComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Comments', () => {
        navBarPage.goToEntity('comment');
        commentComponentsPage = new CommentComponentsPage();
        expect(commentComponentsPage.getTitle()).toMatch(/baeldungappApp.comment.home.title/);

    });

    it('should load create Comment dialog', () => {
        commentComponentsPage.clickOnCreateButton();
        commentDialogPage = new CommentDialogPage();
        expect(commentDialogPage.getModalTitle()).toMatch(/baeldungappApp.comment.home.createOrEditLabel/);
        commentDialogPage.close();
    });

    it('should create and save Comments', () => {
        commentComponentsPage.clickOnCreateButton();
        commentDialogPage.setTextInput('text');
        expect(commentDialogPage.getTextInput()).toMatch('text');
        commentDialogPage.setCreationDateInput('2000-12-31');
        expect(commentDialogPage.getCreationDateInput()).toMatch('2000-12-31');
        commentDialogPage.postCommentsSelectLastOption();
        commentDialogPage.save();
        expect(commentDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CommentComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-comment div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CommentDialogPage {
    modalTitle = element(by.css('h4#myCommentLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    textInput = element(by.css('input#field_text'));
    creationDateInput = element(by.css('input#field_creationDate'));
    postCommentsSelect = element(by.css('select#field_postComments'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTextInput = function (text) {
        this.textInput.sendKeys(text);
    }

    getTextInput = function () {
        return this.textInput.getAttribute('value');
    }

    setCreationDateInput = function (creationDate) {
        this.creationDateInput.sendKeys(creationDate);
    }

    getCreationDateInput = function () {
        return this.creationDateInput.getAttribute('value');
    }

    postCommentsSelectLastOption = function () {
        this.postCommentsSelect.all(by.tagName('option')).last().click();
    }

    postCommentsSelectOption = function (option) {
        this.postCommentsSelect.sendKeys(option);
    }

    getPostCommentsSelect = function () {
        return this.postCommentsSelect;
    }

    getPostCommentsSelectedOption = function () {
        return this.postCommentsSelect.element(by.css('option:checked')).getText();
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
