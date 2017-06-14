// GET to /persons?filter[name]=Peter
this.get('store').query('person', {
  filter: {
    name: 'Peter'
  }
}).then(function(peters) {
  // Do something with `peters`
});
