import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(/* transition */) {
    this.transitionTo('posts'); // Implicitly aborts the on-going transition.
  }
});
