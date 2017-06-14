import PaymentMethod from './payment-method'
import DS from 'ember-data';
import Ember from 'ember';

export default PaymentMethod.extend({
  linkedEmail: DS.attr(),

  obfuscatedIdentifier: Ember.computed('linkedEmail', function () {
    let last5 = this.get('linkedEmail').split('').reverse().slice(0, 5).reverse().join('');

    return `••••${last5}`;
  })
});
