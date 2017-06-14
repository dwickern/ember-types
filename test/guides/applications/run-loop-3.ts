let User = Ember.Object.extend({
  firstName: null,
  lastName: null,
  fullName: Ember.computed('firstName', 'lastName', function() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  })
});
