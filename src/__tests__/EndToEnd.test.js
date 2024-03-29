import Puppeteer from "puppeteer";

// Feature:Show/hide an event's details
describe('show/hide an event details', () => {
  let browser;
  let page;  
  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await Puppeteer.launch({
      headless: false,
      slowMo: 250, // slow down by 250ms
      ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .extra-details.hide');
    expect(eventDetails).toBeNull();    
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event .show-details-btn');
    const eventDetails = await page.$('.event .extra-details.show');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapsed an event to hide its details', async () => {
    await page.click('.event .hide-details-btn');
    const eventDetails = await page.$('.event .extra-details.hide');
    expect(eventDetails).toBeNull();
  });
});