import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(transition) {
    if (new Date() > new Date('January 1, 1980')) {
      alert('Sorry, you need a time machine to enter this route.');
      transition.abort();
    }
  }
});
