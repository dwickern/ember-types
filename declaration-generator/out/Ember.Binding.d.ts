//packages/ember-metal/lib/binding.js
declare namespace Ember {
    /*
    An `Ember.Binding` connects the properties of two objects so that whenever
    the value of one property changes, the other property will be changed also.
    
    ## Automatic Creation of Bindings with `/^*Binding/`-named Properties.
    
    You do not usually create Binding objects directly but instead describe
    bindings in your class or object definition using automatic binding
    detection.
    
    Properties ending in a `Binding` suffix will be converted to `Ember.Binding`
    instances. The value of this property should be a string representing a path
    to another object or a custom binding instance created using Binding helpers
    (see "One Way Bindings"):
    
    ```
    valueBinding: "MyApp.someController.title"
    ```
    
    This will create a binding from `MyApp.someController.title` to the `value`
    property of your object instance automatically. Now the two values will be
    kept in sync.
    
    ## One Way Bindings
    
    One especially useful binding customization you can use is the `oneWay()`
    helper. This helper tells Ember that you are only interested in
    receiving changes on the object you are binding from. For example, if you
    are binding to a preference and you want to be notified if the preference
    has changed, but your object will not be changing the preference itself, you
    could do:
    
    ```
    bigTitlesBinding: Ember.Binding.oneWay("MyApp.preferencesController.bigTitles")
    ```
    
    This way if the value of `MyApp.preferencesController.bigTitles` changes the
    `bigTitles` property of your object will change also. However, if you
    change the value of your `bigTitles` property, it will not update the
    `preferencesController`.
    
    One way bindings are almost twice as fast to setup and twice as fast to
    execute because the binding only has to worry about changes to one side.
    
    You should consider using one way bindings anytime you have an object that
    may be created frequently and you do not intend to change a property; only
    to monitor it for changes (such as in the example above).
    
    ## Adding Bindings Manually
    
    All of the examples above show you how to configure a custom binding, but the
    result of these customizations will be a binding template, not a fully active
    Binding instance. The binding will actually become active only when you
    instantiate the object the binding belongs to. It is useful, however, to
    understand what actually happens when the binding is activated.
    
    For a binding to function it must have at least a `from` property and a `to`
    property. The `from` property path points to the object/key that you want to
    bind from while the `to` path points to the object/key you want to bind to.
    
    When you define a custom binding, you are usually describing the property
    you want to bind from (such as `MyApp.someController.value` in the examples
    above). When your object is created, it will automatically assign the value
    you want to bind `to` based on the name of your binding key. In the
    examples above, during init, Ember objects will effectively call
    something like this on your binding:
    
    ```javascript
    binding = Ember.Binding.from("valueBinding").to("value");
    ```
    
    This creates a new binding instance based on the template you provide, and
    sets the to path to the `value` property of the new object. Now that the
    binding is fully configured with a `from` and a `to`, it simply needs to be
    connected to become active. This is done through the `connect()` method:
    
    ```javascript
    binding.connect(this);
    ```
    
    Note that when you connect a binding you pass the object you want it to be
    connected to. This object will be used as the root for both the from and
    to side of the binding when inspecting relative paths. This allows the
    binding to be automatically inherited by subclassed objects as well.
    
    This also allows you to bind between objects using the paths you declare in
    `from` and `to`:
    
    ```javascript
    // Example 1
    binding = Ember.Binding.from("App.someObject.value").to("value");
    binding.connect(this);
    
    // Example 2
    binding = Ember.Binding.from("parentView.value").to("App.someObject.value");
    binding.connect(this);
    ```
    
    Now that the binding is connected, it will observe both the from and to side
    and relay changes.
    
    If you ever needed to do so (you almost never will, but it is useful to
    understand this anyway), you could manually create an active binding by
    using the `Ember.bind()` helper method. (This is the same method used by
    to setup your bindings on objects):
    
    ```javascript
    Ember.bind(MyApp.anotherObject, "value", "MyApp.someController.value");
    ```
    
    Both of these code fragments have the same effect as doing the most friendly
    form of binding creation like so:
    
    ```javascript
    MyApp.anotherObject = Ember.Object.create({
      valueBinding: "MyApp.someController.value",
    
      // OTHER CODE FOR THIS OBJECT...
    });
    ```
    
    Ember's built in binding creation method makes it easy to automatically
    create bindings for you. You should always use the highest-level APIs
    available, even if you understand how it works underneath.
    */
    class Binding {
        /*
        This copies the Binding so it can be connected to another object.
        */
        copy(): Ember.Binding;
        /*
        This will set `from` property path to the specified value. It will not
        attempt to resolve this property path to an actual object until you
        connect the binding.
        
        The binding will search for the property path starting at the root object
        you pass when you `connect()` the binding. It follows the same rules as
        `get()` - see that method for more information.
        */
        from(path: string): Ember.Binding;
        /*
        This will set the `to` property path to the specified value. It will not
        attempt to resolve this property path to an actual object until you
        connect the binding.
        
        The binding will search for the property path starting at the root object
        you pass when you `connect()` the binding. It follows the same rules as
        `get()` - see that method for more information.
        */
        to(path: string | Tuple): Ember.Binding;
        /*
        Configures the binding as one way. A one-way binding will relay changes
        on the `from` side to the `to` side, but not the other way around. This
        means that if you change the `to` side directly, the `from` side may have
        a different value.
        */
        oneWay(): Ember.Binding;
        toString(): string;
        /*
        Attempts to connect this binding instance so that it can receive and relay
        changes. This method will raise an exception if you have not set the
        from/to properties yet.
        */
        connect(obj: any): Ember.Binding;
        /*
        Disconnects the binding instance. Changes will no longer be relayed. You
        will not usually need to call this method.
        */
        disconnect(): Ember.Binding;
    }
}
