//packages/ember-routing/lib/system/route.js
declare namespace Ember {
    /*
    The `Ember.Route` class is used to define individual routes. Refer to
    the [routing guide](https://emberjs.com/guides/routing/) for documentation.
    */
    class Route {
        /*
        Configuration hash for this route's queryParams. The possible
        configuration options and their defaults are as follows
        (assuming a query param whose controller property is `page`):
        
        ```javascript
        queryParams: {
          page: {
            // By default, controller query param properties don't
            // cause a full transition when they are changed, but
            // rather only cause the URL to update. Setting
            // `refreshModel` to true will cause an "in-place"
            // transition to occur, whereby the model hooks for
            // this route (and any child routes) will re-fire, allowing
            // you to reload models (e.g., from the server) using the
            // updated query param values.
            refreshModel: false,
        
            // By default, changes to controller query param properties
            // cause the URL to update via `pushState`, which means an
            // item will be added to the browser's history, allowing
            // you to use the back button to restore the app to the
            // previous state before the query param property was changed.
            // Setting `replace` to true will use `replaceState` (or its
            // hash location equivalent), which causes no browser history
            // item to be added. This options name and default value are
            // the same as the `link-to` helper's `replace` option.
            replace: false,
        
            // By default, the query param URL key is the same name as
            // the controller property name. Use `as` to specify a
            // different URL key.
            as: 'page'
          }
        }
        ```
        */
        queryParams: any;
        /*
        The name of the route, dot-delimited.
        
        For example, a route found at `app/routes/posts/post.js` will have
        a `routeName` of `posts.post`.
        */
        routeName: string;
        /*
        Returns a hash containing the parameters of an ancestor route.
        
        Example
        
        ```app/router.js
        // ...
        
        Router.map(function() {
          this.route('member', { path: ':name' }, function() {
            this.route('interest', { path: ':interest' });
          });
        });
        ```
        
        ```app/routes/member.js
        export default Ember.Route.extend({
          queryParams: {
            memberQp: { refreshModel: true }
          }
        });
        ```
        
        ```app/routes/member/interest.js
        export default Ember.Route.extend({
          queryParams: {
            interestQp: { refreshModel: true }
          },
        
          model() {
            return this.paramsFor('member');
          }
        });
        ```
        
        If we visit `/turing/maths?memberQp=member&interestQp=interest` the model for
        the `member.interest` route is hash with:
        
        * `name`: `turing`
        * `memberQp`: `member`
        */
        paramsFor(name: string): any;
        /*
        A hook you can use to reset controller values either when the model
        changes or the route is exiting.
        
        ```app/routes/articles.js
        import Ember from 'ember';
        
        export default Ember.Route.extend({
          resetController(controller, isExiting, transition) {
            if (isExiting) {
              controller.set('page', 1);
            }
          }
        });
        ```
        */
        resetController(controller: Controller, isExiting: boolean, transition: any): any;
        /*
        The name of the template to use by default when rendering this routes
        template.
        
        ```app/routes/posts/list.js
        import Ember from 'ember';
        
        export default Ember.Route.extend({
          templateName: 'posts/list'
        });
        ```
        
        ```app/routes/posts/index.js
        import PostsList from '../posts/list';
        
        export default PostsList.extend();
        ```
        
        ```app/routes/posts/archived.js
        import PostsList from '../posts/list';
        
        export default PostsList.extend();
        ```
        */
        templateName: string;
        /*
        The name of the controller to associate with this route.
        
        By default, Ember will lookup a route's controller that matches the name
        of the route (i.e. `App.PostController` for `App.PostRoute`). However,
        if you would like to define a specific controller to use, you can do so
        using this property.
        
        This is useful in many ways, as the controller specified will be:
        
        * passed to the `setupController` method.
        * used as the controller for the template being rendered by the route.
        * returned from a call to `controllerFor` for the route.
        */
        controllerName: string;
        /*
        The `willTransition` action is fired at the beginning of any
        attempted transition with a `Transition` object as the sole
        argument. This action can be used for aborting, redirecting,
        or decorating the transition from the currently active routes.
        
        A good example is preventing navigation when a form is
        half-filled out:
        
        ```app/routes/contact-form.js
        import Ember from 'ember';
        
        export default Ember.Route.extend({
          actions: {
            willTransition(transition) {
              if (this.controller.get('userHasEnteredData')) {
                this.controller.displayNavigationConfirm();
                transition.abort();
              }
            }
          }
        });
        ```
        
        You can also redirect elsewhere by calling
        `this.transitionTo('elsewhere')` from within `willTransition`.
        Note that `willTransition` will not be fired for the
        redirecting `transitionTo`, since `willTransition` doesn't
        fire when there is already a transition underway. If you want
        subsequent `willTransition` actions to fire for the redirecting
        transition, you must first explicitly call
        `transition.abort()`.
        
        To allow the `willTransition` event to continue bubbling to the parent
        route, use `return true;`. When the `willTransition` method has a
        return value of `true` then the parent route's `willTransition` method
        will be fired, enabling "bubbling" behavior for the event.
        */
        willTransition(transition: Transition): any;
        /*
        The `didTransition` action is fired after a transition has
        successfully been completed. This occurs after the normal model
        hooks (`beforeModel`, `model`, `afterModel`, `setupController`)
        have resolved. The `didTransition` action has no arguments,
        however, it can be useful for tracking page views or resetting
        state on the controller.
        
        ```app/routes/login.js
        import Ember from 'ember';
        
        export default Ember.Route.extend({
          actions: {
            didTransition() {
              this.controller.get('errors.base').clear();
              return true; // Bubble the didTransition event
            }
          }
        });
        ```
        */
        didTransition(): any;
        /*
        The `loading` action is fired on the route when a route's `model`
        hook returns a promise that is not already resolved. The current
        `Transition` object is the first parameter and the route that
        triggered the loading event is the second parameter.
        
        ```app/routes/application.js
        export default Ember.Route.extend({
          actions: {
            loading(transition, route) {
              let controller = this.controllerFor('foo');
              controller.set('currentlyLoading', true);
        
              transition.finally(function() {
                controller.set('currentlyLoading', false);
              });
            }
          }
        });
        ```
        */
        loading(transition: Transition, route: Ember.Route): any;
        /*
        When attempting to transition into a route, any of the hooks
        may return a promise that rejects, at which point an `error`
        action will be fired on the partially-entered routes, allowing
        for per-route error handling logic, or shared error handling
        logic defined on a parent route.
        
        Here is an example of an error handler that will be invoked
        for rejected promises from the various hooks on the route,
        as well as any unhandled errors from child routes:
        
        ```app/routes/admin.js
        import Ember from 'ember';
        
        export default Ember.Route.extend({
          beforeModel() {
            return Ember.RSVP.reject('bad things!');
          },
        
          actions: {
            error(error, transition) {
              // Assuming we got here due to the error in `beforeModel`,
              // we can expect that error === "bad things!",
              // but a promise model rejecting would also
              // call this hook, as would any errors encountered
              // in `afterModel`.
        
              // The `error` hook is also provided the failed
              // `transition`, which can be stored and later
              // `.retry()`d if desired.
        
              this.transitionTo('login');
            }
          }
        });
        ```
        
        `error` actions that bubble up all the way to `ApplicationRoute`
        will fire a default error handler that logs the error. You can
        specify your own global default error handler by overriding the
        `error` handler on `ApplicationRoute`:
        
        ```app/routes/application.js
        import Ember from 'ember';
        
        export default Ember.Route.extend({
          actions: {
            error(error, transition) {
              this.controllerFor('banner').displayError(error.message);
            }
          }
        });
        ```
        */
        error(error: Error, transition: Transition): any;
        /*
        This event is triggered when the router enters the route. It is
        not executed when the model for the route changes.
        
        ```app/routes/application.js
        import Ember from 'ember';
        
        export default Ember.Route.extend({
          collectAnalytics: Ember.on('activate', function(){
            collectAnalytics();
          })
        });
        ```
        */
        activate(): any;
        /*
        This event is triggered when the router completely exits this
        route. It is not executed when the model for the route changes.
        
        ```app/routes/index.js
        import Ember from 'ember';
        
        export default Ember.Route.extend({
          trackPageLeaveAnalytics: Ember.on('deactivate', function(){
            trackPageLeaveAnalytics();
          })
        });
        ```
        */
        deactivate(): any;
        /*
        The controller associated with this route.
        
        Example
        
        ```app/routes/form.js
        import Ember from 'ember';
        
        export default Ember.Route.extend({
          actions: {
            willTransition(transition) {
              if (this.controller.get('userHasEnteredData') &&
                  !confirm('Are you sure you want to abandon progress?')) {
                transition.abort();
              } else {
                // Bubble the `willTransition` action so that
                // parent routes can decide whether or not to abort.
                return true;
              }
            }
          }
        });
        ```
        */
        controller: Ember.Controller;
        /*
        This hook is executed when the router completely exits this route. It is
        not executed when the model for the route changes.
        */
        deactivate(): any;
        /*
        This hook is executed when the router enters the route. It is not executed
        when the model for the route changes.
        */
        activate(): any;
        /*
        Transition the application into another route. The route may
        be either a single route or route path:
        
        ```javascript
        this.transitionTo('blogPosts');
        this.transitionTo('blogPosts.recentEntries');
        ```
        
        Optionally supply a model for the route in question. The model
        will be serialized into the URL using the `serialize` hook of
        the route:
        
        ```javascript
        this.transitionTo('blogPost', aPost);
        ```
        
        If a literal is passed (such as a number or a string), it will
        be treated as an identifier instead. In this case, the `model`
        hook of the route will be triggered:
        
        ```javascript
        this.transitionTo('blogPost', 1);
        ```
        
        Multiple models will be applied last to first recursively up the
        route tree.
        
        ```app/routes.js
        // ...
        
        Router.map(function() {
          this.route('blogPost', { path:':blogPostId' }, function() {
            this.route('blogComment', { path: ':blogCommentId' });
          });
        });
        
        export default Router;
        ```
        
        ```javascript
        this.transitionTo('blogComment', aPost, aComment);
        this.transitionTo('blogComment', 1, 13);
        ```
        
        It is also possible to pass a URL (a string that starts with a
        `/`). This is intended for testing and debugging purposes and
        should rarely be used in production code.
        
        ```javascript
        this.transitionTo('/');
        this.transitionTo('/blog/post/1/comment/13');
        this.transitionTo('/blog/posts?sort=title');
        ```
        
        An options hash with a `queryParams` property may be provided as
        the final argument to add query parameters to the destination URL.
        
        ```javascript
        this.transitionTo('blogPost', 1, {
          queryParams: { showComments: 'true' }
        });
        
        // if you just want to transition the query parameters without changing the route
        this.transitionTo({ queryParams: { sort: 'date' } });
        ```
        
        See also [replaceWith](#method_replaceWith).
        
        Simple Transition Example
        
        ```app/routes.js
        // ...
        
        Router.map(function() {
          this.route('index');
          this.route('secret');
          this.route('fourOhFour', { path: '*:' });
        });
        
        export default Router;
        ```
        
        ```app/routes/index.js
        import Ember from 'ember':
        
        export Ember.Route.extend({
          actions: {
            moveToSecret(context) {
              if (authorized()) {
                this.transitionTo('secret', context);
              } else {
                this.transitionTo('fourOhFour');
              }
            }
          }
        });
        ```
        
        Transition to a nested route
        
        ```app/router.js
        // ...
        
        Router.map(function() {
          this.route('articles', { path: '/articles' }, function() {
            this.route('new');
          });
        });
        
        export default Router;
        ```
        
        ```app/routes/index.js
        import Ember from 'ember';
        
        export default Ember.Route.extend({
          actions: {
            transitionToNewArticle() {
              this.transitionTo('articles.new');
            }
          }
        });
        ```
        
        Multiple Models Example
        
        ```app/router.js
        // ...
        
        Router.map(function() {
          this.route('index');
        
          this.route('breakfast', { path: ':breakfastId' }, function() {
            this.route('cereal', { path: ':cerealId' });
          });
        });
        
        export default Router;
        ```
        
        ```app/routes/index.js
        import Ember from 'ember';
        
        export default Ember.Route.extend({
          actions: {
            moveToChocolateCereal() {
              let cereal = { cerealId: 'ChocolateYumminess' };
              let breakfast = { breakfastId: 'CerealAndMilk' };
        
              this.transitionTo('breakfast.cereal', breakfast, cereal);
            }
          }
        });
        ```
        
        Nested Route with Query String Example
        
        ```app/routes.js
        // ...
        
        Router.map(function() {
          this.route('fruits', function() {
            this.route('apples');
          });
        });
        
        export default Router;
        ```
        
        ```app/routes/index.js
        import Ember from 'ember';
        
        export default Ember.Route.extend({
          actions: {
            transitionToApples() {
              this.transitionTo('fruits.apples', { queryParams: { color: 'red' } });
            }
          }
        });
        ```
        */
        transitionTo(name: string, ...models: any[], options: any): Transition;
        /*
        Perform a synchronous transition into another route without attempting
        to resolve promises, update the URL, or abort any currently active
        asynchronous transitions (i.e. regular transitions caused by
        `transitionTo` or URL changes).
        
        This method is handy for performing intermediate transitions on the
        way to a final destination route, and is called internally by the
        default implementations of the `error` and `loading` handlers.
        */
        intermediateTransitionTo(name: string, ...models: any[]): any;
        /*
        Refresh the model on this route and any child routes, firing the
        `beforeModel`, `model`, and `afterModel` hooks in a similar fashion
        to how routes are entered when transitioning in from other route.
        The current route params (e.g. `article_id`) will be passed in
        to the respective model hooks, and if a different model is returned,
        `setupController` and associated route hooks will re-fire as well.
        
        An example usage of this method is re-querying the server for the
        latest information using the same parameters as when the route
        was first entered.
        
        Note that this will cause `model` hooks to fire even on routes
        that were provided a model object when the route was initially
        entered.
        */
        refresh(): Transition;
        /*
        Transition into another route while replacing the current URL, if possible.
        This will replace the current history entry instead of adding a new one.
        Beside that, it is identical to `transitionTo` in all other respects. See
        'transitionTo' for additional information regarding multiple models.
        
        Example
        
        ```app/router.js
        // ...
        
        Router.map(function() {
          this.route('index');
          this.route('secret');
        });
        
        export default Router;
        ```
        
        ```app/routes/secret.js
        import Ember from 'ember';
        
        export default Ember.Route.extend({
          afterModel() {
            if (!authorized()){
              this.replaceWith('index');
            }
          }
        });
        ```
        */
        replaceWith(name: string, ...models: any[], options: any): Transition;
        /*
        Sends an action to the router, which will delegate it to the currently
        active route hierarchy per the bubbling rules explained under `actions`.
        
        Example
        
        ```app/router.js
        // ...
        
        Router.map(function() {
          this.route('index');
        });
        
        export default Router;
        ```
        
        ```app/routes/application.js
        import Ember from 'ember';
        
        export default Ember.Route.extend({
          actions: {
            track(arg) {
              console.log(arg, 'was clicked');
            }
          }
        });
        ```
        
        ```app/routes/index.js
        import Ember from 'ember';
        
        export default Ember.Route.extend({
          actions: {
            trackIfDebug(arg) {
              if (debug) {
                this.send('track', arg);
              }
            }
          }
        });
        ```
        */
        send(name: string, ...args: any[]): any;
        /*
        This hook is the first of the route entry validation hooks
        called when an attempt is made to transition into a route
        or one of its children. It is called before `model` and
        `afterModel`, and is appropriate for cases when:
        
        1) A decision can be made to redirect elsewhere without
           needing to resolve the model first.
        2) Any async operations need to occur first before the
           model is attempted to be resolved.
        
        This hook is provided the current `transition` attempt
        as a parameter, which can be used to `.abort()` the transition,
        save it for a later `.retry()`, or retrieve values set
        on it from a previous hook. You can also just call
        `this.transitionTo` to another route to implicitly
        abort the `transition`.
        
        You can return a promise from this hook to pause the
        transition until the promise resolves (or rejects). This could
        be useful, for instance, for retrieving async code from
        the server that is required to enter a route.
        */
        beforeModel(transition: Transition): Promise;
        /*
        This hook is called after this route's model has resolved.
        It follows identical async/promise semantics to `beforeModel`
        but is provided the route's resolved model in addition to
        the `transition`, and is therefore suited to performing
        logic that can only take place after the model has already
        resolved.
        
        ```app/routes/posts.js
        import Ember from 'ember';
        
        export default Ember.Route.extend({
          afterModel(posts, transition) {
            if (posts.get('length') === 1) {
              this.transitionTo('post.show', posts.get('firstObject'));
            }
          }
        });
        ```
        
        Refer to documentation for `beforeModel` for a description
        of transition-pausing semantics when a promise is returned
        from this hook.
        */
        afterModel(resolvedModel: any, transition: Transition): Promise;
        /*
        A hook you can implement to optionally redirect to another route.
        
        If you call `this.transitionTo` from inside of this hook, this route
        will not be entered in favor of the other hook.
        
        `redirect` and `afterModel` behave very similarly and are
        called almost at the same time, but they have an important
        distinction in the case that, from one of these hooks, a
        redirect into a child route of this route occurs: redirects
        from `afterModel` essentially invalidate the current attempt
        to enter this route, and will result in this route's `beforeModel`,
        `model`, and `afterModel` hooks being fired again within
        the new, redirecting transition. Redirects that occur within
        the `redirect` hook, on the other hand, will _not_ cause
        these hooks to be fired again the second time around; in
        other words, by the time the `redirect` hook has been called,
        both the resolved model and attempted entry into this route
        are considered to be fully validated.
        */
        redirect(model: any, transition: Transition): any;
        /*
        A hook you can implement to convert the URL into the model for
        this route.
        
        ```app/router.js
        // ...
        
        Router.map(function() {
          this.route('post', { path: '/posts/:post_id' });
        });
        
        export default Router;
        ```
        
        The model for the `post` route is `store.findRecord('post', params.post_id)`.
        
        By default, if your route has a dynamic segment ending in `_id`:
        
        * The model class is determined from the segment (`post_id`'s
          class is `App.Post`)
        * The find method is called on the model class with the value of
          the dynamic segment.
        
        Note that for routes with dynamic segments, this hook is not always
        executed. If the route is entered through a transition (e.g. when
        using the `link-to` Handlebars helper or the `transitionTo` method
        of routes), and a model context is already provided this hook
        is not called.
        
        A model context does not include a primitive string or number,
        which does cause the model hook to be called.
        
        Routes without dynamic segments will always execute the model hook.
        
        ```javascript
        // no dynamic segment, model hook always called
        this.transitionTo('posts');
        
        // model passed in, so model hook not called
        thePost = store.findRecord('post', 1);
        this.transitionTo('post', thePost);
        
        // integer passed in, model hook is called
        this.transitionTo('post', 1);
        
        // model id passed in, model hook is called
        // useful for forcing the hook to execute
        thePost = store.findRecord('post', 1);
        this.transitionTo('post', thePost.id);
        ```
        
        
        This hook follows the asynchronous/promise semantics
        described in the documentation for `beforeModel`. In particular,
        if a promise returned from `model` fails, the error will be
        handled by the `error` hook on `Ember.Route`.
        
        Example
        
        ```app/routes/post.js
        import Ember from 'ember';
        
        export default Ember.Route.extend({
          model(params) {
            return this.store.findRecord('post', params.post_id);
          }
        });
        ```
        */
        model(params: any, transition: Transition): any | Promise;
        /*
        A hook you can implement to convert the route's model into parameters
        for the URL.
        
        ```app/router.js
        // ...
        
        Router.map(function() {
          this.route('post', { path: '/posts/:post_id' });
        });
        
        ```
        
        ```app/routes/post.js
        import Ember from 'ember';
        
        export default Ember.Route.extend({
          model(params) {
            // the server returns `{ id: 12 }`
            return Ember.$.getJSON('/posts/' + params.post_id);
          },
        
          serialize(model) {
            // this will make the URL `/posts/12`
            return { post_id: model.id };
          }
        });
        ```
        
        The default `serialize` method will insert the model's `id` into the
        route's dynamic segment (in this case, `:post_id`) if the segment contains '_id'.
        If the route has multiple dynamic segments or does not contain '_id', `serialize`
        will return `Ember.getProperties(model, params)`
        
        This method is called when `transitionTo` is called with a context
        in order to populate the URL.
        */
        serialize(model: any, params: Array): any;
        /*
        A hook you can use to setup the controller for the current route.
        
        This method is called with the controller for the current route and the
        model supplied by the `model` hook.
        
        By default, the `setupController` hook sets the `model` property of
        the controller to the `model`.
        
        If you implement the `setupController` hook in your Route, it will
        prevent this default behavior. If you want to preserve that behavior
        when implementing your `setupController` function, make sure to call
        `_super`:
        
        ```app/routes/photos.js
        import Ember from 'ember';
        
        export default Ember.Route.extend({
          model() {
            return this.store.findAll('photo');
          },
        
          setupController(controller, model) {
            // Call _super for default behavior
            this._super(controller, model);
            // Implement your custom setup after
            this.controllerFor('application').set('showingPhotos', true);
          }
        });
        ```
        
        The provided controller will be one resolved based on the name
        of this route.
        
        If no explicit controller is defined, Ember will automatically create one.
        
        As an example, consider the router:
        
        ```app/router.js
        // ...
        
        Router.map(function() {
          this.route('post', { path: '/posts/:post_id' });
        });
        
        export default Router;
        ```
        
        For the `post` route, a controller named `App.PostController` would
        be used if it is defined. If it is not defined, a basic `Ember.Controller`
        instance would be used.
        
        Example
        
        ```app/routes/post.js
        import Ember from 'ember';
        
        export default Ember.Route.extend({
          setupController(controller, model) {
            controller.set('model', model);
          }
        });
        ```
        */
        setupController(controller: Controller, model: any): any;
        /*
        Returns the controller of the current route, or a parent (or any ancestor)
        route in a route hierarchy.
        
        The controller instance must already have been created, either through entering the
        associated route or using `generateController`.
        
        ```app/routes/post.js
        import Ember from 'ember';
        
        export default Ember.Route.extend({
          setupController(controller, post) {
            this._super(controller, post);
            this.controllerFor('posts').set('currentPost', post);
          }
        });
        ```
        */
        controllerFor(name: string): Ember.Controller;
        /*
        Returns the resolved model of a parent (or any ancestor) route
        in a route hierarchy.  During a transition, all routes
        must resolve a model object, and if a route
        needs access to a parent route's model in order to
        resolve a model (or just reuse the model from a parent),
        it can call `this.modelFor(theNameOfParentRoute)` to
        retrieve it. If the ancestor route's model was a promise,
        its resolved result is returned.
        
        Example
        
        ```app/router.js
        // ...
        
        Router.map(function() {
          this.route('post', { path: '/posts/:post_id' }, function() {
            this.route('comments');
          });
        });
        
        export default Router;
        ```
        
        ```app/routes/post/comments.js
        import Ember from 'ember';
        
        export default Ember.Route.extend({
          model() {
            let post = this.modelFor('post');
            return post.get('comments');
          }
        });
        ```
        */
        modelFor(name: string): any;
        /*
        A hook you can use to render the template for the current route.
        
        This method is called with the controller for the current route and the
        model supplied by the `model` hook. By default, it renders the route's
        template, configured with the controller for the route.
        
        This method can be overridden to set up and render additional or
        alternative templates.
        
        ```app/routes/posts.js
        import Ember from 'ember';
        
        export default Ember.Route.extend({
          renderTemplate(controller, model) {
            let favController = this.controllerFor('favoritePost');
        
            // Render the `favoritePost` template into
            // the outlet `posts`, and display the `favoritePost`
            // controller.
            this.render('favoritePost', {
              outlet: 'posts',
              controller: favController
            });
          }
        });
        ```
        */
        renderTemplate(controller: any, model: any): any;
        /*
        `render` is used to render a template into a region of another template
        (indicated by an `{{outlet}}`). `render` is used both during the entry
        phase of routing (via the `renderTemplate` hook) and later in response to
        user interaction.
        
        For example, given the following minimal router and templates:
        
        ```app/router.js
        // ...
        
        Router.map(function() {
          this.route('photos');
        });
        
        export default Router;
        ```
        
        ```handlebars
        <!-- application.hbs -->
        <div class='something-in-the-app-hbs'>
          {{outlet "anOutletName"}}
        </div>
        ```
        
        ```handlebars
        <!-- photos.hbs -->
        <h1>Photos</h1>
        ```
        
        You can render `photos.hbs` into the `"anOutletName"` outlet of
        `application.hbs` by calling `render`:
        
        ```app/routes/post.js
        import Ember from 'ember';
        
        export default Ember.Route.extend({
          renderTemplate() {
            this.render('photos', {
              into: 'application',
              outlet: 'anOutletName'
            })
          }
        });
        ```
        
        `render` additionally allows you to supply which `controller` and
        `model` objects should be loaded and associated with the rendered template.
        
        
        ```app/routes/posts.js
        import Ember from 'ember';
        
        export default Ember.Route.extend({
          renderTemplate(controller, model){
            this.render('posts', {    // the template to render, referenced by name
              into: 'application',    // the template to render into, referenced by name
              outlet: 'anOutletName', // the outlet inside `options.template` to render into.
              controller: 'someControllerName', // the controller to use for this template, referenced by name
              model: model            // the model to set on `options.controller`.
            })
          }
        });
        ```
        
        The string values provided for the template name, and controller
        will eventually pass through to the resolver for lookup. See
        Ember.Resolver for how these are mapped to JavaScript objects in your
        application. The template to render into needs to be related to  either the
        current route or one of its ancestors.
        
        Not all options need to be passed to `render`. Default values will be used
        based on the name of the route specified in the router or the Route's
        `controllerName` and `templateName` properties.
        
        For example:
        
        ```app/router.js
        // ...
        
        Router.map(function() {
          this.route('index');
          this.route('post', { path: '/posts/:post_id' });
        });
        
        export default Router;
        ```
        
        ```app/routes/post.js
        import Ember from 'ember';
        
        export default Ember.Route.extend({
          renderTemplate() {
            this.render(); // all defaults apply
          }
        });
        ```
        
        The name of the route, defined by the router, is `post`.
        
        The following equivalent default options will be applied when
        the Route calls `render`:
        
        ```javascript
        this.render('post', {  // the template name associated with 'post' Route
          into: 'application', // the parent route to 'post' Route
          outlet: 'main',      // {{outlet}} and {{outlet 'main'}} are synonymous,
          controller: 'post',  // the controller associated with the 'post' Route
        })
        ```
        
        By default the controller's `model` will be the route's model, so it does not
        need to be passed unless you wish to change which model is being used.
        */
        render(name: string, options: any): any;
        /*
        Disconnects a view that has been rendered into an outlet.
        
        You may pass any or all of the following options to `disconnectOutlet`:
        
        * `outlet`: the name of the outlet to clear (default: 'main')
        * `parentView`: the name of the view containing the outlet to clear
           (default: the view rendered by the parent route)
        
        Example:
        
        ```app/routes/application.js
        import Ember from 'ember';
        
        export default App.Route.extend({
          actions: {
            showModal(evt) {
              this.render(evt.modalName, {
                outlet: 'modal',
                into: 'application'
              });
            },
            hideModal(evt) {
              this.disconnectOutlet({
                outlet: 'modal',
                parentView: 'application'
              });
            }
          }
        });
        ```
        
        Alternatively, you can pass the `outlet` name directly as a string.
        
        Example:
        
        ```app/routes/application.js
        import Ember from 'ember';
        
        export default App.Route.extend({
          actions: {
            showModal(evt) {
              // ...
            },
            hideModal(evt) {
              this.disconnectOutlet('modal');
            }
          }
        });
        */
        disconnectOutlet(options: any | string): any;
    }
}
