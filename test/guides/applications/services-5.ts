import Ember from 'ember';

export default Ember.Component.extend({
  //will load the service in file /app/services/shopping-cart.js
  cart: Ember.computed(function() {
    return Ember.getOwner(this).lookup('service:shopping-cart');
  })
});
