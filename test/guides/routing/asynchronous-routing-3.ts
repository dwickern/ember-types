import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return iHopeThisWorks().catch(function() {
      // Promise rejected, fulfill with some default value to
      // use as the route's model and continue on with the transition
      return { msg: 'Recovered from rejected promise' };
    });
  }
});
