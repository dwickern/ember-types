import Ember from 'ember';

export default Ember.Object.extend({
  foo: 'bar',
  testMethod() {
    this.set('foo', 'baz');
  }
});
