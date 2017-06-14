import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    handleTyping() {
      //the fetchResults function is passed into the component from its parent
      Ember.run.debounce(this, this.get('fetchResults'), this.get('searchValue'), 250);
    }
  }
});
