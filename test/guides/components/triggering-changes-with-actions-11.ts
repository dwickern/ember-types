import Ember from 'ember';

export default Ember.Component.extend({
  login: Ember.inject.service(),

  actions: {
    userDidDeleteAccount() {
      this.get('login').deleteUser();
      this.get('didDelete')(this.get('login.currentUserObj'));
    }
  }
});
