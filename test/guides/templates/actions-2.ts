import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    select(post) {
      console.log(post.get('title'));
    }
  }
});
