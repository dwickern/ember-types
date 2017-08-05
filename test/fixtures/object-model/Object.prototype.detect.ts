
import {assertType} from "../assert";

const MyComponent = Ember.Component.extend({
    foo: 'bar'
});

let x: any;
if (MyComponent.detect(x)) {
    assertType<string>(x.get('foo'));
}
