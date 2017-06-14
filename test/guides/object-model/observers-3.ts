Person.reopen({
  partOfNameChanged: Ember.observer('firstName', 'lastName', function() {
    // Because both firstName and lastName were set, this observer will fire twice.
  })
});

person.set('firstName', 'John');
person.set('lastName', 'Smith');
