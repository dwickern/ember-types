import {assertType} from '../assert';

const person = Ember.Object.create({
    name: 'Fred',
    age: 29,
});

assertType<{ name: string }>(
    Ember.setProperties(person, { name: 'Joe' })
);
assertType<{ name: string, age: number }>(
    Ember.setProperties(person, { name: 'Joe', age: 35 })
);

Ember.setProperties(person, { nme: 'Joe', age: 35 }); // EXPECT: TS2345
