import {assertType} from '../assert';

const person = Ember.Object.create({
    name: 'Fred',
    age: 29,
});

assertType<string>(person.get('name'));
assertType<number>(person.get('age'));

person.get('name') as number; // EXPECT: TS2352
person.get('nonexistent'); // EXPECT: TS2345


const pojo = { name: 'Fred' };
pojo.get('name'); // EXPECT: TS2339
