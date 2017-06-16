declare namespace Ember {
    class Function {
        /*
        The `property` extension of Javascript's Function prototype is available
        when `EmberENV.EXTEND_PROTOTYPES` or `EmberENV.EXTEND_PROTOTYPES.Function` is
        `true`, which is the default.
        
        Computed properties allow you to treat a function like a property:
        
        ```javascript
        MyApp.President = Ember.Object.extend({
          firstName: '',
          lastName:  '',
        
          fullName: function() {
            return this.get('firstName') + ' ' + this.get('lastName');
          }.property() // Call this flag to mark the function as a property
        });
        
        let president = MyApp.President.create({
          firstName: 'Barack',
          lastName: 'Obama'
        });
        
        president.get('fullName'); // 'Barack Obama'
        ```
        
        Treating a function like a property is useful because they can work with
        bindings, just like any other property.
        
        Many computed properties have dependencies on other properties. For
        example, in the above example, the `fullName` property depends on
        `firstName` and `lastName` to determine its value. You can tell Ember
        about these dependencies like this:
        
        ```javascript
        MyApp.President = Ember.Object.extend({
          firstName: '',
          lastName:  '',
        
          fullName: function() {
            return this.get('firstName') + ' ' + this.get('lastName');
        
            // Tell Ember.js that this computed property depends on firstName
            // and lastName
          }.property('firstName', 'lastName')
        });
        ```
        
        Make sure you list these dependencies so Ember knows when to update
        bindings that connect to a computed property. Changing a dependency
        will not immediately trigger an update of the computed property, but
        will instead clear the cache so that it is updated when the next `get`
        is called on the property.
        
        See [Ember.ComputedProperty](/api/classes/Ember.ComputedProperty.html), [Ember.computed](/api/classes/Ember.computed.html).
        */
        property(): any;
        /*
        The `observes` extension of Javascript's Function prototype is available
        when `EmberENV.EXTEND_PROTOTYPES` or `EmberENV.EXTEND_PROTOTYPES.Function` is
        true, which is the default.
        
        You can observe property changes simply by adding the `observes`
        call to the end of your method declarations in classes that you write.
        For example:
        
        ```javascript
        Ember.Object.extend({
          valueObserver: function() {
            // Executes whenever the "value" property changes
          }.observes('value')
        });
        ```
        
        In the future this method may become asynchronous.
        
        See `Ember.observer`.
        */
        observes(): any;
        /*
        The `on` extension of Javascript's Function prototype is available
        when `EmberENV.EXTEND_PROTOTYPES` or `EmberENV.EXTEND_PROTOTYPES.Function` is
        true, which is the default.
        
        You can listen for events simply by adding the `on` call to the end of
        your method declarations in classes or mixins that you write. For example:
        
        ```javascript
        Ember.Mixin.create({
          doSomethingWithElement: function() {
            // Executes whenever the "didInsertElement" event fires
          }.on('didInsertElement')
        });
        ```
        
        See `Ember.on`.
        */
        on(): any;
    }
}
