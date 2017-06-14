// This won't work:
doStuffWhenInserted: function() {
  /* awesome sauce */
}.on('didInsertElement');

// Instead, do this:
doStuffWhenInserted: Ember.on('didInsertElement', function() {
  /* awesome sauce */
});
