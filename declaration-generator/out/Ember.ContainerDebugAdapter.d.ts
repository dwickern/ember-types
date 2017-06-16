//packages/ember-extension-support/lib/container_debug_adapter.js
declare namespace Ember {
    /*
    The `ContainerDebugAdapter` helps the container and resolver interface
    with tools that debug Ember such as the
    [Ember Inspector](https://github.com/emberjs/ember-inspector)
    for Chrome and Firefox.
    
    This class can be extended by a custom resolver implementer
    to override some of the methods with library-specific code.
    
    The methods likely to be overridden are:
    
    * `canCatalogEntriesByType`
    * `catalogEntriesByType`
    
    The adapter will need to be registered
    in the application's container as `container-debug-adapter:main`.
    
    Example:
    
    ```javascript
    Application.initializer({
      name: "containerDebugAdapter",
    
      initialize(application) {
        application.register('container-debug-adapter:main', require('app/container-debug-adapter'));
      }
    });
    ```
    */
    class ContainerDebugAdapter {
        /*
        The resolver instance of the application
        being debugged. This property will be injected
        on creation.
        */
        resolver: any;
        /*
        Returns true if it is possible to catalog a list of available
        classes in the resolver for a given type.
        */
        canCatalogEntriesByType(type: string): boolean;
        /*
        Returns the available classes a given type.
        */
        catalogEntriesByType(type: string): Array;
    }
}
