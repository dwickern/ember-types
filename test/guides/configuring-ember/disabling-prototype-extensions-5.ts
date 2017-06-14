// This won't work:
fullName: function() {
  return `${this.get('firstName')} ${this.get('lastName')}`;
}.property('firstName', 'lastName')


// Instead, do this:
fullName: Ember.computed('firstName', 'lastName', function() {
  return `${this.get('firstName')} ${this.get('lastName')}`;
})
