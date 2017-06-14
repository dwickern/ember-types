import DS from 'ember-data';

export default DS.Model.extend({
  originalPost: DS.belongsTo('post')
});
