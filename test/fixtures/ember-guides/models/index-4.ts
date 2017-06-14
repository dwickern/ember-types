import DS from 'ember-data';
export default DS.Model.extend({
  lineItems: DS.hasMany('line-item')
});
