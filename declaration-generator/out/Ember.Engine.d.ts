//packages/ember-application/lib/system/engine.js
declare namespace Ember {
    /*
    The `Engine` class contains core functionality for both applications and
    engines.
    
    Each engine manages a registry that's used for dependency injection and
    exposed through `RegistryProxy`.
    
    Engines also manage initializers and instance initializers.
    
    Engines can spawn `EngineInstance` instances via `buildInstance()`.
    */
    class Engine {
        /*
        The goal of initializers should be to register dependencies and injections.
        This phase runs once. Because these initializers may load code, they are
        allowed to defer application readiness and advance it. If you need to access
        the container or store you should use an InstanceInitializer that will be run
        after all initializers and therefore after all code is loaded and the app is
        ready.
        
        Initializer receives an object which has the following attributes:
        `name`, `before`, `after`, `initialize`. The only required attribute is
        `initialize`, all others are optional.
        
        * `name` allows you to specify under which name the initializer is registered.
        This must be a unique name, as trying to register two initializers with the
        same name will result in an error.
        
        ```javascript
        Ember.Application.initializer({
          name: 'namedInitializer',
        
          initialize: function(application) {
            Ember.debug('Running namedInitializer!');
          }
        });
        ```
        
        * `before` and `after` are used to ensure that this initializer is ran prior
        or after the one identified by the value. This value can be a single string
        or an array of strings, referencing the `name` of other initializers.
        
        An example of ordering initializers, we create an initializer named `first`:
        
        ```javascript
        Ember.Application.initializer({
          name: 'first',
        
          initialize: function(application) {
            Ember.debug('First initializer!');
          }
        });
        
        // DEBUG: First initializer!
        ```
        
        We add another initializer named `second`, specifying that it should run
        after the initializer named `first`:
        
        ```javascript
        Ember.Application.initializer({
          name: 'second',
          after: 'first',
        
          initialize: function(application) {
            Ember.debug('Second initializer!');
          }
        });
        
        // DEBUG: First initializer!
        // DEBUG: Second initializer!
        ```
        
        Afterwards we add a further initializer named `pre`, this time specifying
        that it should run before the initializer named `first`:
        
        ```javascript
        Ember.Application.initializer({
          name: 'pre',
          before: 'first',
        
          initialize: function(application) {
            Ember.debug('Pre initializer!');
          }
        });
        
        // DEBUG: Pre initializer!
        // DEBUG: First initializer!
        // DEBUG: Second initializer!
        ```
        
        Finally we add an initializer named `post`, specifying it should run after
        both the `first` and the `second` initializers:
        
        ```javascript
        Ember.Application.initializer({
          name: 'post',
          after: ['first', 'second'],
        
          initialize: function(application) {
            Ember.debug('Post initializer!');
          }
        });
        
        // DEBUG: Pre initializer!
        // DEBUG: First initializer!
        // DEBUG: Second initializer!
        // DEBUG: Post initializer!
        ```
        
        * `initialize` is a callback function that receives one argument,
          `application`, on which you can operate.
        
        Example of using `application` to register an adapter:
        
        ```javascript
        Ember.Application.initializer({
          name: 'api-adapter',
        
          initialize: function(application) {
            application.register('api-adapter:main', ApiAdapter);
          }
        });
        ```
        */
        initializer(initializer: any): any;
        /*
        Instance initializers run after all initializers have run. Because
        instance initializers run after the app is fully set up. We have access
        to the store, container, and other items. However, these initializers run
        after code has loaded and are not allowed to defer readiness.
        
        Instance initializer receives an object which has the following attributes:
        `name`, `before`, `after`, `initialize`. The only required attribute is
        `initialize`, all others are optional.
        
        * `name` allows you to specify under which name the instanceInitializer is
        registered. This must be a unique name, as trying to register two
        instanceInitializer with the same name will result in an error.
        
        ```javascript
        Ember.Application.instanceInitializer({
          name: 'namedinstanceInitializer',
        
          initialize: function(application) {
            Ember.debug('Running namedInitializer!');
          }
        });
        ```
        
        * `before` and `after` are used to ensure that this initializer is ran prior
        or after the one identified by the value. This value can be a single string
        or an array of strings, referencing the `name` of other initializers.
        
        * See Ember.Application.initializer for discussion on the usage of before
        and after.
        
        Example instanceInitializer to preload data into the store.
        
        ```javascript
        Ember.Application.initializer({
          name: 'preload-data',
        
          initialize: function(application) {
            var userConfig, userConfigEncoded, store;
            // We have a HTML escaped JSON representation of the user's basic
            // configuration generated server side and stored in the DOM of the main
            // index.html file. This allows the app to have access to a set of data
            // without making any additional remote calls. Good for basic data that is
            // needed for immediate rendering of the page. Keep in mind, this data,
            // like all local models and data can be manipulated by the user, so it
            // should not be relied upon for security or authorization.
            //
            // Grab the encoded data from the meta tag
            userConfigEncoded = Ember.$('head meta[name=app-user-config]').attr('content');
            // Unescape the text, then parse the resulting JSON into a real object
            userConfig = JSON.parse(unescape(userConfigEncoded));
            // Lookup the store
            store = application.lookup('service:store');
            // Push the encoded JSON into the store
            store.pushPayload(userConfig);
          }
        });
        ```
        */
        instanceInitializer(instanceInitializer: any): any;
        /*
        Set this to provide an alternate class to `Ember.DefaultResolver`
        */
        resolver: any;
        /*
        Set this to provide an alternate class to `Ember.DefaultResolver`
        */
        resolver: any;
    }
}
