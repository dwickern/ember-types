//packages/ember-debug/lib/features.js
declare namespace Ember {
    /*
    The hash of enabled Canary features. Add to this, any canary features
    before creating your application.
    
    Alternatively (and recommended), you can also define `EmberENV.FEATURES`
    if you need to enable features flagged at runtime.
    */
    class FEATURES {
        /*
        Determine whether the specified `feature` is enabled. Used by Ember's
        build tools to exclude experimental features from beta/stable builds.
        
        You can define the following configuration options:
        
        * `EmberENV.ENABLE_OPTIONAL_FEATURES` - enable any features that have not been explicitly
          enabled/disabled.
        */
        isEnabled(feature: string): boolean;
    }
}
