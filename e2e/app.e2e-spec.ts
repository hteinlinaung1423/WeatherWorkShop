import { WeatherWorkshopPage } from './app.po';

describe('weather-workshop App', () => {
  let page: WeatherWorkshopPage;

  beforeEach(() => {
    page = new WeatherWorkshopPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
