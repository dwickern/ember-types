import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  title: null,
  attributeBindings: ['title'],
});
