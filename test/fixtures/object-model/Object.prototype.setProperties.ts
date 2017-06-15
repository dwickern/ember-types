import {assertType} from '../assert';

const person = Ember.Object.create({
    name: 'Fred',
    age: 29,
});

assertType<{ name: string }>(
    person.setProperties({ name: 'Joe' })
);
assertType<{ name: string, age: number }>(
    person.setProperties({ name: 'Joe', age: 35 })
);

person.setProperties({ nme: 'Joe', age: 35 }); // EXPECT: TS2345
