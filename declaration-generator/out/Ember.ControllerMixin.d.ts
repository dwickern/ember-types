//packages/ember-runtime/lib/mixins/controller.js
declare namespace Ember {
    private class ControllerMixin {
        /*
        Defines which query parameters the controller accepts.
        If you give the names `['category','page']` it will bind
        the values of these query parameters to the variables
        `this.category` and `this.page`.
        By default, Ember coerces query parameter values using `toggleProperty`.
        This behavior may lead to unexpected results.
        To explicity configure a query parameter property so it coerces as expected, you must define a type property:
        ```javascript
          queryParams: [{
            category: {
              type: 'boolean'
            }
          }]
        ```
        */
        queryParams: any;
        /*
        The object to which actions from the view should be sent.
        
        For example, when a Handlebars template uses the `{{action}}` helper,
        it will attempt to send the action to the view's controller's `target`.
        
        By default, the value of the target property is set to the router, and
        is injected when a controller is instantiated. This injection is applied
        as part of the application's initialization process. In most cases the
        `target` property will automatically be set to the logical consumer of
        actions for the controller.
        */
        target: any;
        /*
        The controller's current model. When retrieving or modifying a controller's
        model, this property should be used instead of the `content` property.
        */
        model: any;
        /*
        Transition the application into another route. The route may
        be either a single route or route path:
        
        ```javascript
        aController.transitionToRoute('blogPosts');
        aController.transitionToRoute('blogPosts.recentEntries');
        ```
        
        Optionally supply a model for the route in question. The model
        will be serialized into the URL using the `serialize` hook of
        the route:
        
        ```javascript
        aController.transitionToRoute('blogPost', aPost);
        ```
        
        If a literal is passed (such as a number or a string), it will
        be treated as an identifier instead. In this case, the `model`
        hook of the route will be triggered:
        
        ```javascript
        aController.transitionToRoute('blogPost', 1);
        ```
        
        Multiple models will be applied last to first recursively up the
        route tree.
        
        ```javascript
        App.Router.map(function() {
          this.route('blogPost', { path: ':blogPostId' }, function() {
            this.route('blogComment', { path: ':blogCommentId', resetNamespace: true });
          });
        });
        
        aController.transitionToRoute('blogComment', aPost, aComment);
        aController.transitionToRoute('blogComment', 1, 13);
        ```
        
        It is also possible to pass a URL (a string that starts with a
        `/`). This is intended for testing and debugging purposes and
        should rarely be used in production code.
        
        ```javascript
        aController.transitionToRoute('/');
        aController.transitionToRoute('/blog/post/1/comment/13');
        aController.transitionToRoute('/blog/posts?sort=title');
        ```
        
        An options hash with a `queryParams` property may be provided as
        the final argument to add query parameters to the destination URL.
        
        ```javascript
        aController.transitionToRoute('blogPost', 1, {
          queryParams: { showComments: 'true' }
        });
        
        // if you just want to transition the query parameters without changing the route
        aController.transitionToRoute({ queryParams: { sort: 'date' } });
        ```
        
        See also [replaceRoute](/api/classes/Ember.ControllerMixin.html#method_replaceRoute).
        */
        transitionToRoute(name: string, ...models: any[], options: any): any;
        /*
        Transition into another route while replacing the current URL, if possible.
        This will replace the current history entry instead of adding a new one.
        Beside that, it is identical to `transitionToRoute` in all other respects.
        
        ```javascript
        aController.replaceRoute('blogPosts');
        aController.replaceRoute('blogPosts.recentEntries');
        ```
        
        Optionally supply a model for the route in question. The model
        will be serialized into the URL using the `serialize` hook of
        the route:
        
        ```javascript
        aController.replaceRoute('blogPost', aPost);
        ```
        
        If a literal is passed (such as a number or a string), it will
        be treated as an identifier instead. In this case, the `model`
        hook of the route will be triggered:
        
        ```javascript
        aController.replaceRoute('blogPost', 1);
        ```
        
        Multiple models will be applied last to first recursively up the
        route tree.
        
        ```javascript
        App.Router.map(function() {
          this.route('blogPost', { path: ':blogPostId' }, function() {
            this.route('blogComment', { path: ':blogCommentId', resetNamespace: true });
          });
        });
        
        aController.replaceRoute('blogComment', aPost, aComment);
        aController.replaceRoute('blogComment', 1, 13);
        ```
        
        It is also possible to pass a URL (a string that starts with a
        `/`). This is intended for testing and debugging purposes and
        should rarely be used in production code.
        
        ```javascript
        aController.replaceRoute('/');
        aController.replaceRoute('/blog/post/1/comment/13');
        ```
        */
        replaceRoute(name: string, ...models: any[]): any;
    }
}
