import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').findAll('privileged-model');
  },
  actions: {
    error(error, transition) {
      if (error.status === '403') {
        this.replaceWith('login');
      } else {
        // Let the route above this handle the error.
        return true;
      }
    }
  }
});
