import Ember from 'ember';

export default Ember.Helper.helper(function([param, ...rest]) {
  return `<b>${param}</b>`;
});
