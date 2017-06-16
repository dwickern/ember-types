//packages/ember-testing/lib/test.js
declare namespace Ember {
    /*
    This is a container for an assortment of testing related functionality:
    
    * Choose your default test adapter (for your framework of choice).
    * Register/Unregister additional test helpers.
    * Setup callbacks to be fired when the test helpers are injected into
      your application.
    */
    class Test {
        /*
        Used to register callbacks to be fired whenever `App.injectTestHelpers`
        is called.
        
        The callback will receive the current application as an argument.
        
        Example:
        
        ```javascript
        Ember.Test.onInjectHelpers(function() {
          Ember.$(document).ajaxSend(function() {
            Test.pendingRequests++;
          });
        
          Ember.$(document).ajaxComplete(function() {
            Test.pendingRequests--;
          });
        });
        ```
        */
        onInjectHelpers(callback: Function): any;
        /*
        `registerHelper` is used to register a test helper that will be injected
        when `App.injectTestHelpers` is called.
        
        The helper method will always be called with the current Application as
        the first parameter.
        
        For example:
        
        ```javascript
        Ember.Test.registerHelper('boot', function(app) {
          Ember.run(app, app.advanceReadiness);
        });
        ```
        
        This helper can later be called without arguments because it will be
        called with `app` as the first parameter.
        
        ```javascript
        App = Ember.Application.create();
        App.injectTestHelpers();
        boot();
        ```
        */
        registerHelper(name: string, helperMethod: Function, options: any): any;
        /*
        Like `find`, but throws an error if the element selector returns no results.
        
        Example:
        
        ```javascript
        var $el = findWithAssert('.doesnt-exist'); // throws error
        ```
        
        With the `context` param:
        
        ```javascript
        var $el = findWithAssert('.selector-id', '.parent-element-class'); // assert will pass
        ```
        */
        findWithAssert(selector: string, context: string): any;
        /*
        Simulates a key event, e.g. `keypress`, `keydown`, `keyup` with the desired keyCode
        Example:
        ```javascript
        keyEvent('.some-jQuery-selector', 'keypress', 13).then(function() {
         // assert something
        });
        ```
        */
        keyEvent(selector: string, type: string, keyCode: number): RSVP.Promise;
        /*
        Returns the currently active route name.
        Example:
        ```javascript
        function validateRouteName() {
        equal(currentRouteName(), 'some.path', "correct route was transitioned into.");
        }
        visit('/some/path').then(validateRouteName)
        ```
        */
        currentRouteName(): any;
        /*
        This allows ember-testing to play nicely with other asynchronous
        events, such as an application that is waiting for a CSS3
        transition or an IndexDB transaction. The waiter runs periodically
        after each async helper (i.e. `click`, `andThen`, `visit`, etc) has executed,
        until the returning result is truthy. After the waiters finish, the next async helper
        is executed and the process repeats.
        
        For example:
        
        ```javascript
        Ember.Test.registerWaiter(function() {
          return myPendingTransactions() == 0;
        });
        ```
        The `context` argument allows you to optionally specify the `this`
        with which your callback will be invoked.
        
        For example:
        
        ```javascript
        Ember.Test.registerWaiter(MyDB, MyDB.hasPendingTransactions);
        ```
        */
        registerWaiter(context: any, callback: Function): any;
        /*
        Triggers the given DOM event on the element identified by the provided selector.
        Example:
        ```javascript
        triggerEvent('#some-elem-id', 'blur');
        ```
        This is actually used internally by the `keyEvent` helper like so:
        ```javascript
        triggerEvent('#some-elem-id', 'keypress', { keyCode: 13 });
        ```
        */
        triggerEvent(selector: string, context: string, type: string, options: any): RSVP.Promise;
        /*
        Clicks an element and triggers any actions triggered by the element's `click`
        event.
        
        Example:
        
        ```javascript
        click('.some-jQuery-selector').then(function() {
          // assert something
        });
        ```
        */
        click(selector: string, context: any): RSVP.Promise;
        /*
        Finds an element in the context of the app's container element. A simple alias
        for `app.$(selector)`.
        
        Example:
        
        ```javascript
        var $el = find('.my-selector');
        ```
        
        With the `context` param:
        
        ```javascript
        var $el = find('.my-selector', '.parent-element-class');
        ```
        */
        find(selector: string, context: string): any;
        /*
        Returns the current path.
        
        Example:
        
        ```javascript
        function validateURL() {
        equal(currentPath(), 'some.path.index', "correct path was transitioned into.");
        }
        
        click('#some-link-id').then(validateURL);
        ```
        */
        currentPath(): any;
        /*
        Fills in an input element with some text.
        
        Example:
        
        ```javascript
        fillIn('#email', 'you@example.com').then(function() {
          // assert something
        });
        ```
        */
        fillIn(selector: string, text: string): RSVP.Promise;
        /*
        Loads a route, sets up any controllers, and renders any templates associated
        with the route as though a real user had triggered the route change while
        using your app.
        
        Example:
        
        ```javascript
        visit('posts/index').then(function() {
          // assert something
        });
        ```
        */
        visit(url: string): RSVP.Promise;
        /*
        Returns the current URL.
        
        Example:
        
        ```javascript
        function validateURL() {
        equal(currentURL(), '/some/path', "correct URL was transitioned into.");
        }
        
        click('#some-link-id').then(validateURL);
        ```
        */
        currentURL(): any;
        /*
        Causes the run loop to process any pending events. This is used to ensure that
        any async operations from other helpers (or your assertions) have been processed.
        
        This is most often used as the return value for the helper functions (see 'click',
        'fillIn','visit',etc). However, there is a method to register a test helper which
        utilizes this method without the need to actually call `wait()` in your helpers.
        
        The `wait` helper is built into `registerAsyncHelper` by default. You will not need
        to `return app.testHelpers.wait();` - the wait behavior is provided for you.
        
        Example:
        
        ```javascript
        Ember.Test.registerAsyncHelper('loginUser', function(app, username, password) {
          visit('secured/path/here')
            .fillIn('#username', username)
            .fillIn('#password', password)
            .click('.submit');
        });
        */
        wait(value: any): RSVP.Promise;
        /*
        Resumes a test paused by `pauseTest`.
        */
        resumeTest(): void;
        /*
        This property contains the testing helpers for the current application. These
        are created once you call `injectTestHelpers` on your `Ember.Application`
        instance. The included helpers are also available on the `window` object by
        default, but can be used from this object on the individual application also.
        */
        testHelpers: {Object};
        /*
        This returns a thenable tailored for testing.  It catches failed
        `onSuccess` callbacks and invokes the `Ember.Test.adapter.exception`
        callback in the last chained then.
        
        This method should be returned by async helpers such as `wait`.
        */
        promise(resolver: Function, label: string): any;
        /*
        Pauses the current test - this is useful for debugging while testing or for test-driving.
        It allows you to inspect the state of your application at any point.
        Example (The test will pause before clicking the button):
        
        ```javascript
        visit('/')
        return pauseTest();
        click('.btn');
        ```
        */
        pauseTest(): any;
        /*
        Replacement for `Ember.RSVP.resolve`
        The only difference is this uses
        an instance of `Ember.Test.Promise`
        */
        resolve(The: Mixed): any;
        /*
        `registerAsyncHelper` is used to register an async test helper that will be injected
        when `App.injectTestHelpers` is called.
        
        The helper method will always be called with the current Application as
        the first parameter.
        
        For example:
        
        ```javascript
        Ember.Test.registerAsyncHelper('boot', function(app) {
          Ember.run(app, app.advanceReadiness);
        });
        ```
        
        The advantage of an async helper is that it will not run
        until the last async helper has completed.  All async helpers
        after it will wait for it complete before running.
        
        
        For example:
        
        ```javascript
        Ember.Test.registerAsyncHelper('deletePost', function(app, postId) {
          click('.delete-' + postId);
        });
        
        // ... in your test
        visit('/post/2');
        deletePost(2);
        visit('/post/3');
        deletePost(3);
        ```
        */
        registerAsyncHelper(name: string, helperMethod: Function): any;
        /*
        This property indicates whether or not this application is currently in
        testing mode. This is set when `setupForTesting` is called on the current
        application.
        */
        testing: {Boolean};
        /*
        `unregisterWaiter` is used to unregister a callback that was
        registered with `registerWaiter`.
        */
        unregisterWaiter(context: any, callback: Function): any;
        /*
        This hook defers the readiness of the application, so that you can start
        the app when your tests are ready to run. It also sets the router's
        location to 'none', so that the window's location will not be modified
        (preventing both accidental leaking of state between tests and interference
        with your testing framework).
        
        Example:
        
        ```
        App.setupForTesting();
        ```
        */
        setupForTesting(): any;
        /*
        Used to allow ember-testing to communicate with a specific testing
        framework.
        
        You can manually set it before calling `App.setupForTesting()`.
        
        Example:
        
        ```javascript
        Ember.Test.adapter = MyCustomAdapter.create()
        ```
        
        If you do not set it, ember-testing will default to `Ember.Test.QUnitAdapter`.
        */
        adapter: {Class} The adapter to be used.;
        /*
        Iterates through each registered test waiter, and invokes
        its callback. If any waiter returns false, this method will return
        true indicating that the waiters have not settled yet.
        
        This is generally used internally from the acceptance/integration test
        infrastructure.
        */
        checkWaiters(): any;
        /*
        Remove a previously added helper method.
        
        Example:
        
        ```javascript
        Ember.Test.unregisterHelper('wait');
        ```
        */
        unregisterHelper(name: string): any;
        /*
        This injects the test helpers into the `helperContainer` object. If an object is provided
        it will be used as the helperContainer. If `helperContainer` is not set it will default
        to `window`. If a function of the same name has already been defined it will be cached
        (so that it can be reset if the helper is removed with `unregisterHelper` or
        `removeTestHelpers`).
        
        Any callbacks registered with `onInjectHelpers` will be called once the
        helpers have been injected.
        
        Example:
        ```
        App.injectTestHelpers();
        ```
        */
        injectTestHelpers(): any;
        /*
        This removes all helpers that have been registered, and resets and functions
        that were overridden by the helpers.
        
        Example:
        
        ```javascript
        App.removeTestHelpers();
        ```
        */
        removeTestHelpers(): any;
    }
}
