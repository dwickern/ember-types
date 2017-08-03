import Ember from 'ember';
import {assertType} from '../assert';

function computed<K extends string>(...keys: K[]) {
    return function (target: Pick<any, K>, propertyKey: string, descriptor: PropertyDescriptor) {
    }
}

class Foo extends Ember.Object {
    first: '';
    last: '';

    @computed('first', 'last')
    get name() {
        assertType<string>(this.get('first'));

        return `${this.get('first')} ${this.get('last')}`;
    }
}

let foo = Foo.create();
assertType<string>(foo.get('first'));
assertType<string>(foo.get('name'));

class MyComponent extends Ember.Component {
    firstName: '';
    lastName: '';

    @computed('firstName', 'lastName')
    get fullName() {
        return `${this.get('firstName')} ${this.get('lastNmae')}`;
    }

    didInsertElement(): void {
        super.didInsertElement();

        this.$('.my-class').val('test');
    }
}











