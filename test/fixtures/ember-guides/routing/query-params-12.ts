import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: [{
    showMagnifyingGlass: {
      scope: 'controller'
    }
  }]
});
