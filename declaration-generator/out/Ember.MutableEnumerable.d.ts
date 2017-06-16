//packages/ember-runtime/lib/mixins/mutable_enumerable.js
declare namespace Ember {
    /*
    This mixin defines the API for modifying generic enumerables. These methods
    can be applied to an object regardless of whether it is ordered or
    unordered.
    
    Note that an Enumerable can change even if it does not implement this mixin.
    For example, a MappedEnumerable cannot be directly modified but if its
    underlying enumerable changes, it will change also.
    
    ## Adding Objects
    
    To add an object to an enumerable, use the `addObject()` method. This
    method will only add the object to the enumerable if the object is not
    already present and is of a type supported by the enumerable.
    
    ```javascript
    set.addObject(contact);
    ```
    
    ## Removing Objects
    
    To remove an object from an enumerable, use the `removeObject()` method. This
    will only remove the object if it is present in the enumerable, otherwise
    this method has no effect.
    
    ```javascript
    set.removeObject(contact);
    ```
    
    ## Implementing In Your Own Code
    
    If you are implementing an object and want to support this API, just include
    this mixin in your class and implement the required methods. In your unit
    tests, be sure to apply the Ember.MutableEnumerableTests to your object.
    */
    class MutableEnumerable {
        /*
        __Required.__ You must implement this method to apply this mixin.
        
        Attempts to add the passed object to the receiver if the object is not
        already present in the collection. If the object is present, this method
        has no effect.
        
        If the passed object is of a type not supported by the receiver,
        then this method should raise an exception.
        */
        addObject(object: any): any;
        /*
        Adds each object in the passed enumerable to the receiver.
        */
        addObjects(objects: Ember.Enumerable): any;
        /*
        __Required.__ You must implement this method to apply this mixin.
        
        Attempts to remove the passed object from the receiver collection if the
        object is present in the collection. If the object is not present,
        this method has no effect.
        
        If the passed object is of a type not supported by the receiver,
        then this method should raise an exception.
        */
        removeObject(object: any): any;
        /*
        Removes each object in the passed enumerable from the receiver.
        */
        removeObjects(objects: Ember.Enumerable): any;
    }
}
