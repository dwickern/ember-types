import Ember from 'ember';
import {assertType} from '../assert';

const Person = Ember.Object.extend({
    firstName: '',
    lastName: '',

    getFullName() { return `${this.firstName} ${this.lastName}`; }
});

assertType<string>(Person.prototype.firstName);
assertType<() => string>(Person.prototype.getFullName);

const person = Person.create({
    firstName: 'Joe',
    lastName: 'Blow',
    extra: 42
});

assertType<string>(person.getFullName());
assertType<number>(person.extra);
