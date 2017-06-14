…
  fullName: Ember.computed('{firstName,lastName}', function() {
    let firstName = this.get('firstName');
    let lastName = this.get('lastName');

    return `${firstName} ${lastName}`;
  })
…
