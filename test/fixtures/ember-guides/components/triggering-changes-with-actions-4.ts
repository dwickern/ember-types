import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    launchConfirmDialog() {
      this.set('confirmShown', true);
    },

    submitConfirm() {
      // call onConfirm with the value of the input field as an argument
      let promise = this.get('onConfirm')();
      promise.then(() => {
        this.set('confirmShown', false);
      });
    },

    cancelConfirm() {
      this.set('confirmShown', false);
    }
  }
});
