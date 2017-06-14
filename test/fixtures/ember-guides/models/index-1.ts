import Ember from 'ember';

export default Ember.Component.extend({
  willRender() {
    $.getJSON('/drafts').then(data => {
      this.set('drafts', data);
    });
  }
});
