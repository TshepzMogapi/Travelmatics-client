import { TravelmaticsTemplatePage } from './app.po';

describe('Travelmatics App', function() {
  let page: TravelmaticsTemplatePage;

  beforeEach(() => {
    page = new TravelmaticsTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
