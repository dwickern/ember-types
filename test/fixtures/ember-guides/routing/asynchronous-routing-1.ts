import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model() {
    return new RSVP.Promise(function(resolve) {
      Ember.run.later(function() {
        resolve({ msg: 'Hold Your Horses' });
      }, 3000);
    });
  },

  setupController(controller, model) {
    console.log(model.msg); // "Hold Your Horses"
  }
});
