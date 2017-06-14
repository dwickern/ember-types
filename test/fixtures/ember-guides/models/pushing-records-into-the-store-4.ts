import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    this.get('store').pushPayload({
      albums: [
        {
          id: 1,
          title: 'Fever Moving Parts',
          artist: 'David Bazan',
          song_count: 10
        },
        {
          id: 2,
          title: 'Calgary b/w I Can't Make You Love Me/Nick Of Time',
          artist: 'Bon Iver',
          song_count: 2
        }
      ]
    });
  }
});
