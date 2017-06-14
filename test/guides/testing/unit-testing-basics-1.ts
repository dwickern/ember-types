import Ember from 'ember';

export default Ember.Object.extend({
  foo: 'bar',

  computedFoo: Ember.computed('foo', function() {
    const foo = this.get('foo');
    return `computed ${foo}`;
  })
});
