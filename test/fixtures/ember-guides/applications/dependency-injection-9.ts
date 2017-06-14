import Ember from 'ember';
const {
  Component,
  computed,
  getOwner
} = Ember;

// Usage:
//
//   {{play-audio song=song}}
//
export default Component.extend({
  audioService: computed('song.audioType', function() {
    let applicationInstance = getOwner(this);
    let audioType = this.get('song.audioType');
    return applicationInstance.lookup(`service:audio-${audioType}`);
  }),

  click() {
    let player = this.get('audioService');
    player.play(this.get('song.file'));
  }
});
