import DS from 'ember-data';

export default DS.JSONSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    author: {
      serialize: false,
      deserialize: 'records'
    },
    comments: {
      deserialize: 'records',
      serialize: 'ids'
    }
  }
});
