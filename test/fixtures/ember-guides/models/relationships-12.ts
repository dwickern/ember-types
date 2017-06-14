import DS from 'ember-data';

export default DS.Model.extend({
  paymentMethods: DS.hasMany('payment-method', { polymorphic: true })
});
