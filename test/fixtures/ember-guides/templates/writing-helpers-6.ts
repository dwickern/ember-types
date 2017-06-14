import Ember from 'ember';

export default Ember.Helper.helper(function(params, { option1, option2, option3 }) {
  console.log(option1); // => "hello"
  console.log(option2); // => "world"
  console.log(option3); // => "goodbye cruel world"
});
