import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  keyForRelationship(key, relationship) {
    return key + 'Ids';
  }
});
