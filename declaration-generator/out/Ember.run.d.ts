//packages/ember-metal/lib/run_loop.js
declare namespace Ember {
    /*
    Runs the passed target and method inside of a RunLoop, ensuring any
    deferred actions including bindings and views updates are flushed at the
    end.
    
    Normally you should not need to invoke this method yourself. However if
    you are implementing raw event handlers when interfacing with other
    libraries or plugins, you should probably wrap all of your code inside this
    call.
    
    ```javascript
    run(function() {
      // code to be executed within a RunLoop
    });
    ```
    */
    class run {
        /*
        If no run-loop is present, it creates a new one. If a run loop is
        present it will queue itself to run on the existing run-loops action
        queue.
        
        Please note: This is not for normal usage, and should be used sparingly.
        
        If invoked when not within a run loop:
        
        ```javascript
        run.join(function() {
          // creates a new run-loop
        });
        ```
        
        Alternatively, if called within an existing run loop:
        
        ```javascript
        run(function() {
          // creates a new run-loop
          run.join(function() {
            // joins with the existing run-loop, and queues for invocation on
            // the existing run-loops action queue.
          });
        });
        ```
        */
        join(target: any, method: Function | string, ...args: any[]): any;
        /*
        Allows you to specify which context to call the specified function in while
        adding the execution of that function to the Ember run loop. This ability
        makes this method a great way to asynchronously integrate third-party libraries
        into your Ember application.
        
        `run.bind` takes two main arguments, the desired context and the function to
        invoke in that context. Any additional arguments will be supplied as arguments
        to the function that is passed in.
        
        Let's use the creation of a TinyMCE component as an example. Currently,
        TinyMCE provides a setup configuration option we can use to do some processing
        after the TinyMCE instance is initialized but before it is actually rendered.
        We can use that setup option to do some additional setup for our component.
        The component itself could look something like the following:
        
        ```javascript
        App.RichTextEditorComponent = Ember.Component.extend({
          initializeTinyMCE: Ember.on('didInsertElement', function() {
            tinymce.init({
              selector: '#' + this.$().prop('id'),
              setup: Ember.run.bind(this, this.setupEditor)
            });
          }),
        
          setupEditor: function(editor) {
            this.set('editor', editor);
        
            editor.on('change', function() {
              console.log('content changed!');
            });
          }
        });
        ```
        
        In this example, we use Ember.run.bind to bind the setupEditor method to the
        context of the App.RichTextEditorComponent and to have the invocation of that
        method be safely handled and executed by the Ember run loop.
        */
        bind(target: any, method: Function | string, ...args: any[]): Function;
        /*
        Begins a new RunLoop. Any deferred actions invoked after the begin will
        be buffered until you invoke a matching call to `run.end()`. This is
        a lower-level way to use a RunLoop instead of using `run()`.
        
        ```javascript
        run.begin();
        // code to be executed within a RunLoop
        run.end();
        ```
        */
        begin(): void;
        /*
        Ends a RunLoop. This must be called sometime after you call
        `run.begin()` to flush any deferred actions. This is a lower-level way
        to use a RunLoop instead of using `run()`.
        
        ```javascript
        run.begin();
        // code to be executed within a RunLoop
        run.end();
        ```
        */
        end(): void;
        /*
        Adds the passed target/method and any optional arguments to the named
        queue to be executed at the end of the RunLoop. If you have not already
        started a RunLoop when calling this method one will be started for you
        automatically.
        
        At the end of a RunLoop, any methods scheduled in this way will be invoked.
        Methods will be invoked in an order matching the named queues defined in
        the `run.queues` property.
        
        ```javascript
        run.schedule('sync', this, function() {
          // this will be executed in the first RunLoop queue, when bindings are synced
          console.log('scheduled on sync queue');
        });
        
        run.schedule('actions', this, function() {
          // this will be executed in the 'actions' queue, after bindings have synced.
          console.log('scheduled on actions queue');
        });
        
        // Note the functions will be run in order based on the run queues order.
        // Output would be:
        //   scheduled on sync queue
        //   scheduled on actions queue
        ```
        */
        schedule(queue: string, target: any, method: string | Function, ...arguments: any[]): any;
        /*
        Invokes the passed target/method and optional arguments after a specified
        period of time. The last parameter of this method must always be a number
        of milliseconds.
        
        You should use this method whenever you need to run some action after a
        period of time instead of using `setTimeout()`. This method will ensure that
        items that expire during the same script execution cycle all execute
        together, which is often more efficient than using a real setTimeout.
        
        ```javascript
        run.later(myContext, function() {
          // code here will execute within a RunLoop in about 500ms with this == myContext
        }, 500);
        ```
        */
        later(target: any, method: Function | string, ...args: any[], wait: number): any;
        /*
        Schedule a function to run one time during the current RunLoop. This is equivalent
        to calling `scheduleOnce` with the "actions" queue.
        */
        once(target: any, method: Function | string, ...args: any[]): any;
        /*
        Schedules a function to run one time in a given queue of the current RunLoop.
        Calling this method with the same queue/target/method combination will have
        no effect (past the initial call).
        
        Note that although you can pass optional arguments these will not be
        considered when looking for duplicates. New arguments will replace previous
        calls.
        
        ```javascript
        function sayHi() {
          console.log('hi');
        }
        
        run(function() {
          run.scheduleOnce('afterRender', myContext, sayHi);
          run.scheduleOnce('afterRender', myContext, sayHi);
          // sayHi will only be executed once, in the afterRender queue of the RunLoop
        });
        ```
        
        Also note that passing an anonymous function to `run.scheduleOnce` will
        not prevent additional calls with an identical anonymous function from
        scheduling the items multiple times, e.g.:
        
        ```javascript
        function scheduleIt() {
          run.scheduleOnce('actions', myContext, function() {
            console.log('Closure');
          });
        }
        
        scheduleIt();
        scheduleIt();
        
        // "Closure" will print twice, even though we're using `run.scheduleOnce`,
        // because the function we pass to it is anonymous and won't match the
        // previously scheduled operation.
        ```
        
        Available queues, and their order, can be found at `run.queues`
        */
        scheduleOnce(queue: string, target: any, method: Function | string, ...args: any[]): any;
        /*
        Schedules an item to run from within a separate run loop, after
        control has been returned to the system. This is equivalent to calling
        `run.later` with a wait time of 1ms.
        
        ```javascript
        run.next(myContext, function() {
          // code to be executed in the next run loop,
          // which will be scheduled after the current one
        });
        ```
        
        Multiple operations scheduled with `run.next` will coalesce
        into the same later run loop, along with any other operations
        scheduled by `run.later` that expire right around the same
        time that `run.next` operations will fire.
        
        Note that there are often alternatives to using `run.next`.
        For instance, if you'd like to schedule an operation to happen
        after all DOM element operations have completed within the current
        run loop, you can make use of the `afterRender` run loop queue (added
        by the `ember-views` package, along with the preceding `render` queue
        where all the DOM element operations happen).
        
        Example:
        
        ```javascript
        export default Ember.Component.extend({
          didInsertElement() {
            this._super(...arguments);
            run.scheduleOnce('afterRender', this, 'processChildElements');
          },
        
          processChildElements() {
            // ... do something with component's child component
            // elements after they've finished rendering, which
            // can't be done within this component's
            // `didInsertElement` hook because that gets run
            // before the child elements have been added to the DOM.
          }
        });
        ```
        
        One benefit of the above approach compared to using `run.next` is
        that you will be able to perform DOM/CSS operations before unprocessed
        elements are rendered to the screen, which may prevent flickering or
        other artifacts caused by delaying processing until after rendering.
        
        The other major benefit to the above approach is that `run.next`
        introduces an element of non-determinism, which can make things much
        harder to test, due to its reliance on `setTimeout`; it's much harder
        to guarantee the order of scheduled operations when they are scheduled
        outside of the current run loop, i.e. with `run.next`.
        */
        next(target: any, method: Function | string, ...args: any[]): any;
        /*
        Cancels a scheduled item. Must be a value returned by `run.later()`,
        `run.once()`, `run.scheduleOnce()`, `run.next()`, `run.debounce()`, or
        `run.throttle()`.
        
        ```javascript
        let runNext = run.next(myContext, function() {
          // will not be executed
        });
        
        run.cancel(runNext);
        
        let runLater = run.later(myContext, function() {
          // will not be executed
        }, 500);
        
        run.cancel(runLater);
        
        let runScheduleOnce = run.scheduleOnce('afterRender', myContext, function() {
          // will not be executed
        });
        
        run.cancel(runScheduleOnce);
        
        let runOnce = run.once(myContext, function() {
          // will not be executed
        });
        
        run.cancel(runOnce);
        
        let throttle = run.throttle(myContext, function() {
          // will not be executed
        }, 1, false);
        
        run.cancel(throttle);
        
        let debounce = run.debounce(myContext, function() {
          // will not be executed
        }, 1);
        
        run.cancel(debounce);
        
        let debounceImmediate = run.debounce(myContext, function() {
          // will be executed since we passed in true (immediate)
        }, 100, true);
        
        // the 100ms delay until this method can be called again will be cancelled
        run.cancel(debounceImmediate);
        ```
        */
        cancel(timer: any): boolean;
        /*
        Delay calling the target method until the debounce period has elapsed
        with no additional debounce calls. If `debounce` is called again before
        the specified time has elapsed, the timer is reset and the entire period
        must pass again before the target method is called.
        
        This method should be used when an event may be called multiple times
        but the action should only be called once when the event is done firing.
        A common example is for scroll events where you only want updates to
        happen once scrolling has ceased.
        
        ```javascript
        function whoRan() {
          console.log(this.name + ' ran.');
        }
        
        let myContext = { name: 'debounce' };
        
        run.debounce(myContext, whoRan, 150);
        
        // less than 150ms passes
        run.debounce(myContext, whoRan, 150);
        
        // 150ms passes
        // whoRan is invoked with context myContext
        // console logs 'debounce ran.' one time.
        ```
        
        Immediate allows you to run the function immediately, but debounce
        other calls for this function until the wait time has elapsed. If
        `debounce` is called again before the specified time has elapsed,
        the timer is reset and the entire period must pass again before
        the method can be called again.
        
        ```javascript
        function whoRan() {
          console.log(this.name + ' ran.');
        }
        
        let myContext = { name: 'debounce' };
        
        run.debounce(myContext, whoRan, 150, true);
        
        // console logs 'debounce ran.' one time immediately.
        // 100ms passes
        run.debounce(myContext, whoRan, 150, true);
        
        // 150ms passes and nothing else is logged to the console and
        // the debouncee is no longer being watched
        run.debounce(myContext, whoRan, 150, true);
        
        // console logs 'debounce ran.' one time immediately.
        // 150ms passes and nothing else is logged to the console and
        // the debouncee is no longer being watched
        
        ```
        */
        debounce(target: any, method: Function | string, ...args: any[], wait: number, immediate: boolean): Array;
        /*
        Ensure that the target method is never called more frequently than
        the specified spacing period. The target method is called immediately.
        
        ```javascript
        function whoRan() {
          console.log(this.name + ' ran.');
        }
        
        let myContext = { name: 'throttle' };
        
        run.throttle(myContext, whoRan, 150);
        // whoRan is invoked with context myContext
        // console logs 'throttle ran.'
        
        // 50ms passes
        run.throttle(myContext, whoRan, 150);
        
        // 50ms passes
        run.throttle(myContext, whoRan, 150);
        
        // 150ms passes
        run.throttle(myContext, whoRan, 150);
        // whoRan is invoked with context myContext
        // console logs 'throttle ran.'
        ```
        */
        throttle(target: any, method: Function | string, ...args: any[], spacing: number, immediate: boolean): Array;
    }
}
