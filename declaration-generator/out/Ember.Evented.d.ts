//packages/ember-runtime/lib/mixins/evented.js
declare namespace Ember {
    /*
    This mixin allows for Ember objects to subscribe to and emit events.
    
    ```javascript
    App.Person = Ember.Object.extend(Ember.Evented, {
      greet: function() {
        // ...
        this.trigger('greet');
      }
    });
    
    var person = App.Person.create();
    
    person.on('greet', function() {
      console.log('Our person has greeted');
    });
    
    person.greet();
    
    // outputs: 'Our person has greeted'
    ```
    
    You can also chain multiple event subscriptions:
    
    ```javascript
    person.on('greet', function() {
      console.log('Our person has greeted');
    }).one('greet', function() {
      console.log('Offer one-time special');
    }).off('event', this, forgetThis);
    ```
    */
    class Evented {
        /*
        Subscribes to a named event with given function.
        
        ```javascript
        person.on('didLoad', function() {
          // fired once the person has loaded
        });
        ```
        
        An optional target can be passed in as the 2nd argument that will
        be set as the "this" for the callback. This is a good way to give your
        function access to the object triggering the event. When the target
        parameter is used the callback becomes the third argument.
        */
        on(name: string, target: any, method: Function): any;
        /*
        Subscribes a function to a named event and then cancels the subscription
        after the first time the event is triggered. It is good to use ``one`` when
        you only care about the first time an event has taken place.
        
        This function takes an optional 2nd argument that will become the "this"
        value for the callback. If this argument is passed then the 3rd argument
        becomes the function.
        */
        one(name: string, target: any, method: Function): any;
        /*
        Triggers a named event for the object. Any additional arguments
        will be passed as parameters to the functions that are subscribed to the
        event.
        
        ```javascript
        person.on('didEat', function(food) {
          console.log('person ate some ' + food);
        });
        
        person.trigger('didEat', 'broccoli');
        
        // outputs: person ate some broccoli
        ```
        */
        trigger(name: string, ...args: any[]): any;
        /*
        Cancels subscription for given name, target, and method.
        */
        off(name: string, target: any, method: Function): any;
        /*
        Checks to see if object has any subscriptions for named event.
        */
        has(name: string): boolean;
    }
}
