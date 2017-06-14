Ember.onerror = function(error) {
  Ember.$.ajax('/error-notification', {
    type: 'POST',
    data: {
      stack: error.stack,
      otherInformation: 'exception message'
    }
  });
}
