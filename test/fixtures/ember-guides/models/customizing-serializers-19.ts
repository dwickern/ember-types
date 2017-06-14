import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  tag: DS.attr('string'),
  comments: hasMany('comment', { async: false }),
  relatedPosts: hasMany('post')
});
