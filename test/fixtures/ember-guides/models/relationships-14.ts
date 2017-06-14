import PaymentMethod from './payment-method';
import Ember from 'ember';

export default PaymentMethod.extend({
  obfuscatedIdentifier: Ember.computed('last4', function () {
    return `**** **** **** ${this.get('last4')}`;
  })
});
