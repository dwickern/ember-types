import DS from 'ember-data';

export default DS.Model.extend({
  onePost: DS.belongsTo('blog-post', { inverse: null }),
  twoPost: DS.belongsTo('blog-post'),
  redPost: DS.belongsTo('blog-post'),
  bluePost: DS.belongsTo('blog-post')
});
