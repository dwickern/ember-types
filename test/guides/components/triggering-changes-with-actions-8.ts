export default Ember.Component.extend({
  actions: {
    //...
    submitConfirm() {
      // call onConfirm with a second argument
      let promise = this.get('onConfirm')(this.get('confirmValue'));
      promise.then(() => {
        this.set('confirmShown', false);
      });
    },
    //...
  }
});
