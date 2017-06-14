Person.reopen({
  // override `say` to add an ! at the end
  say(thing) {
    this._super(thing + '!');
  }
});
