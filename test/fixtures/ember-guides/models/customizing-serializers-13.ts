import DS from 'ember-data';

export default DS.Transform.extend({
  serialize(value) {
    return [value.get('x'), value.get('y')];
  },
  deserialize(value) {
    return Ember.Object.create({ x: value[0], y: value[1] });
  }
});
