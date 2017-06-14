import Ember from 'ember';

export default Ember.Component.extend({
  //will load the service in file /app/services/shopping-cart.js
  cart: Ember.inject.service('shopping-cart')
});
