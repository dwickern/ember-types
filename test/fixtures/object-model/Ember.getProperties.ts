import {assertType} from '../assert';

const person = Ember.Object.create({
    name: 'Fred',
    age: 29,
});

assertType<{ name: string }>(Ember.getProperties(person, 'name'));
assertType<{ name: string, age: number }>(Ember.getProperties(person, 'name', 'age'));
assertType<{ name: string, age: number }>(Ember.getProperties(person, [ 'name', 'age' ]));

Ember.getProperties(person, 'name', 'nonexistent'); // EXPECT: TS2345



const pojo = { name: 'Fred', age: 29 };
assertType<{ name: string, age: number }>(Ember.getProperties(pojo, 'name', 'age'));
