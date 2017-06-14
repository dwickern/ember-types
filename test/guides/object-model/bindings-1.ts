husband = Ember.Object.create({
  pets: 0
});

Wife = Ember.Object.extend({
  pets: Ember.computed.alias('husband.pets')
});

wife = Wife.create({
  husband: husband
});

wife.get('pets'); // 0

// Someone gets a pet.
husband.set('pets', 1);
wife.get('pets'); // 1
