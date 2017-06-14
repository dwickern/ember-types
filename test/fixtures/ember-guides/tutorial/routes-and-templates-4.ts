test('should link to information about the company.', function (assert) {
  visit('/');
  click('a:contains("About")');
  andThen(function() {
    assert.equal(currentURL(), '/about', 'should navigate to about');
  });
});

test('should link to contact information', function (assert) {
  visit('/');
  click('a:contains("Contact")');
  andThen(function() {
    assert.equal(currentURL(), '/contact', 'should navigate to contact');
  });
});
