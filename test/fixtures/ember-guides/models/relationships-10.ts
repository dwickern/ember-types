import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  bestFriend: DS.belongsTo('user', { inverse: 'bestFriend' }),
});
