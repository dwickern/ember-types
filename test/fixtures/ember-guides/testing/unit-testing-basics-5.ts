import Ember from 'ember';

export default Ember.Object.extend({
  count: 0,
  calc() {
    this.incrementProperty('count');
    let count = this.get('count');
    return `count: ${count}`;
  }
});
