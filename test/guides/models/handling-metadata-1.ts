import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('user').then((results) => {
      return {
        users: results,
        meta: results.get('meta')
      };
    });
  },

  setupController(controller, { users, meta }) {
    this._super(controller, users);
    controller.set('meta', meta);
  }
});
