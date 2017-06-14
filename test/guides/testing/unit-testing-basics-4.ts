test('should update foo on testMethod', function(assert) {
  const someThing = this.subject();
  someThing.testMethod();
  assert.equal(someThing.get('foo'), 'baz');
});
