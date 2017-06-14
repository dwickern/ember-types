import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    toggleBody() {
      this.toggleProperty('isShowingBody');
    }
  }
});
