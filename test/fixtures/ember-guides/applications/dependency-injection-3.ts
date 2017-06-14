import Ember from 'ember';

export function initialize(application) {
  let Message = Ember.Object.extend({
    text: ''
  });

  application.register('notification:message', Message, { singleton: false });
}

export default {
  name: 'notification',
  initialize: initialize
};
