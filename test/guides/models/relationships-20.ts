export default Ember.Route.extend({
  model() {
    // GET to /artists?filter[name]=Adele&include=albums
    this.store.query('artist', {
      filter: {name: 'Adele'},
      include: 'albums'
    }).then(function(artists) {
      return artists.get('firstObject');
    });
  }
});
