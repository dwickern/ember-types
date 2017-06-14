test('should set other prop to yes when foo changes', function(assert) {
  const someThing = this.subject();
  someThing.set('foo', 'baz');
  assert.equal(someThing.get('other'), 'yes');
});
