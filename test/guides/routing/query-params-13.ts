import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['page', 'filter',
    {
      showMagnifyingGlass: {
        scope: 'controller',
        as: 'glass'
      }
    }
  ]
});
