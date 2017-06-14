export default Ember.Route.extend({
  model(params) {
   return this.store.findRecord('post', params.post_id, {include: 'comments,comments.author'});
  }
});
