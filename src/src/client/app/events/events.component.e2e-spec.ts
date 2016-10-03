describe('Events', () => {

  beforeEach( () => {
    browser.get('/events');
  });

  it('should have correct feature heading', () => {
    expect(element(by.css('sd-events h2')).getText()).toEqual('Features');
  });

});
