//packages/ember-runtime/lib/inject.js
declare namespace Ember {
    /*
    Namespace for injection helper methods.
    */
    class inject {
        /*
        Creates a property that lazily looks up a service in the container. There
        are no restrictions as to what objects a service can be injected into.
        
        Example:
        
        ```javascript
        App.ApplicationRoute = Ember.Route.extend({
          authManager: Ember.inject.service('auth'),
        
          model: function() {
            return this.get('authManager').findCurrentUser();
          }
        });
        ```
        
        This example will create an `authManager` property on the application route
        that looks up the `auth` service in the container, making it easily
        accessible in the `model` hook.
        */
        service(name: string): Ember.InjectedProperty;
        /*
        Creates a property that lazily looks up another controller in the container.
        Can only be used when defining another controller.
        
        Example:
        
        ```javascript
        App.PostController = Ember.Controller.extend({
          posts: Ember.inject.controller()
        });
        ```
        
        This example will create a `posts` property on the `post` controller that
        looks up the `posts` controller in the container, making it easy to
        reference other controllers. This is functionally equivalent to:
        
        ```javascript
        App.PostController = Ember.Controller.extend({
          needs: 'posts',
          posts: Ember.computed.alias('controllers.posts')
        });
        ```
        */
        controller(name: string): Ember.InjectedProperty;
    }
}
