import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    confirm: function(data) {
      $.ajax({
        data: data,
        method: 'POST',
        url: 'process-payment'
      }).then((digitalInventory) => {
        this.get('store').pushPayload(digitalInventory);
        this.transitionTo('thank-you');
      });
    }
  }
});
