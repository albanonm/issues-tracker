import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });


  it('should exists search text input', () => {
    page.navigateTo();
    expect(page.getSearchInput()).toEqual('search');
  });

  it('should exists search submit button', () => {
    page.navigateTo();
    expect(page.getSearchInput()).toEqual('submit');
  });




  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Welcome to issues-tracker!');
  });






  
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
