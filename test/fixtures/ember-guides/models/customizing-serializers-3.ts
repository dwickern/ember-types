import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  serialize(snapshot, options) {
    let json = this._super(...arguments);

    json.data.attributes.cost = {
      amount: json.data.attributes.amount,
      currency: json.data.attributes.currency
    };

    delete json.data.attributes.amount;
    delete json.data.attributes.currency;

    return json;
  },
});
