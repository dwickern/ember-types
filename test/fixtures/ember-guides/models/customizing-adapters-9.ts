import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  session: Ember.inject.service('session'),
  headers: Ember.computed('session.authToken', function() {
    return {
      'API_KEY': this.get('session.authToken'),
      'ANOTHER_HEADER': 'Some header value'
    };
  })
});
