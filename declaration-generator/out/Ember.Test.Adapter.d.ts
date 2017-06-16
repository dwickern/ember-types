//packages/ember-testing/lib/adapters/adapter.js
declare namespace Ember.Test {
    /*
    The primary purpose of this class is to create hooks that can be implemented
    by an adapter for various test frameworks.
    */
    class Adapter {
        /*
        This callback will be called whenever an async operation is about to start.
        
        Override this to call your framework's methods that handle async
        operations.
        */
        asyncStart(): any;
        /*
        This callback will be called whenever an async operation has completed.
        */
        asyncEnd(): any;
        /*
        Override this method with your testing framework's false assertion.
        This function is called whenever an exception occurs causing the testing
        promise to fail.
        
        QUnit example:
        
        ```javascript
          exception: function(error) {
            ok(false, error);
          };
        ```
        */
        exception(error: string): any;
    }
}
