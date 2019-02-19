import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  getSearchInput() {
    return element(by.css('app-root nav form input')).getAttribute('type') as Promise<string>;
  }

  getSearchbutton() {
    return element(by.css('app-root nav form button')).getAttribute('submit') as Promise<string>;
  }
}
