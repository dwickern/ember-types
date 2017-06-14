import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['isUrgent:urgent'],
  isUrgent: true
});
