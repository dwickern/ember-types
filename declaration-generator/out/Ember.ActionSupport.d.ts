//packages/ember-views/lib/mixins/action_support.js
declare namespace Ember {
    private class ActionSupport {
        /*
        Calls an action passed to a component.
        
        For example a component for playing or pausing music may translate click events
        into action notifications of "play" or "stop" depending on some internal state
        of the component:
        
        ```javascript
        // app/components/play-button.js
        export default Ember.Component.extend({
          click() {
            if (this.get('isPlaying')) {
              this.sendAction('play');
            } else {
              this.sendAction('stop');
            }
          }
        });
        ```
        
        The actions "play" and "stop" must be passed to this `play-button` component:
        
        ```handlebars
        {{! app/templates/application.hbs }}
        {{play-button play=(action "musicStarted") stop=(action "musicStopped")}}
        ```
        
        When the component receives a browser `click` event it translate this
        interaction into application-specific semantics ("play" or "stop") and
        calls the specified action.
        
        ```javascript
        // app/controller/application.js
        export default Ember.Controller.extend({
          actions: {
            musicStarted() {
              // called when the play button is clicked
              // and the music started playing
            },
            musicStopped() {
              // called when the play button is clicked
              // and the music stopped playing
            }
          }
        });
        ```
        
        If no action is passed to `sendAction` a default name of "action"
        is assumed.
        
        ```javascript
        // app/components/next-button.js
        export default Ember.Component.extend({
          click() {
            this.sendAction();
          }
        });
        ```
        
        ```handlebars
        {{! app/templates/application.hbs }}
        {{next-button action=(action "playNextSongInAlbum")}}
        ```
        
        ```javascript
        // app/controllers/application.js
        App.ApplicationController = Ember.Controller.extend({
          actions: {
            playNextSongInAlbum() {
              ...
            }
          }
        });
        ```
        */
        sendAction(action: string, params: any): any;
    }
}
