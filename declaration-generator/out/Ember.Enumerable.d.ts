//packages/ember-runtime/lib/mixins/enumerable.js
declare namespace Ember {
    /*
    This mixin defines the common interface implemented by enumerable objects
    in Ember. Most of these methods follow the standard Array iteration
    API defined up to JavaScript 1.8 (excluding language-specific features that
    cannot be emulated in older versions of JavaScript).
    
    This mixin is applied automatically to the Array class on page load, so you
    can use any of these methods on simple arrays. If Array already implements
    one of these methods, the mixin will not override them.
    
    ## Writing Your Own Enumerable
    
    To make your own custom class enumerable, you need two items:
    
    1. You must have a length property. This property should change whenever
       the number of items in your enumerable object changes. If you use this
       with an `Ember.Object` subclass, you should be sure to change the length
       property using `set().`
    
    2. You must implement `nextObject().` See documentation.
    
    Once you have these two methods implemented, apply the `Ember.Enumerable` mixin
    to your class and you will be able to enumerate the contents of your object
    like any other collection.
    
    ## Using Ember Enumeration with Other Libraries
    
    Many other libraries provide some kind of iterator or enumeration like
    facility. This is often where the most common API conflicts occur.
    Ember's API is designed to be as friendly as possible with other
    libraries by implementing only methods that mostly correspond to the
    JavaScript 1.8 API.
    */
    private class Enumerable {
        /*
        Helper method returns the first object from a collection. This is usually
        used by bindings and other parts of the framework to extract a single
        object if the enumerable contains only one item.
        
        If you override this method, you should implement it so that it will
        always return the same value each time it is called. If your enumerable
        contains only one object, this method should always return that object.
        If your enumerable is empty, this method should return `undefined`.
        
        ```javascript
        let arr = ['a', 'b', 'c'];
        arr.get('firstObject');  // 'a'
        
        let arr = [];
        arr.get('firstObject');  // undefined
        ```
        */
        firstObject: any;
        /*
        Helper method returns the last object from a collection. If your enumerable
        contains only one object, this method should always return that object.
        If your enumerable is empty, this method should return `undefined`.
        
        ```javascript
        let arr = ['a', 'b', 'c'];
        arr.get('lastObject');  // 'c'
        
        let arr = [];
        arr.get('lastObject');  // undefined
        ```
        */
        lastObject: any;
        /*
        Returns `true` if the passed object can be found in the receiver. The
        default version will iterate through the enumerable until the object
        is found. You may want to override this with a more efficient version.
        
        ```javascript
        let arr = ['a', 'b', 'c'];
        
        arr.contains('a'); // true
        arr.contains('z'); // false
        ```
        */
        contains(obj: any): boolean;
        /*
        Iterates through the enumerable, calling the passed function on each
        item. This method corresponds to the `forEach()` method defined in
        JavaScript 1.6.
        
        The callback method you provide should have the following signature (all
        parameters are optional):
        
        ```javascript
        function(item, index, enumerable);
        ```
        
        - `item` is the current item in the iteration.
        - `index` is the current index in the iteration.
        - `enumerable` is the enumerable object itself.
        
        Note that in addition to a callback, you can also pass an optional target
        object that will be set as `this` on the context. This is a good way
        to give your iterator function access to the current object.
        */
        forEach(callback: Function, target: any): any;
        /*
        Alias for `mapBy`
        */
        getEach(key: string): Array;
        /*
        Sets the value on the named property for each member. This is more
        ergonomic than using other methods defined on this helper. If the object
        implements Ember.Observable, the value will be changed to `set(),` otherwise
        it will be set directly. `null` objects are skipped.
        */
        setEach(key: string, value: any): any;
        /*
        Maps all of the items in the enumeration to another value, returning
        a new array. This method corresponds to `map()` defined in JavaScript 1.6.
        
        The callback method you provide should have the following signature (all
        parameters are optional):
        
        ```javascript
        function(item, index, enumerable);
        ```
        
        - `item` is the current item in the iteration.
        - `index` is the current index in the iteration.
        - `enumerable` is the enumerable object itself.
        
        It should return the mapped value.
        
        Note that in addition to a callback, you can also pass an optional target
        object that will be set as `this` on the context. This is a good way
        to give your iterator function access to the current object.
        */
        map(callback: Function, target: any): Array;
        /*
        Similar to map, this specialized function returns the value of the named
        property on all items in the enumeration.
        */
        mapBy(key: string): Array;
        /*
        Returns an array with all of the items in the enumeration that the passed
        function returns true for. This method corresponds to `filter()` defined in
        JavaScript 1.6.
        
        The callback method you provide should have the following signature (all
        parameters are optional):
        
        ```javascript
        function(item, index, enumerable);
        ```
        
        - `item` is the current item in the iteration.
        - `index` is the current index in the iteration.
        - `enumerable` is the enumerable object itself.
        
        It should return `true` to include the item in the results, `false`
        otherwise.
        
        Note that in addition to a callback, you can also pass an optional target
        object that will be set as `this` on the context. This is a good way
        to give your iterator function access to the current object.
        */
        filter(callback: Function, target: any): Array;
        /*
        Returns an array with all of the items in the enumeration where the passed
        function returns false. This method is the inverse of filter().
        
        The callback method you provide should have the following signature (all
        parameters are optional):
        
        ```javascript
        function(item, index, enumerable);
        ```
        
        - *item* is the current item in the iteration.
        - *index* is the current index in the iteration
        - *enumerable* is the enumerable object itself.
        
        It should return a falsey value to include the item in the results.
        
        Note that in addition to a callback, you can also pass an optional target
        object that will be set as "this" on the context. This is a good way
        to give your iterator function access to the current object.
        */
        reject(callback: Function, target: any): Array;
        /*
        Returns an array with just the items with the matched property. You
        can pass an optional second argument with the target value. Otherwise
        this will match any property that evaluates to `true`.
        */
        filterBy(key: string, value: any): Array;
        /*
        Returns an array with the items that do not have truthy values for
        key.  You can pass an optional second argument with the target value.  Otherwise
        this will match any property that evaluates to false.
        */
        rejectBy(key: string, value: string): Array;
        /*
        Returns the first item in the array for which the callback returns true.
        This method works similar to the `filter()` method defined in JavaScript 1.6
        except that it will stop working on the array once a match is found.
        
        The callback method you provide should have the following signature (all
        parameters are optional):
        
        ```javascript
        function(item, index, enumerable);
        ```
        
        - `item` is the current item in the iteration.
        - `index` is the current index in the iteration.
        - `enumerable` is the enumerable object itself.
        
        It should return the `true` to include the item in the results, `false`
        otherwise.
        
        Note that in addition to a callback, you can also pass an optional target
        object that will be set as `this` on the context. This is a good way
        to give your iterator function access to the current object.
        */
        find(callback: Function, target: any): any;
        /*
        Returns the first item with a property matching the passed value. You
        can pass an optional second argument with the target value. Otherwise
        this will match any property that evaluates to `true`.
        
        This method works much like the more generic `find()` method.
        */
        findBy(key: string, value: string): any;
        /*
        Returns `true` if the passed function returns true for every item in the
        enumeration. This corresponds with the `every()` method in JavaScript 1.6.
        
        The callback method you provide should have the following signature (all
        parameters are optional):
        
        ```javascript
        function(item, index, enumerable);
        ```
        
        - `item` is the current item in the iteration.
        - `index` is the current index in the iteration.
        - `enumerable` is the enumerable object itself.
        
        It should return the `true` or `false`.
        
        Note that in addition to a callback, you can also pass an optional target
        object that will be set as `this` on the context. This is a good way
        to give your iterator function access to the current object.
        
        Example Usage:
        
        ```javascript
        if (people.every(isEngineer)) {
          Paychecks.addBigBonus();
        }
        ```
        */
        every(callback: Function, target: any): boolean;
        /*
        Returns `true` if the passed property resolves to the value of the second
        argument for all items in the enumerable. This method is often simpler/faster
        than using a callback.
        */
        isEvery(key: string, value: string): boolean;
        /*
        Returns `true` if the passed function returns true for any item in the
        enumeration. This corresponds with the `some()` method in JavaScript 1.6.
        
        The callback method you provide should have the following signature (all
        parameters are optional):
        
        ```javascript
        function(item, index, enumerable);
        ```
        
        - `item` is the current item in the iteration.
        - `index` is the current index in the iteration.
        - `enumerable` is the enumerable object itself.
        
        It should return the `true` to include the item in the results, `false`
        otherwise.
        
        Note that in addition to a callback, you can also pass an optional target
        object that will be set as `this` on the context. This is a good way
        to give your iterator function access to the current object.
        
        Usage Example:
        
        ```javascript
        if (people.any(isManager)) {
          Paychecks.addBiggerBonus();
        }
        ```
        */
        any(callback: Function, target: any): boolean;
        /*
        Returns `true` if the passed property resolves to the value of the second
        argument for any item in the enumerable. This method is often simpler/faster
        than using a callback.
        */
        isAny(key: string, value: string): boolean;
        /*
        This will combine the values of the enumerator into a single value. It
        is a useful way to collect a summary value from an enumeration. This
        corresponds to the `reduce()` method defined in JavaScript 1.8.
        
        The callback method you provide should have the following signature (all
        parameters are optional):
        
        ```javascript
        function(previousValue, item, index, enumerable);
        ```
        
        - `previousValue` is the value returned by the last call to the iterator.
        - `item` is the current item in the iteration.
        - `index` is the current index in the iteration.
        - `enumerable` is the enumerable object itself.
        
        Return the new cumulative value.
        
        In addition to the callback you can also pass an `initialValue`. An error
        will be raised if you do not pass an initial value and the enumerator is
        empty.
        
        Note that unlike the other methods, this method does not allow you to
        pass a target object to set as this for the callback. It's part of the
        spec. Sorry.
        */
        reduce(callback: Function, initialValue: any, reducerProperty: string): any;
        /*
        Invokes the named method on every object in the receiver that
        implements it. This method corresponds to the implementation in
        Prototype 1.6.
        */
        invoke(methodName: string, ...args: any[]): Array;
        /*
        Simply converts the enumerable into a genuine array. The order is not
        guaranteed. Corresponds to the method implemented by Prototype.
        */
        toArray(): Array;
        /*
        Returns a copy of the array with all `null` and `undefined` elements removed.
        
        ```javascript
        let arr = ['a', null, 'c', undefined];
        arr.compact();  // ['a', 'c']
        ```
        */
        compact(): Array;
        /*
        Returns a new enumerable that excludes the passed value. The default
        implementation returns an array regardless of the receiver type.
        If the receiver does not contain the value it returns the original enumerable.
        
        ```javascript
        let arr = ['a', 'b', 'a', 'c'];
        arr.without('a');  // ['b', 'c']
        ```
        */
        without(value: any): Ember.Enumerable;
        /*
        Returns a new enumerable that contains only unique values. The default
        implementation returns an array regardless of the receiver type.
        
        ```javascript
        let arr = ['a', 'a', 'b', 'b'];
        arr.uniq();  // ['a', 'b']
        ```
        
        This only works on primitive data types, e.g. Strings, Numbers, etc.
        */
        uniq(): Ember.Enumerable;
        /*
        Converts the enumerable into an array and sorts by the keys
        specified in the argument.
        
        You may provide multiple arguments to sort by multiple properties.
        */
        sortBy(property: string): Array;
        /*
        Returns a new enumerable that contains only items containing a unique property value.
        The default implementation returns an array regardless of the receiver type.
        
        ```javascript
        let arr = [{ value: 'a' }, { value: 'a' }, { value: 'b' }, { value: 'b' }];
        arr.uniqBy('value');  // [{ value: 'a' }, { value: 'b' }]
        ```
        */
        uniqBy(): Ember.Enumerable;
        /*
        Returns `true` if the passed object can be found in the enumerable.
        
        ```javascript
        [1, 2, 3].includes(2);                     // true
        [1, 2, 3].includes(4);                     // false
        [1, 2, undefined].includes(undefined);     // true
        [1, 2, null].includes(null);               // true
        [1, 2, NaN].includes(NaN);                 // true
        ```
        */
        includes(obj: any): boolean;
    }
}
