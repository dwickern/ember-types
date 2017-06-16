//packages/ember-runtime/lib/mixins/mutable_array.js
declare namespace Ember {
    /*
    This mixin defines the API for modifying array-like objects. These methods
    can be applied only to a collection that keeps its items in an ordered set.
    It builds upon the Array mixin and adds methods to modify the array.
    One concrete implementations of this class include ArrayProxy.
    
    It is important to use the methods in this class to modify arrays so that
    changes are observable. This allows the binding system in Ember to function
    correctly.
    
    
    Note that an Array can change even if it does not implement this mixin.
    For example, one might implement a SparseArray that cannot be directly
    modified, but if its underlying enumerable changes, it will change also.
    */
    class MutableArray {
        /*
        __Required.__ You must implement this method to apply this mixin.
        
        This is one of the primitives you must implement to support `Ember.Array`.
        You should replace amt objects started at idx with the objects in the
        passed array. You should also call `this.enumerableContentDidChange()`
        */
        replace(idx: number, amt: number, objects: Array): any;
        /*
        Remove all elements from the array. This is useful if you
        want to reuse an existing array without having to recreate it.
        
        ```javascript
        let colors = ['red', 'green', 'blue'];
        
        colors.length;  // 3
        colors.clear(); // []
        colors.length;  // 0
        ```
        */
        clear(): Ember.Array;
        /*
        This will use the primitive `replace()` method to insert an object at the
        specified index.
        
        ```javascript
        let colors = ['red', 'green', 'blue'];
        
        colors.insertAt(2, 'yellow');  // ['red', 'green', 'yellow', 'blue']
        colors.insertAt(5, 'orange');  // Error: Index out of range
        ```
        */
        insertAt(idx: number, object: any): Ember.Array;
        /*
        Remove an object at the specified index using the `replace()` primitive
        method. You can pass either a single index, or a start and a length.
        
        If you pass a start and length that is beyond the
        length this method will throw an `OUT_OF_RANGE_EXCEPTION`.
        
        ```javascript
        let colors = ['red', 'green', 'blue', 'yellow', 'orange'];
        
        colors.removeAt(0);     // ['green', 'blue', 'yellow', 'orange']
        colors.removeAt(2, 2);  // ['green', 'blue']
        colors.removeAt(4, 2);  // Error: Index out of range
        ```
        */
        removeAt(start: number, len: number): Ember.Array;
        /*
        Push the object onto the end of the array. Works just like `push()` but it
        is KVO-compliant.
        
        ```javascript
        let colors = ['red', 'green'];
        
        colors.pushObject('black');     // ['red', 'green', 'black']
        colors.pushObject(['yellow']);  // ['red', 'green', ['yellow']]
        ```
        */
        pushObject(obj: any): any;
        /*
        Add the objects in the passed numerable to the end of the array. Defers
        notifying observers of the change until all objects are added.
        
        ```javascript
        let colors = ['red'];
        
        colors.pushObjects(['yellow', 'orange']);  // ['red', 'yellow', 'orange']
        ```
        */
        pushObjects(objects: Ember.Enumerable): Ember.Array;
        /*
        Pop object from array or nil if none are left. Works just like `pop()` but
        it is KVO-compliant.
        
        ```javascript
        let colors = ['red', 'green', 'blue'];
        
        colors.popObject();   // 'blue'
        console.log(colors);  // ['red', 'green']
        ```
        */
        popObject(): any;
        /*
        Shift an object from start of array or nil if none are left. Works just
        like `shift()` but it is KVO-compliant.
        
        ```javascript
        let colors = ['red', 'green', 'blue'];
        
        colors.shiftObject();  // 'red'
        console.log(colors);   // ['green', 'blue']
        ```
        */
        shiftObject(): any;
        /*
        Unshift an object to start of array. Works just like `unshift()` but it is
        KVO-compliant.
        
        ```javascript
        let colors = ['red'];
        
        colors.unshiftObject('yellow');    // ['yellow', 'red']
        colors.unshiftObject(['black']);   // [['black'], 'yellow', 'red']
        ```
        */
        unshiftObject(obj: any): any;
        /*
        Adds the named objects to the beginning of the array. Defers notifying
        observers until all objects have been added.
        
        ```javascript
        let colors = ['red'];
        
        colors.unshiftObjects(['black', 'white']);   // ['black', 'white', 'red']
        colors.unshiftObjects('yellow'); // Type Error: 'undefined' is not a function
        ```
        */
        unshiftObjects(objects: Ember.Enumerable): Ember.Array;
        /*
        Reverse objects in the array. Works just like `reverse()` but it is
        KVO-compliant.
        */
        reverseObjects(): Ember.Array;
        /*
        Replace all the receiver's content with content of the argument.
        If argument is an empty array receiver will be cleared.
        
        ```javascript
        let colors = ['red', 'green', 'blue'];
        
        colors.setObjects(['black', 'white']);  // ['black', 'white']
        colors.setObjects([]);                  // []
        ```
        */
        setObjects(objects: Ember.Array): Ember.Array;
        /*
        Remove all occurrences of an object in the array.
        
        ```javascript
        let cities = ['Chicago', 'Berlin', 'Lima', 'Chicago'];
        
        cities.removeObject('Chicago');  // ['Berlin', 'Lima']
        cities.removeObject('Lima');     // ['Berlin']
        cities.removeObject('Tokyo')     // ['Berlin']
        ```
        */
        removeObject(obj: any): Ember.Array;
        /*
        Push the object onto the end of the array if it is not already
        present in the array.
        
        ```javascript
        let cities = ['Chicago', 'Berlin'];
        
        cities.addObject('Lima');    // ['Chicago', 'Berlin', 'Lima']
        cities.addObject('Berlin');  // ['Chicago', 'Berlin', 'Lima']
        ```
        */
        addObject(obj: any): Ember.Array;
    }
}
