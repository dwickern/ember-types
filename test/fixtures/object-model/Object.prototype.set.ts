import {assertType} from '../assert';

const person = Ember.Object.create({
    name: 'Fred',
    age: 29,
});

assertType<string>(person.set('name', 'Joe'));
assertType<number>(person.set('age', 35));

person.set('name', 42); // EXPECT: TS2345
person.set('nonexistent', 42); // EXPECT: TS2345



const pojo = { name: 'Fred' };
pojo.set('name', 'Joe'); // EXPECT: TS2339
