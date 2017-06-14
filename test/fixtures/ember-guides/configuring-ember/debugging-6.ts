import Ember from 'ember';
import RSVP from 'rsvp';

RSVP.on('error', function(error) {
  Ember.assert(error, false);
});
