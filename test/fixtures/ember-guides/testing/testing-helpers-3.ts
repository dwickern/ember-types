import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('format-currency', 'Integration | Component | pretty color', {
  integration: true
});

test('formats 199 with $ as currency sign', function(assert) {
  this.set('value', 199);
  this.set('sign', '$');

  this.render(hbs`{{format-curreny value sign=sign}}`);

  assert.equal(this.$().text().trim(), '$1.99');
});
