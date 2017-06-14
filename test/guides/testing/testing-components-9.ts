import Ember from 'ember';

export default Ember.Component.extend({
  locationService: Ember.inject.service('location-service'),

  // when the coordinates change, call the location service to get the current city and country
  city: Ember.computed('locationService.currentLocation', function () {
    return this.get('locationService').getCurrentCity();
  }),

  country: Ember.computed('locationService.currentLocation', function () {
    return this.get('locationService').getCurrentCountry();
  })
});
