import {assertType} from '../assert';

const person = Ember.Object.create({
    name: 'Fred',
    age: 29,
});

assertType<{ name: string }>(person.getProperties('name'));
assertType<{ name: string, age: number }>(person.getProperties('name', 'age'));
assertType<{ name: string, age: number }>(person.getProperties([ 'name', 'age' ]));
