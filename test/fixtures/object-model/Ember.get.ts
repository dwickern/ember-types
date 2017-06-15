import {assertType} from '../assert';

const person = Ember.Object.create({
    name: 'Fred',
    age: 29,
});

assertType<string>(Ember.get(person, 'name'));
assertType<number>(Ember.get(person, 'age'));

Ember.get(person, 'name') as number; // EXPECT: TS2352
Ember.get(person, 'nonexistent'); // EXPECT: TS2345


const pojo = { name: 'Fred' };

assertType<string>(Ember.get(pojo, 'name'));
Ember.get(pojo, 'nonexistent'); // EXPECT: TS2345
