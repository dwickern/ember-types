import DS from 'ember-data';

export default DS.Model.extend({
  spent: DS.attr('dollars')
});
