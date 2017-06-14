import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(transition) {
    if (!this.controllerFor('auth').get('userIsLoggedIn')) {
      let loginController = this.controllerFor('login');
      loginController.set('previousTransition', transition);
      this.transitionTo('login');
    }
  }
});
