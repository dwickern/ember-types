Person = Ember.Object.extend({
  name: null,
  isHappy: false
});

let people = [
  Person.create({ name: 'Yehuda', isHappy: true }),
  Person.create({ name: 'Majd', isHappy: false })
];

people.every((person, index, self) => person.get('isHappy'));

//=> false
