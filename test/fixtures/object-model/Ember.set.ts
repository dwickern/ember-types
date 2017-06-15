import {assertType} from '../assert';

const person = Ember.Object.create({
    name: 'Fred',
    age: 29,
});

assertType<string>(Ember.set(person, 'name', 'Joe'));
assertType<number>(Ember.set(person, 'age', 35));

Ember.set(person, 'name', 42); // EXPECT: TS2345
Ember.set(person, 'nonexistent', 42); // EXPECT: TS2345

const pojo = { name: 'Fred' };

assertType<string>(Ember.set(pojo, 'name', 'Joe'));
Ember.set(pojo, 'nonexistent', 42); // EXPECT: TS2345
