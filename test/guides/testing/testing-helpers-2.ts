import { formatCurrency } from 'my-app/helpers/format-currency';
import { module, test } from 'qunit';

module('Unit | Helper | format currency');

test('formats 199 with $ as currency sign', function(assert) {
  assert.equal(formatCurrency([199], { sign: '$' }), '$1.99');
});
