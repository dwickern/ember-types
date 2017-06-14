import DS from 'ember-data';

export default DS.Model.extend({
  blogPosts: DS.hasMany('blog-post')
});
