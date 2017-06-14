import Ember from 'ember';

export default Ember.Helper.extend({
  authentication: Ember.inject.service(),
  compute() {
    let authentication = this.get('authentication');

    if (authentication.get('isAuthenticated')) {
      return 'Welcome back, ' + authentication.get('username');
    } else {
      return 'Not logged in';
    }
  }
});
