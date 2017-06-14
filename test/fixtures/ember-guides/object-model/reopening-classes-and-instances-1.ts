Person.reopen({
  isPerson: true
});

Person.create().get('isPerson'); // true
