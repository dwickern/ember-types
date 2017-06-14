import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),
  email: DS.attr('string'),
  verified: DS.attr('boolean', { defaultValue: false }),
  createdAt: DS.attr('date', {
    defaultValue() { return new Date(); }
  })
});
