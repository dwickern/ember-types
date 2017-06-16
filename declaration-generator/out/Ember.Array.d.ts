//packages/ember-runtime/lib/mixins/array.js
declare namespace Ember {
    /*
    This mixin implements Observer-friendly Array-like behavior. It is not a
    concrete implementation, but it can be used up by other classes that want
    to appear like arrays.
    
    For example, ArrayProxy is a concrete classes that can
    be instantiated to implement array-like behavior. Both of these classes use
    the Array Mixin by way of the MutableArray mixin, which allows observable
    changes to be made to the underlying array.
    
    Unlike `Ember.Enumerable,` this mixin defines methods specifically for
    collections that provide index-ordered access to their contents. When you
    are designing code that needs to accept any kind of Array-like object, you
    should use these methods instead of Array primitives because these will
    properly notify observers of changes to the array.
    
    Although these methods are efficient, they do add a layer of indirection to
    your application so it is a good idea to use them only when you need the
    flexibility of using both true JavaScript arrays and "virtual" arrays such
    as controllers and collections.
    
    You can use the methods defined in this module to access and modify array
    contents in a KVO-friendly way. You can also be notified whenever the
    membership of an array changes by using `.observes('myArray.[]')`.
    
    To support `Ember.Array` in your own class, you must override two
    primitives to use it: `length()` and `objectAt()`.
    
    Note that the Ember.Array mixin also incorporates the `Ember.Enumerable`
    mixin. All `Ember.Array`-like objects are also enumerable.
    */
    class Array {
        /*
        __Required.__ You must implement this method to apply this mixin.
        
        Your array must support the `length` property. Your replace methods should
        set this property whenever it changes.
        */
        length: number;
        /*
        Returns the object at the given `index`. If the given `index` is negative
        or is greater or equal than the array length, returns `undefined`.
        
        This is one of the primitives you must implement to support `Ember.Array`.
        If your object supports retrieving the value of an array item using `get()`
        (i.e. `myArray.get(0)`), then you do not need to implement this method
        yourself.
        
        ```javascript
        let arr = ['a', 'b', 'c', 'd'];
        
        arr.objectAt(0);   // 'a'
        arr.objectAt(3);   // 'd'
        arr.objectAt(-1);  // undefined
        arr.objectAt(4);   // undefined
        arr.objectAt(5);   // undefined
        ```
        */
        objectAt(idx: number): any;
        /*
        This returns the objects at the specified indexes, using `objectAt`.
        
        ```javascript
        let arr = ['a', 'b', 'c', 'd'];
        
        arr.objectsAt([0, 1, 2]);  // ['a', 'b', 'c']
        arr.objectsAt([2, 3, 4]);  // ['c', 'd', undefined]
        ```
        */
        objectsAt(indexes: Array): Array;
        /*
        This is the handler for the special array content property. If you get
        this property, it will return this. If you set this property to a new
        array, it will replace the current content.
        
        This property overrides the default property defined in `Ember.Enumerable`.
        */
        "[]": any;
        /*
        Returns a new array that is a slice of the receiver. This implementation
        uses the observable array methods to retrieve the objects for the new
        slice.
        
        ```javascript
        let arr = ['red', 'green', 'blue'];
        
        arr.slice(0);       // ['red', 'green', 'blue']
        arr.slice(0, 2);    // ['red', 'green']
        arr.slice(1, 100);  // ['green', 'blue']
        ```
        */
        slice(beginIndex: number, endIndex: number): Array;
        /*
        Returns the index of the given object's first occurrence.
        If no `startAt` argument is given, the starting location to
        search is 0. If it's negative, will count backward from
        the end of the array. Returns -1 if no match is found.
        
        ```javascript
        let arr = ['a', 'b', 'c', 'd', 'a'];
        
        arr.indexOf('a');       //  0
        arr.indexOf('z');       // -1
        arr.indexOf('a', 2);    //  4
        arr.indexOf('a', -1);   //  4
        arr.indexOf('b', 3);    // -1
        arr.indexOf('a', 100);  // -1
        ```
        */
        indexOf(object: any, startAt: number): number;
        /*
        Returns the index of the given object's last occurrence.
        If no `startAt` argument is given, the search starts from
        the last position. If it's negative, will count backward
        from the end of the array. Returns -1 if no match is found.
        
        ```javascript
        let arr = ['a', 'b', 'c', 'd', 'a'];
        
        arr.lastIndexOf('a');       //  4
        arr.lastIndexOf('z');       // -1
        arr.lastIndexOf('a', 2);    //  0
        arr.lastIndexOf('a', -1);   //  4
        arr.lastIndexOf('b', 3);    //  1
        arr.lastIndexOf('a', 100);  //  4
        ```
        */
        lastIndexOf(object: any, startAt: number): number;
        /*
        Adds an array observer to the receiving array. The array observer object
        normally must implement two methods:
        
        * `arrayWillChange(observedObj, start, removeCount, addCount)` - This method will be
          called just before the array is modified.
        * `arrayDidChange(observedObj, start, removeCount, addCount)` - This method will be
          called just after the array is modified.
        
        Both callbacks will be passed the observed object, starting index of the
        change as well as a count of the items to be removed and added. You can use
        these callbacks to optionally inspect the array during the change, clear
        caches, or do any other bookkeeping necessary.
        
        In addition to passing a target, you can also include an options hash
        which you can use to override the method names that will be invoked on the
        target.
        */
        addArrayObserver(target: any, opts: any): Ember.Array;
        /*
        Removes an array observer from the object if the observer is current
        registered. Calling this method multiple times with the same object will
        have no effect.
        */
        removeArrayObserver(target: any, opts: any): Ember.Array;
        /*
        Becomes true whenever the array currently has observers watching changes
        on the array.
        */
        hasArrayObservers: boolean;
        /*
        If you are implementing an object that supports `Ember.Array`, call this
        method just before the array content changes to notify any observers and
        invalidate any related properties. Pass the starting index of the change
        as well as a delta of the amounts to change.
        */
        arrayContentWillChange(startIdx: number, removeAmt: number, addAmt: number): Ember.Array;
        /*
        If you are implementing an object that supports `Ember.Array`, call this
        method just after the array content changes to notify any observers and
        invalidate any related properties. Pass the starting index of the change
        as well as a delta of the amounts to change.
        */
        arrayContentDidChange(startIdx: number, removeAmt: number, addAmt: number): Ember.Array;
        /*
        Returns `true` if the passed object can be found in the array.
        This method is a Polyfill for ES 2016 Array.includes.
        If no `startAt` argument is given, the starting location to
        search is 0. If it's negative, searches from the index of
        `this.length + startAt` by asc.
        
        ```javascript
        [1, 2, 3].includes(2);     // true
        [1, 2, 3].includes(4);     // false
        [1, 2, 3].includes(3, 2);  // true
        [1, 2, 3].includes(3, 3);  // false
        [1, 2, 3].includes(3, -1); // true
        [1, 2, 3].includes(1, -1); // false
        [1, 2, 3].includes(1, -4); // true
        [1, 2, NaN].includes(NaN); // true
        ```
        */
        includes(obj: any, startAt: number): boolean;
        /*
        Returns a special object that can be used to observe individual properties
        on the array. Just get an equivalent property on this object and it will
        return an enumerable that maps automatically to the named key on the
        member objects.
        
        `@each` should only be used in a non-terminal context. Example:
        
        ```javascript
        myMethod: computed('posts.@each.author', function(){
          ...
        });
        ```
        
        If you merely want to watch for the array being changed, like an object being
        replaced, added or removed, use `[]` instead of `@each`.
        
        ```javascript
        myMethod: computed('posts.[]', function(){
          ...
        });
        ```
        */
        "@each": any;
    }
}
