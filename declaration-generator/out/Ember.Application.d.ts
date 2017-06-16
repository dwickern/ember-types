//packages/ember-application/lib/system/application.js
declare namespace Ember {
    /*
    An instance of `Ember.Application` is the starting point for every Ember
    application. It helps to instantiate, initialize and coordinate the many
    objects that make up your app.
    
    Each Ember app has one and only one `Ember.Application` object. In fact, the
    very first thing you should do in your application is create the instance:
    
    ```javascript
    window.App = Ember.Application.create();
    ```
    
    Typically, the application object is the only global variable. All other
    classes in your app should be properties on the `Ember.Application` instance,
    which highlights its first role: a global namespace.
    
    For example, if you define a view class, it might look like this:
    
    ```javascript
    App.MyView = Ember.View.extend();
    ```
    
    By default, calling `Ember.Application.create()` will automatically initialize
    your application by calling the `Ember.Application.initialize()` method. If
    you need to delay initialization, you can call your app's `deferReadiness()`
    method. When you are ready for your app to be initialized, call its
    `advanceReadiness()` method.
    
    You can define a `ready` method on the `Ember.Application` instance, which
    will be run by Ember when the application is initialized.
    
    Because `Ember.Application` inherits from `Ember.Namespace`, any classes
    you create will have useful string representations when calling `toString()`.
    See the `Ember.Namespace` documentation for more information.
    
    While you can think of your `Ember.Application` as a container that holds the
    other classes in your application, there are several other responsibilities
    going on under-the-hood that you may want to understand.
    
    ### Event Delegation
    
    Ember uses a technique called _event delegation_. This allows the framework
    to set up a global, shared event listener instead of requiring each view to
    do it manually. For example, instead of each view registering its own
    `mousedown` listener on its associated element, Ember sets up a `mousedown`
    listener on the `body`.
    
    If a `mousedown` event occurs, Ember will look at the target of the event and
    start walking up the DOM node tree, finding corresponding views and invoking
    their `mouseDown` method as it goes.
    
    `Ember.Application` has a number of default events that it listens for, as
    well as a mapping from lowercase events to camel-cased view method names. For
    example, the `keypress` event causes the `keyPress` method on the view to be
    called, the `dblclick` event causes `doubleClick` to be called, and so on.
    
    If there is a bubbling browser event that Ember does not listen for by
    default, you can specify custom events and their corresponding view method
    names by setting the application's `customEvents` property:
    
    ```javascript
    let App = Ember.Application.create({
      customEvents: {
        // add support for the paste event
        paste: 'paste'
      }
    });
    ```
    
    To prevent Ember from setting up a listener for a default event,
    specify the event name with a `null` value in the `customEvents`
    property:
    
    ```javascript
    let App = Ember.Application.create({
      customEvents: {
        // prevent listeners for mouseenter/mouseleave events
        mouseenter: null,
        mouseleave: null
      }
    });
    ```
    
    By default, the application sets up these event listeners on the document
    body. However, in cases where you are embedding an Ember application inside
    an existing page, you may want it to set up the listeners on an element
    inside the body.
    
    For example, if only events inside a DOM element with the ID of `ember-app`
    should be delegated, set your application's `rootElement` property:
    
    ```javascript
    let App = Ember.Application.create({
      rootElement: '#ember-app'
    });
    ```
    
    The `rootElement` can be either a DOM element or a jQuery-compatible selector
    string. Note that *views appended to the DOM outside the root element will
    not receive events.* If you specify a custom root element, make sure you only
    append views inside it!
    
    To learn more about the events Ember components use, see
    [components/handling-events](https://guides.emberjs.com/v2.6.0/components/handling-events/#toc_event-names).
    
    ### Initializers
    
    Libraries on top of Ember can add initializers, like so:
    
    ```javascript
    Ember.Application.initializer({
      name: 'api-adapter',
    
      initialize: function(application) {
        application.register('api-adapter:main', ApiAdapter);
      }
    });
    ```
    
    Initializers provide an opportunity to access the internal registry, which
    organizes the different components of an Ember application. Additionally
    they provide a chance to access the instantiated application. Beyond
    being used for libraries, initializers are also a great way to organize
    dependency injection or setup in your own application.
    
    ### Routing
    
    In addition to creating your application's router, `Ember.Application` is
    also responsible for telling the router when to start routing. Transitions
    between routes can be logged with the `LOG_TRANSITIONS` flag, and more
    detailed intra-transition logging can be logged with
    the `LOG_TRANSITIONS_INTERNAL` flag:
    
    ```javascript
    let App = Ember.Application.create({
      LOG_TRANSITIONS: true, // basic logging of successful transitions
      LOG_TRANSITIONS_INTERNAL: true // detailed logging of all routing steps
    });
    ```
    
    By default, the router will begin trying to translate the current URL into
    application state once the browser emits the `DOMContentReady` event. If you
    need to defer routing, you can call the application's `deferReadiness()`
    method. Once routing can begin, call the `advanceReadiness()` method.
    
    If there is any setup required before routing begins, you can implement a
    `ready()` method on your app that will be invoked immediately before routing
    begins.
    */
    class Application {
        /*
        The root DOM element of the Application. This can be specified as an
        element or a
        [jQuery-compatible selector string](http://api.jquery.com/category/selectors/).
        
        This is the element that will be passed to the Application's,
        `eventDispatcher`, which sets up the listeners for event delegation. Every
        view in your application should be a child of the element you specify here.
        */
        rootElement: DOMElement;
        /*
        The `Ember.EventDispatcher` responsible for delegating events to this
        application's views.
        
        The event dispatcher is created by the application at initialization time
        and sets up event listeners on the DOM element described by the
        application's `rootElement` property.
        
        See the documentation for `Ember.EventDispatcher` for more information.
        */
        eventDispatcher: Ember.EventDispatcher;
        /*
        The DOM events for which the event dispatcher should listen.
        
        By default, the application's `Ember.EventDispatcher` listens
        for a set of standard DOM events, such as `mousedown` and
        `keyup`, and delegates them to your application's `Ember.View`
        instances.
        
        If you would like additional bubbling events to be delegated to your
        views, set your `Ember.Application`'s `customEvents` property
        to a hash containing the DOM event name as the key and the
        corresponding view method name as the value. Setting an event to
        a value of `null` will prevent a default event listener from being
        added for that event.
        
        To add new events to be listened to:
        
        ```javascript
        let App = Ember.Application.create({
          customEvents: {
            // add support for the paste event
            paste: 'paste'
          }
        });
        ```
        
        To prevent default events from being listened to:
        
        ```javascript
        let App = Ember.Application.create({
          customEvents: {
            // remove support for mouseenter / mouseleave events
            mouseenter: null,
            mouseleave: null
          }
        });
        ```
        */
        customEvents: any;
        /*
        Use this to defer readiness until some condition is true.
        
        Example:
        
        ```javascript
        let App = Ember.Application.create();
        
        App.deferReadiness();
        
        // Ember.$ is a reference to the jQuery object/function
        Ember.$.getJSON('/auth-token', function(token) {
          App.token = token;
          App.advanceReadiness();
        });
        ```
        
        This allows you to perform asynchronous setup logic and defer
        booting your application until the setup has finished.
        
        However, if the setup requires a loading UI, it might be better
        to use the router for this purpose.
        */
        deferReadiness(): any;
        /*
        Call `advanceReadiness` after any asynchronous setup logic has completed.
        Each call to `deferReadiness` must be matched by a call to `advanceReadiness`
        or the application will never become ready and routing will not begin.
        */
        advanceReadiness(): any;
        /*
        Reset the application. This is typically used only in tests. It cleans up
        the application in the following order:
        
        1. Deactivate existing routes
        2. Destroy all objects in the container
        3. Create a new application container
        4. Re-route to the existing url
        
        Typical Example:
        
        ```javascript
        let App;
        
        run(function() {
          App = Ember.Application.create();
        });
        
        module('acceptance test', {
          setup: function() {
            App.reset();
          }
        });
        
        test('first test', function() {
          // App is freshly reset
        });
        
        test('second test', function() {
          // App is again freshly reset
        });
        ```
        
        Advanced Example:
        
        Occasionally you may want to prevent the app from initializing during
        setup. This could enable extra configuration, or enable asserting prior
        to the app becoming ready.
        
        ```javascript
        let App;
        
        run(function() {
          App = Ember.Application.create();
        });
        
        module('acceptance test', {
          setup: function() {
            run(function() {
              App.reset();
              App.deferReadiness();
            });
          }
        });
        
        test('first test', function() {
          ok(true, 'something before app is initialized');
        
          run(function() {
            App.advanceReadiness();
          });
        
          ok(true, 'something after app is initialized');
        });
        ```
        */
        reset(): any;
        /*
        Called when the Application has become ready, immediately before routing
        begins. The call will be delayed until the DOM has become ready.
        */
        ready(): any;
        /*
        Boot a new instance of `Ember.ApplicationInstance` for the current
        application and navigate it to the given `url`. Returns a `Promise` that
        resolves with the instance when the initial routing and rendering is
        complete, or rejects with any error that occurred during the boot process.
        
        When `autoboot` is disabled, calling `visit` would first cause the
        application to boot, which runs the application initializers.
        
        This method also takes a hash of boot-time configuration options for
        customizing the instance's behavior. See the documentation on
        `Ember.ApplicationInstance.BootOptions` for details.
        
        `Ember.ApplicationInstance.BootOptions` is an interface class that exists
        purely to document the available options; you do not need to construct it
        manually. Simply pass a regular JavaScript object containing of the
        desired options:
        
        ```javascript
        MyApp.visit("/", { location: "none", rootElement: "#container" });
        ```
        
        ### Supported Scenarios
        
        While the `BootOptions` class exposes a large number of knobs, not all
        combinations of them are valid; certain incompatible combinations might
        result in unexpected behavior.
        
        For example, booting the instance in the full browser environment
        while specifying a foreign `document` object (e.g. `{ isBrowser: true,
        document: iframe.contentDocument }`) does not work correctly today,
        largely due to Ember's jQuery dependency.
        
        Currently, there are three officially supported scenarios/configurations.
        Usages outside of these scenarios are not guaranteed to work, but please
        feel free to file bug reports documenting your experience and any issues
        you encountered to help expand support.
        
        #### Browser Applications (Manual Boot)
        
        The setup is largely similar to how Ember works out-of-the-box. Normally,
        Ember will boot a default instance for your Application on "DOM ready".
        However, you can customize this behavior by disabling `autoboot`.
        
        For example, this allows you to render a miniture demo of your application
        into a specific area on your marketing website:
        
        ```javascript
        import MyApp from 'my-app';
        
        $(function() {
          let App = MyApp.create({ autoboot: false });
        
          let options = {
            // Override the router's location adapter to prevent it from updating
            // the URL in the address bar
            location: 'none',
        
            // Override the default `rootElement` on the app to render into a
            // specific `div` on the page
            rootElement: '#demo'
          };
        
          // Start the app at the special demo URL
          App.visit('/demo', options);
        });
        ````
        
        Or perhaps you might want to boot two instances of your app on the same
        page for a split-screen multiplayer experience:
        
        ```javascript
        import MyApp from 'my-app';
        
        $(function() {
          let App = MyApp.create({ autoboot: false });
        
          let sessionId = MyApp.generateSessionID();
        
          let player1 = App.visit(`/matches/join?name=Player+1&session=${sessionId}`, { rootElement: '#left', location: 'none' });
          let player2 = App.visit(`/matches/join?name=Player+2&session=${sessionId}`, { rootElement: '#right', location: 'none' });
        
          Promise.all([player1, player2]).then(() => {
            // Both apps have completed the initial render
            $('#loading').fadeOut();
          });
        });
        ```
        
        Do note that each app instance maintains their own registry/container, so
        they will run in complete isolation by default.
        
        #### Server-Side Rendering (also known as FastBoot)
        
        This setup allows you to run your Ember app in a server environment using
        Node.js and render its content into static HTML for SEO purposes.
        
        ```javascript
        const HTMLSerializer = new SimpleDOM.HTMLSerializer(SimpleDOM.voidMap);
        
        function renderURL(url) {
          let dom = new SimpleDOM.Document();
          let rootElement = dom.body;
          let options = { isBrowser: false, document: dom, rootElement: rootElement };
        
          return MyApp.visit(options).then(instance => {
            try {
              return HTMLSerializer.serialize(rootElement.firstChild);
            } finally {
              instance.destroy();
            }
          });
        }
        ```
        
        In this scenario, because Ember does not have access to a global `document`
        object in the Node.js environment, you must provide one explicitly. In practice,
        in the non-browser environment, the stand-in `document` object only need to
        implement a limited subset of the full DOM API. The `SimpleDOM` library is known
        to work.
        
        Since there is no access to jQuery in the non-browser environment, you must also
        specify a DOM `Element` object in the same `document` for the `rootElement` option
        (as opposed to a selector string like `"body"`).
        
        See the documentation on the `isBrowser`, `document` and `rootElement` properties
        on `Ember.ApplicationInstance.BootOptions` for details.
        
        #### Server-Side Resource Discovery
        
        This setup allows you to run the routing layer of your Ember app in a server
        environment using Node.js and completely disable rendering. This allows you
        to simulate and discover the resources (i.e. AJAX requests) needed to fulfill
        a given request and eagerly "push" these resources to the client.
        
        ```app/initializers/network-service.js
        import BrowserNetworkService from 'app/services/network/browser';
        import NodeNetworkService from 'app/services/network/node';
        
        // Inject a (hypothetical) service for abstracting all AJAX calls and use
        // the appropriate implementation on the client/server. This also allows the
        // server to log all the AJAX calls made during a particular request and use
        // that for resource-discovery purpose.
        
        export function initialize(application) {
          if (window) { // browser
            application.register('service:network', BrowserNetworkService);
          } else { // node
            application.register('service:network', NodeNetworkService);
          }
        
          application.inject('route', 'network', 'service:network');
        };
        
        export default {
          name: 'network-service',
          initialize: initialize
        };
        ```
        
        ```app/routes/post.js
        import Ember from 'ember';
        
        // An example of how the (hypothetical) service is used in routes.
        
        export default Ember.Route.extend({
          model(params) {
            return this.network.fetch(`/api/posts/${params.post_id}.json`);
          },
        
          afterModel(post) {
            if (post.isExternalContent) {
              return this.network.fetch(`/api/external/?url=${post.externalURL}`);
            } else {
              return post;
            }
          }
        });
        ```
        
        ```javascript
        // Finally, put all the pieces together
        
        function discoverResourcesFor(url) {
          return MyApp.visit(url, { isBrowser: false, shouldRender: false }).then(instance => {
            let networkService = instance.lookup('service:network');
            return networkService.requests; // => { "/api/posts/123.json": "..." }
          });
        }
        ```
        */
        visit(url: string, options: Ember.ApplicationInstance.BootOptions): Promise<Ember.ApplicationInstance, Error>;
    }
}
