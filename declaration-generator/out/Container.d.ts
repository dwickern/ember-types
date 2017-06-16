//packages/container/lib/container.js
declare namespace Ember {
    /*
    A container used to instantiate and cache objects.
    
    Every `Container` must be associated with a `Registry`, which is referenced
    to determine the factory and options that should be used to instantiate
    objects.
    
    The public API for `Container` is still in flux and should not be considered
    stable.
    */
    private class Container {
        /*
        Given a fullName, return the corresponding factory. The consumer of the factory
        is responsible for the destruction of any factory instances, as there is no
        way for the container to ensure instances are destroyed when it itself is
        destroyed.
        */
        factoryFor(fullName: string, options: any): any;
    }
}
