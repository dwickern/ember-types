import Ember from 'ember';

export default Ember.Component.extend({
  login: Ember.inject.service(),
  actions: {
    deleteUser(idStr) {
      return this.get('login').deleteUserAccount(idStr);
    }
  }
});
