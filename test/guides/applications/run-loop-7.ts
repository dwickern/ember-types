$('a').click(() => {
  Ember.run(() => {  // begin loop
    // Code that results in jobs being scheduled goes here
  }); // end loop, jobs are flushed and executed
});
