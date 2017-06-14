import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    login() {
      // Log the user in, then reattempt previous transition if it exists.
      let previousTransition = this.get('previousTransition');
      if (previousTransition) {
        this.set('previousTransition', null);
        previousTransition.retry();
      } else {
        // Default back to homepage
        this.transitionToRoute('index');
      }
    }
  }
});
