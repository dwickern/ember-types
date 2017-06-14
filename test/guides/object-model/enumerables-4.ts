let hawaii = Ember.Object.create({
  capital: 'Honolulu'
});

let california = Ember.Object.create({
  capital: 'Sacramento'
});

let states = [hawaii, california];

states.mapBy('capital');
//=> ["Honolulu", "Sacramento"]
