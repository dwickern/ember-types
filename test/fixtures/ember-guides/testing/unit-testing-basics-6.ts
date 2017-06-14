test('should return incremented count on calc', function(assert) {
  const someThing = this.subject();
  assert.equal(someThing.calc(), 'count: 1');
  assert.equal(someThing.calc(), 'count: 2');
});
