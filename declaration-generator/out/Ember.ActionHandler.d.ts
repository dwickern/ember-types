//packages/ember-runtime/lib/mixins/action_handler.js
declare namespace Ember {
    /*
    `Ember.ActionHandler` is available on some familiar classes including
    `Ember.Route`, `Ember.Component`, and `Ember.Controller`.
    (Internally the mixin is used by `Ember.CoreView`, `Ember.ControllerMixin`,
    and `Ember.Route` and available to the above classes through
    inheritance.)
    */
    private class ActionHandler {
        /*
        The collection of functions, keyed by name, available on this
        `ActionHandler` as action targets.
        
        These functions will be invoked when a matching `{{action}}` is triggered
        from within a template and the application's current route is this route.
        
        Actions can also be invoked from other parts of your application
        via `ActionHandler#send`.
        
        The `actions` hash will inherit action handlers from
        the `actions` hash defined on extended parent classes
        or mixins rather than just replace the entire hash, e.g.:
        
        ```js
        App.CanDisplayBanner = Ember.Mixin.create({
          actions: {
            displayBanner(msg) {
              // ...
            }
          }
        });
        
        App.WelcomeRoute = Ember.Route.extend(App.CanDisplayBanner, {
          actions: {
            playMusic() {
              // ...
            }
          }
        });
        
        // `WelcomeRoute`, when active, will be able to respond
        // to both actions, since the actions hash is merged rather
        // then replaced when extending mixins / parent classes.
        this.send('displayBanner');
        this.send('playMusic');
        ```
        
        Within a Controller, Route or Component's action handler,
        the value of the `this` context is the Controller, Route or
        Component object:
        
        ```js
        App.SongRoute = Ember.Route.extend({
          actions: {
            myAction() {
              this.controllerFor("song");
              this.transitionTo("other.route");
              ...
            }
          }
        });
        ```
        
        It is also possible to call `this._super(...arguments)` from within an
        action handler if it overrides a handler defined on a parent
        class or mixin:
        
        Take for example the following routes:
        
        ```js
        App.DebugRoute = Ember.Mixin.create({
          actions: {
            debugRouteInformation() {
              console.debug("trololo");
            }
          }
        });
        
        App.AnnoyingDebugRoute = Ember.Route.extend(App.DebugRoute, {
          actions: {
            debugRouteInformation() {
              // also call the debugRouteInformation of mixed in App.DebugRoute
              this._super(...arguments);
        
              // show additional annoyance
              window.alert(...);
            }
          }
        });
        ```
        
        ## Bubbling
        
        By default, an action will stop bubbling once a handler defined
        on the `actions` hash handles it. To continue bubbling the action,
        you must return `true` from the handler:
        
        ```js
        App.Router.map(function() {
          this.route("album", function() {
            this.route("song");
          });
        });
        
        App.AlbumRoute = Ember.Route.extend({
          actions: {
            startPlaying: function() {
            }
          }
        });
        
        App.AlbumSongRoute = Ember.Route.extend({
          actions: {
            startPlaying() {
              // ...
        
              if (actionShouldAlsoBeTriggeredOnParentRoute) {
                return true;
              }
            }
          }
        });
        ```
        */
        actions: any;
        /*
        Triggers a named action on the `ActionHandler`. Any parameters
        supplied after the `actionName` string will be passed as arguments
        to the action target function.
        
        If the `ActionHandler` has its `target` property set, actions may
        bubble to the `target`. Bubbling happens when an `actionName` can
        not be found in the `ActionHandler`'s `actions` hash or if the
        action target function returns `true`.
        
        Example
        
        ```js
        App.WelcomeRoute = Ember.Route.extend({
          actions: {
            playTheme() {
               this.send('playMusic', 'theme.mp3');
            },
            playMusic(track) {
              // ...
            }
          }
        });
        ```
        */
        send(actionName: string, context: any): any;
    }
}
