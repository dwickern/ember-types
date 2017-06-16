//packages/ember-application/lib/system/engine-instance.js
declare namespace Ember {
    /*
    The `EngineInstance` encapsulates all of the stateful aspects of a
    running `Engine`.
    */
    class EngineInstance {
        /*
        Unregister a factory.
        
        Overrides `RegistryProxy#unregister` in order to clear any cached instances
        of the unregistered factory.
        */
        unregister(fullName: string): any;
    }
}
