//packages/ember-routing/lib/system/router.js
declare namespace Ember {
    /*
    The `Ember.Router` class manages the application state and URLs. Refer to
    the [routing guide](https://emberjs.com/guides/routing/) for documentation.
    */
    class Router {
        /*
        The `location` property determines the type of URL's that your
        application will use.
        
        The following location types are currently available:
        
        * `history` - use the browser's history API to make the URLs look just like any standard URL
        * `hash` - use `#` to separate the server part of the URL from the Ember part: `/blog/#/posts/new`
        * `none` - do not store the Ember URL in the actual browser URL (mainly used for testing)
        * `auto` - use the best option based on browser capabilites: `history` if possible, then `hash` if possible, otherwise `none`
        
        Note: If using ember-cli, this value is defaulted to `auto` by the `locationType` setting of `/config/environment.js`
        */
        location: any;
        /*
        Represents the URL of the root of the application, often '/'. This prefix is
        assumed on all routes defined on this router.
        */
        rootURL: any;
        /*
        Handles updating the paths and notifying any listeners of the URL
        change.
        
        Triggers the router level `didTransition` hook.
        
        For example, to notify google analytics when the route changes,
        you could use this hook.  (Note: requires also including GA scripts, etc.)
        
        ```javascript
        let Router = Ember.Router.extend({
          location: config.locationType,
        
          didTransition: function() {
            this._super(...arguments);
        
            return ga('send', 'pageview', {
              'page': this.get('url'),
              'title': this.get('url')
            });
          }
        });
        ```
        */
        didTransition(): any;
        /*
        Handles notifying any listeners of an impending URL
        change.
        
        Triggers the router level `willTransition` hook.
        */
        willTransition(): any;
        /*
        Transition the application into another route. The route may
        be either a single route or route path:
        
        See [Route.transitionTo](https://emberjs.com/api/classes/Ember.Route.html#method_transitionTo) for more info.
        */
        transitionTo(name: string, ...models: any[], options: any): Transition;
        /*
        The `Router.map` function allows you to define mappings from URLs to routes
        in your application. These mappings are defined within the
        supplied callback function using `this.route`.
        
        The first parameter is the name of the route which is used by default as the
        path name as well.
        
        The second parameter is the optional options hash. Available options are:
        
          * `path`: allows you to provide your own path as well as mark dynamic
            segments.
          * `resetNamespace`: false by default; when nesting routes, ember will
            combine the route names to form the fully-qualified route name, which is
            used with `{{link-to}}` or manually transitioning to routes. Setting
            `resetNamespace: true` will cause the route not to inherit from its
            parent route's names. This is handy for preventing extremely long route names.
            Keep in mind that the actual URL path behavior is still retained.
        
        The third parameter is a function, which can be used to nest routes.
        Nested routes, by default, will have the parent route tree's route name and
        path prepended to it's own.
        
        ```javascript
        App.Router.map(function(){
          this.route('post', { path: '/post/:post_id' }, function() {
            this.route('edit');
            this.route('comments', { resetNamespace: true }, function() {
              this.route('new');
            });
          });
        });
        ```
        
        For more detailed documentation and examples please see
        [the guides](https://emberjs.com/guides/routing/defining-your-routes/).
        */
        map(callback: any): any;
    }
}
