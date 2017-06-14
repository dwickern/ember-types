import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['draggable'],
  draggable: 'true',

  dragOver() {
    return false;
  },

  drop(event) {
    let id = event.dataTransfer.getData('text/data');
    this.get('action')(id);
  }
});
