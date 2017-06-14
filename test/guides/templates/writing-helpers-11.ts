import Ember from 'ember';

export default Ember.Helper.helper(function([param, ...rest]) {
  let value = Ember.Handlebars.Utils.escapeExpression(param);
  return Ember.String.htmlSafe(`<b>${value}</b>`);
});
