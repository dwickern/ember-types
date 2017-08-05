import {assertType} from "../assert";

const MyComponent = Ember.Component.extend({
    foo: 'bar'
});

let x: any;

if (MyComponent.detect(x)) {
    assertType<typeof Ember.Component>(x);
    x.detect(x);
}

if (MyComponent.detectInstance(x)) {
    assertType<Ember.Component>(x);
    assertType<string>(x.get('foo'));
}
