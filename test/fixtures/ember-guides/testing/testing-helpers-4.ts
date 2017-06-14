test('updates the currency sign when it changes', function(assert) {
  this.set('value', 199);
  this.set('sign', '$');

  this.render(hbs`{{format-curreny value sign=sign}}`);

  assert.equal(this.$().text().trim(), '$1.99', 'Value is formatted with $');

  this.set('sign', '€');

  assert.equal(this.$().text().trim(), '€1.99', 'Value is formatted with €');
});
