import {assertType} from '../assert';

interface Person extends Ember.Object {
    firstName: string;
    lastName: string;
    age: number;
    country: string;
    fullName: string;
}

const Person = Ember.Object.extend({
    firstName: null,
    lastName: null,
    age: null,
    country: null,

    fullName: Ember.computed<Person, string>('firstName', 'lastName', function() {
        return `${this.get('firstName')} ${this.get('lastName')}`;
    }),

    description: Ember.computed<Person, string>('fullName', 'age', 'country', function() {
        return `${this.get('fullName')}; Age: ${this.get('age')}; Country: ${this.get('country')}`;
    })
});

let captainAmerica = Person.create({
    firstName: 'Steve',
    lastName: 'Rogers',
    age: 80,
    country: 'USA'
});

assertType<string>(captainAmerica.get('description')); // "Steve Rogers; Age: 80; Country: USA"
