import Ember from 'ember';

export function initialize(application) {
  let Logger = Ember.Object.extend({
    log(m) {
      console.log(m);
    }
  });

  application.register('logger:main', Logger);
}

export default {
  name: 'logger',
  initialize: initialize
};
