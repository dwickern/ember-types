// This won't work:
fullNameDidChange: function() {
  console.log('Full name changed');
}.observes('fullName')


// Instead, do this:
fullNameDidChange: Ember.observer('fullName', function() {
  console.log('Full name changed');
})
