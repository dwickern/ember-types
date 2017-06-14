import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  headers: Ember.computed(function() {
    return {
      'API_KEY': Ember.get(document.cookie.match(/apiKey=([^;]*)/), '1'),
      'ANOTHER_HEADER': 'Some header value'
    };
  }).volatile()
});
