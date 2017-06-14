import Ember from 'ember';

export default Ember.Helper.helper(function([arg1, arg2]) {
  console.log(arg1); // => "hello"
  console.log(arg2); // => "world"
});
