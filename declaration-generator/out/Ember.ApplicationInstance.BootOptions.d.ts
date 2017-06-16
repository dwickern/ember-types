//packages/ember-application/lib/system/application-instance.js
declare namespace Ember.ApplicationInstance {
    /*
    A list of boot-time configuration options for customizing the behavior of
    an `Ember.ApplicationInstance`.
    
    This is an interface class that exists purely to document the available
    options; you do not need to construct it manually. Simply pass a regular
    JavaScript object containing the desired options into methods that require
    one of these options object:
    
    ```javascript
    MyApp.visit("/", { location: "none", rootElement: "#container" });
    ```
    
    Not all combinations of the supported options are valid. See the documentation
    on `Ember.Application#visit` for the supported configurations.
    
    Internal, experimental or otherwise unstable flags are marked as private.
    */
    class BootOptions {
        /*
        Run in a full browser environment.
        
        When this flag is set to `false`, it will disable most browser-specific
        and interactive features. Specifically:
        
        * It does not use `jQuery` to append the root view; the `rootElement`
          (either specified as a subsequent option or on the application itself)
          must already be an `Element` in the given `document` (as opposed to a
          string selector).
        
        * It does not set up an `EventDispatcher`.
        
        * It does not run any `Component` lifecycle hooks (such as `didInsertElement`).
        
        * It sets the `location` option to `"none"`. (If you would like to use
          the location adapter specified in the app's router instead, you can also
          specify `{ location: null }` to specifically opt-out.)
        */
        isBrowser: boolean;
        /*
        Disable rendering completely.
        
        When this flag is set to `true`, it will disable the entire rendering
        pipeline. Essentially, this puts the app into "routing-only" mode. No
        templates will be rendered, and no Components will be created.
        */
        shouldRender: boolean;
        /*
        If present, render into the given `Document` object instead of the
        global `window.document` object.
        
        In practice, this is only useful in non-browser environment or in
        non-interactive mode, because Ember's `jQuery` dependency is
        implicitly bound to the current document, causing event delegation
        to not work properly when the app is rendered into a foreign
        document object (such as an iframe's `contentDocument`).
        
        In non-browser mode, this could be a "`Document`-like" object as
        Ember only interact with a small subset of the DOM API in non-
        interactive mode. While the exact requirements have not yet been
        formalized, the `SimpleDOM` library's implementation is known to
        work.
        */
        document: Document;
        /*
        If present, overrides the application's `rootElement` property on
        the instance. This is useful for testing environment, where you
        might want to append the root view to a fixture area.
        
        In non-browser mode, because Ember does not have access to jQuery,
        this options must be specified as a DOM `Element` object instead of
        a selector string.
        
        See the documentation on `Ember.Applications`'s `rootElement` for
        details.
        */
        rootElement: string | Element;
        /*
        If present, overrides the router's `location` property with this
        value. This is useful for environments where trying to modify the
        URL would be inappropriate.
        */
        location: string;
    }
}
