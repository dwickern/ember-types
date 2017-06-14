import Ember from 'ember';

export default Ember.Component.extend({
  comment: '',

  actions: {
    submitComment() {
      this.get('submitComment')({ comment: this.get('comment') });
    }
  }
});
