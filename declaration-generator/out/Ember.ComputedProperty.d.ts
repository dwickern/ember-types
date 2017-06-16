//packages/ember-metal/lib/computed.js
declare namespace Ember {
    /*
    A computed property transforms an object literal with object's accessor function(s) into a property.
    
    By default the function backing the computed property will only be called
    once and the result will be cached. You can specify various properties
    that your computed property depends on. This will force the cached
    result to be recomputed if the dependencies are modified.
    
    In the following example we declare a computed property - `fullName` - by calling
    `.Ember.computed()` with property dependencies (`firstName` and `lastName`) as leading arguments and getter accessor function. The `fullName` getter function
    will be called once (regardless of how many times it is accessed) as long
    as its dependencies have not changed. Once `firstName` or `lastName` are updated
    any future calls (or anything bound) to `fullName` will incorporate the new
    values.
    
    ```javascript
    let Person = Ember.Object.extend({
      // these will be supplied by `create`
      firstName: null,
      lastName: null,
    
      fullName: Ember.computed('firstName', 'lastName', function() {
        let firstName = this.get('firstName'),
            lastName  = this.get('lastName');
    
        return firstName + ' ' + lastName;
      })
    });
    
    let tom = Person.create({
      firstName: 'Tom',
      lastName: 'Dale'
    });
    
    tom.get('fullName') // 'Tom Dale'
    ```
    
    You can also define what Ember should do when setting a computed property by providing additional function (`set`) in hash argument.
    If you try to set a computed property, it will try to invoke setter accessor function with the key and
    value you want to set it to as arguments.
    
    ```javascript
    let Person = Ember.Object.extend({
      // these will be supplied by `create`
      firstName: null,
      lastName: null,
    
      fullName: Ember.computed('firstName', 'lastName', {
        get(key) {
          let firstName = this.get('firstName'),
              lastName  = this.get('lastName');
    
          return firstName + ' ' + lastName;
        },
        set(key, value) {
          let [firstName, lastName] = value.split(' ');
    
          this.set('firstName', firstName);
          this.set('lastName', lastName);
    
          return value;
        }
      })
    });
    
    let person = Person.create();
    
    person.set('fullName', 'Peter Wagenet');
    person.get('firstName'); // 'Peter'
    person.get('lastName');  // 'Wagenet'
    ```
    
    You can overwrite computed property with normal property (no longer computed), that won't change if dependencies change, if you set computed property and it won't have setter accessor function defined.
    
    You can also mark computed property as `.readOnly()` and block all attempts to set it.
    
    ```javascript
    let Person = Ember.Object.extend({
      // these will be supplied by `create`
      firstName: null,
      lastName: null,
    
      fullName: Ember.computed('firstName', 'lastName', {
        get(key) {
          let firstName = this.get('firstName');
          let lastName  = this.get('lastName');
    
          return firstName + ' ' + lastName;
        }
      }).readOnly()
    });
    
    let person = Person.create();
    person.set('fullName', 'Peter Wagenet'); // Uncaught Error: Cannot set read-only property "fullName" on object: <(...):emberXXX>
    ```
    
    Additional resources:
    - [New CP syntax RFC](https://github.com/emberjs/rfcs/blob/master/text/0011-improved-cp-syntax.md)
    - [New computed syntax explained in "Ember 1.12 released" ](https://emberjs.com/blog/2015/05/13/ember-1-12-released.html#toc_new-computed-syntax)
    */
    class ComputedProperty {
        /*
        Call on a computed property to set it into non-cached mode. When in this
        mode the computed property will not automatically cache the return value.
        
        It also does not automatically fire any change events. You must manually notify
        any changes if you want to observe this property.
        
        Dependency keys have no effect on volatile properties as they are for cache
        invalidation and notification when cached value is invalidated.
        
        ```javascript
        let outsideService = Ember.Object.extend({
          value: Ember.computed(function() {
            return OutsideService.getValue();
          }).volatile()
        }).create();
        ```
        */
        volatile(): Ember.ComputedProperty;
        /*
        Call on a computed property to set it into read-only mode. When in this
        mode the computed property will throw an error when set.
        
        ```javascript
        let Person = Ember.Object.extend({
          guid: Ember.computed(function() {
            return 'guid-guid-guid';
          }).readOnly()
        });
        
        let person = Person.create();
        
        person.set('guid', 'new-guid'); // will throw an exception
        ```
        */
        readOnly(): Ember.ComputedProperty;
        /*
        Sets the dependent keys on this computed property. Pass any number of
        arguments containing key paths that this computed property depends on.
        
        ```javascript
        let President = Ember.Object.extend({
          fullName: Ember.computed(function() {
            return this.get('firstName') + ' ' + this.get('lastName');
        
            // Tell Ember that this computed property depends on firstName
            // and lastName
          }).property('firstName', 'lastName')
        });
        
        let president = President.create({
          firstName: 'Barack',
          lastName: 'Obama'
        });
        
        president.get('fullName'); // 'Barack Obama'
        ```
        */
        property(...path: string[]): Ember.ComputedProperty;
        /*
        In some cases, you may want to annotate computed properties with additional
        metadata about how they function or what values they operate on. For example,
        computed property functions may close over variables that are then no longer
        available for introspection.
        
        You can pass a hash of these values to a computed property like this:
        
        ```
        person: Ember.computed(function() {
          let personId = this.get('personId');
          return App.Person.create({ id: personId });
        }).meta({ type: App.Person })
        ```
        
        The hash that you pass to the `meta()` function will be saved on the
        computed property descriptor under the `_meta` key. Ember runtime
        exposes a public API for retrieving these values from classes,
        via the `metaForProperty()` function.
        */
        meta(meta: any): any;
    }
}
