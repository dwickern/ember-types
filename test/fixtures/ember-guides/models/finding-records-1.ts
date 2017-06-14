// app/adapters/user.js
import DS from "ember-data";

export default DS.Adapter.extend({
  queryRecord(modelName, query) {
    return Ember.$.getJSON("/api/current_user");
  }
});
