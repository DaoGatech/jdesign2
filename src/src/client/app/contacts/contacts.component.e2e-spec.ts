describe('Contacts', () => {

  beforeEach( () => {
    browser.get('/contacts');
  });

  it('should have correct feature heading', () => {
    expect(element(by.css('sd-contacts h2')).getText()).toEqual('Features');
  });

});
