import Ember from 'ember';

export default Ember.Component.extend({
  doubleClick() {
    Ember.Logger.info("DoubleClickableComponent was clicked!");
    return true;
  }
});
