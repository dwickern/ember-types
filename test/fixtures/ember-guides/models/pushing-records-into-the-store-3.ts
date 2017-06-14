import DS from 'ember-data';

export default DS.RestSerializer.extend({
  normalize(typeHash, hash) {
    hash['songCount'] = hash['song_count']
    delete hash['song_count']
    return this._super(typeHash, hash);
  }

})
