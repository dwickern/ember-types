import DS from 'ember-data';

export default DS.Model.extend({
  blogPost: DS.belongsTo('blog-post')
});
