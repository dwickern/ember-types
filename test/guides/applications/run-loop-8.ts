$('a').click(() => {
  console.log('Doing things...');

  Ember.run.schedule('actions', () => {
    // Do more things
  });
});
