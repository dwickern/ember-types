import Ember from 'ember';

export default Ember.Helper.extend({
  compute([value, ...rest], hash) {
    let dollars = Math.floor(value / 100);
    let cents = value % 100;
    let sign = hash.sign === undefined ? '$' : hash.sign;

    if (cents.toString().length === 1) { cents = '0' + cents; }
    return `${sign}${dollars}.${cents}`;
  }
});
