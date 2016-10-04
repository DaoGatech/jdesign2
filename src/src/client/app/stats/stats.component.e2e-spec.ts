describe('Stats', () => {

  beforeEach( () => {
    browser.get('/stats');
  });

  it('should have correct feature heading', () => {
    expect(element(by.css('sd-stats h2')).getText()).toEqual('Features');
  });

});
