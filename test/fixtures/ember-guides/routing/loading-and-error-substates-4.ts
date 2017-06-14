import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').findAll('slow-model');
  },
  actions: {
    loading(transition, originRoute) {
      let controller = this.controllerFor('foo');
      controller.set('currentlyLoading', true);
      return true; // allows the loading template to be shown
    }
  }
});
