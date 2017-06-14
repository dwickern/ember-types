let obj = Ember.Object.extend({
  baz: {foo: 'BLAMMO', bar: 'BLAZORZ'},

  something: Ember.computed('baz.foo', 'baz.bar', function() {
    return this.get('baz.foo') + ' ' + this.get('baz.bar');
  })
});
