import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['isEnabled::disabled'],
  isEnabled: false
});
