import { assertType } from '../assert';

let emptyAny = Ember.A();
assertType<Ember.NativeArray<any>>(emptyAny);

let emptyString = Ember.A<string>();
assertType<Ember.NativeArray<string>>(emptyString);

let numbers = Ember.A([ 1, 2, 3 ]);
assertType<Ember.NativeArray<number>>(numbers);

let nested = Ember.A(Ember.A(Ember.A([ 1, 2, 3 ])));
assertType<Ember.NativeArray<number>>(nested);
