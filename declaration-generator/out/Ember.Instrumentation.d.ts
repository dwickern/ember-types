//packages/ember-metal/lib/instrumentation.js
declare namespace Ember.Instrumentation {
    /*
    The purpose of the Ember Instrumentation module is
    to provide efficient, general-purpose instrumentation
    for Ember.
    
    Subscribe to a listener by using `Ember.subscribe`:
    
    ```javascript
    Ember.subscribe("render", {
      before(name, timestamp, payload) {
    
      },
    
      after(name, timestamp, payload) {
    
      }
    });
    ```
    
    If you return a value from the `before` callback, that same
    value will be passed as a fourth parameter to the `after`
    callback.
    
    Instrument a block of code by using `Ember.instrument`:
    
    ```javascript
    Ember.instrument("render.handlebars", payload, function() {
      // rendering logic
    }, binding);
    ```
    
    Event names passed to `Ember.instrument` are namespaced
    by periods, from more general to more specific. Subscribers
    can listen for events by whatever level of granularity they
    are interested in.
    
    In the above example, the event is `render.handlebars`,
    and the subscriber listened for all events beginning with
    `render`. It would receive callbacks for events named
    `render`, `render.handlebars`, `render.container`, or
    even `render.handlebars.layout`.
    */
    private class Instrumentation {
    }
}
