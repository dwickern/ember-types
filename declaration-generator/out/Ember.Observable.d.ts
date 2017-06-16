//packages/ember-runtime/lib/mixins/observable.js
declare namespace Ember {
    /*
    ## Overview
    
    This mixin provides properties and property observing functionality, core
    features of the Ember object model.
    
    Properties and observers allow one object to observe changes to a
    property on another object. This is one of the fundamental ways that
    models, controllers and views communicate with each other in an Ember
    application.
    
    Any object that has this mixin applied can be used in observer
    operations. That includes `Ember.Object` and most objects you will
    interact with as you write your Ember application.
    
    Note that you will not generally apply this mixin to classes yourself,
    but you will use the features provided by this module frequently, so it
    is important to understand how to use it.
    
    ## Using `get()` and `set()`
    
    Because of Ember's support for bindings and observers, you will always
    access properties using the get method, and set properties using the
    set method. This allows the observing objects to be notified and
    computed properties to be handled properly.
    
    More documentation about `get` and `set` are below.
    
    ## Observing Property Changes
    
    You typically observe property changes simply by using the `Ember.observer`
    function in classes that you write.
    
    For example:
    
    ```javascript
    Ember.Object.extend({
      valueObserver: Ember.observer('value', function(sender, key, value, rev) {
        // Executes whenever the "value" property changes
        // See the addObserver method for more information about the callback arguments
      })
    });
    ```
    
    Although this is the most common way to add an observer, this capability
    is actually built into the `Ember.Object` class on top of two methods
    defined in this mixin: `addObserver` and `removeObserver`. You can use
    these two methods to add and remove observers yourself if you need to
    do so at runtime.
    
    To add an observer for a property, call:
    
    ```javascript
    object.addObserver('propertyKey', targetObject, targetAction)
    ```
    
    This will call the `targetAction` method on the `targetObject` whenever
    the value of the `propertyKey` changes.
    
    Note that if `propertyKey` is a computed property, the observer will be
    called when any of the property dependencies are changed, even if the
    resulting value of the computed property is unchanged. This is necessary
    because computed properties are not computed until `get` is called.
    */
    class Observable {
        /*
        Retrieves the value of a property from the object.
        
        This method is usually similar to using `object[keyName]` or `object.keyName`,
        however it supports both computed properties and the unknownProperty
        handler.
        
        Because `get` unifies the syntax for accessing all these kinds
        of properties, it can make many refactorings easier, such as replacing a
        simple property with a computed property, or vice versa.
        
        ### Computed Properties
        
        Computed properties are methods defined with the `property` modifier
        declared at the end, such as:
        
        ```javascript
        fullName: Ember.computed('firstName', 'lastName', function() {
          return this.get('firstName') + ' ' + this.get('lastName');
        })
        ```
        
        When you call `get` on a computed property, the function will be
        called and the return value will be returned instead of the function
        itself.
        
        ### Unknown Properties
        
        Likewise, if you try to call `get` on a property whose value is
        `undefined`, the `unknownProperty()` method will be called on the object.
        If this method returns any value other than `undefined`, it will be returned
        instead. This allows you to implement "virtual" properties that are
        not defined upfront.
        */
        get(keyName: string): any;
        /*
        To get the values of multiple properties at once, call `getProperties`
        with a list of strings or an array:
        
        ```javascript
        record.getProperties('firstName', 'lastName', 'zipCode');
        // { firstName: 'John', lastName: 'Doe', zipCode: '10011' }
        ```
        
        is equivalent to:
        
        ```javascript
        record.getProperties(['firstName', 'lastName', 'zipCode']);
        // { firstName: 'John', lastName: 'Doe', zipCode: '10011' }
        ```
        */
        getProperties(list: string | Array): any;
        /*
        Sets the provided key or path to the value.
        
        ```javascript
        record.set("key", value);
        ```
        
        This method is generally very similar to calling `object["key"] = value` or
        `object.key = value`, except that it provides support for computed
        properties, the `setUnknownProperty()` method and property observers.
        
        ### Computed Properties
        
        If you try to set a value on a key that has a computed property handler
        defined (see the `get()` method for an example), then `set()` will call
        that method, passing both the value and key instead of simply changing
        the value itself. This is useful for those times when you need to
        implement a property that is composed of one or more member
        properties.
        
        ### Unknown Properties
        
        If you try to set a value on a key that is undefined in the target
        object, then the `setUnknownProperty()` handler will be called instead. This
        gives you an opportunity to implement complex "virtual" properties that
        are not predefined on the object. If `setUnknownProperty()` returns
        undefined, then `set()` will simply set the value on the object.
        
        ### Property Observers
        
        In addition to changing the property, `set()` will also register a property
        change with the object. Unless you have placed this call inside of a
        `beginPropertyChanges()` and `endPropertyChanges(),` any "local" observers
        (i.e. observer methods declared on the same object), will be called
        immediately. Any "remote" observers (i.e. observer methods declared on
        another object) will be placed in a queue and called at a later time in a
        coalesced manner.
        */
        set(keyName: string, value: any): any;
        /*
        Sets a list of properties at once. These properties are set inside
        a single `beginPropertyChanges` and `endPropertyChanges` batch, so
        observers will be buffered.
        
        ```javascript
        record.setProperties({ firstName: 'Charles', lastName: 'Jolley' });
        ```
        */
        setProperties(hash: any): any;
        /*
        Convenience method to call `propertyWillChange` and `propertyDidChange` in
        succession.
        */
        notifyPropertyChange(keyName: string): Ember.Observable;
        /*
        Adds an observer on a property.
        
        This is the core method used to register an observer for a property.
        
        Once you call this method, any time the key's value is set, your observer
        will be notified. Note that the observers are triggered any time the
        value is set, regardless of whether it has actually changed. Your
        observer should be prepared to handle that.
        
        ### Observer Methods
        
        Observer methods have the following signature:
        
        ```javascript
        export default Ember.Component.extend({
          init() {
            this._super(...arguments);
            this.addObserver('foo', this, 'fooDidChange');
          },
        
          fooDidChange(sender, key, value, rev) {
            // your code
          }
        });
        ```
        
        The `sender` is the object that changed. The `key` is the property that
        changes. The `value` property is currently reserved and unused. The `rev`
        is the last property revision of the object when it changed, which you can
        use to detect if the key value has really changed or not.
        
        Usually you will not need the value or revision parameters at
        the end. In this case, it is common to write observer methods that take
        only a sender and key value as parameters or, if you aren't interested in
        any of these values, to write an observer that has no parameters at all.
        */
        addObserver(key: string, target: any, method: string | Function): any;
        /*
        Remove an observer you have previously registered on this object. Pass
        the same key, target, and method you passed to `addObserver()` and your
        target will no longer receive notifications.
        */
        removeObserver(key: string, target: any, method: string | Function): any;
        /*
        Retrieves the value of a property, or a default value in the case that the
        property returns `undefined`.
        
        ```javascript
        person.getWithDefault('lastName', 'Doe');
        ```
        */
        getWithDefault(keyName: string, defaultValue: any): any;
        /*
        Set the value of a property to the current value plus some amount.
        
        ```javascript
        person.incrementProperty('age');
        team.incrementProperty('score', 2);
        ```
        */
        incrementProperty(keyName: string, increment: number): number;
        /*
        Set the value of a property to the current value minus some amount.
        
        ```javascript
        player.decrementProperty('lives');
        orc.decrementProperty('health', 5);
        ```
        */
        decrementProperty(keyName: string, decrement: number): number;
        /*
        Set the value of a boolean property to the opposite of its
        current value.
        
        ```javascript
        starship.toggleProperty('warpDriveEngaged');
        ```
        */
        toggleProperty(keyName: string): boolean;
        /*
        Returns the cached value of a computed property, if it exists.
        This allows you to inspect the value of a computed property
        without accidentally invoking it if it is intended to be
        generated lazily.
        */
        cacheFor(keyName: string): any;
    }
}
