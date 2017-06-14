import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    willTransition(transition) {
      if (this.controller.get('userHasEnteredData') &&
          !confirm('Are you sure you want to abandon progress?')) {
        transition.abort();
      } else {
        // Bubble the `willTransition` action so that
        // parent routes can decide whether or not to abort.
        return true;
      }
    }
  }
});
