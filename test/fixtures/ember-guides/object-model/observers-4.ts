Person.reopen({
  partOfNameChanged: Ember.observer('firstName', 'lastName', function() {
    Ember.run.once(this, 'processFullName');
  }),

  processFullName() {
    // This will only fire once if you set two properties at the same time, and
    // will also happen in the next run loop once all properties are synchronized
    console.log(this.get('fullName'));
  }
});

person.set('firstName', 'John');
person.set('lastName', 'Smith');
