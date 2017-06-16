//packages/ember-metal/lib/computed.js
declare namespace Ember {
    /*
    This helper returns a new property descriptor that wraps the passed
    computed property function. You can use this helper to define properties
    with mixins or via `Ember.defineProperty()`.
    
    If you pass a function as an argument, it will be used as a getter. A computed
    property defined in this way might look like this:
    
    ```js
    let Person = Ember.Object.extend({
      init() {
        this._super(...arguments);
    
        this.firstName = 'Betty';
        this.lastName = 'Jones';
      },
    
      fullName: Ember.computed('firstName', 'lastName', function() {
        return `${this.get('firstName')} ${this.get('lastName')}`;
      })
    });
    
    let client = Person.create();
    
    client.get('fullName'); // 'Betty Jones'
    
    client.set('lastName', 'Fuller');
    client.get('fullName'); // 'Betty Fuller'
    ```
    
    You can pass a hash with two functions, `get` and `set`, as an
    argument to provide both a getter and setter:
    
    ```js
    let Person = Ember.Object.extend({
      init() {
        this._super(...arguments);
    
        this.firstName = 'Betty';
        this.lastName = 'Jones';
      },
    
      fullName: Ember.computed('firstName', 'lastName', {
        get(key) {
          return `${this.get('firstName')} ${this.get('lastName')}`;
        },
        set(key, value) {
          let [firstName, lastName] = value.split(/\s+/);
          this.setProperties({ firstName, lastName });
          return value;
        }
      })
    });
    
    let client = Person.create();
    client.get('firstName'); // 'Betty'
    
    client.set('fullName', 'Carroll Fuller');
    client.get('firstName'); // 'Carroll'
    ```
    
    The `set` function should accept two parameters, `key` and `value`. The value
    returned from `set` will be the new value of the property.
    
    _Note: This is the preferred way to define computed properties when writing third-party
    libraries that depend on or use Ember, since there is no guarantee that the user
    will have [prototype Extensions](https://emberjs.com/guides/configuring-ember/disabling-prototype-extensions/) enabled._
    
    The alternative syntax, with prototype extensions, might look like:
    
    ```js
    fullName: function() {
      return this.get('firstName') + ' ' + this.get('lastName');
    }.property('firstName', 'lastName')
    ```
    */
    class computed {
        /*
        A computed property that returns true if the value of the dependent
        property is null, an empty string, empty array, or empty function.
        
        Example
        
        ```javascript
        let ToDoList = Ember.Object.extend({
          isDone: Ember.computed.empty('todos')
        });
        
        let todoList = ToDoList.create({
          todos: ['Unit Test', 'Documentation', 'Release']
        });
        
        todoList.get('isDone'); // false
        todoList.get('todos').clear();
        todoList.get('isDone'); // true
        ```
        */
        empty(dependentKey: string): Ember.ComputedProperty;
        /*
        A computed property that returns the sum of the values
        in the dependent array.
        */
        sum(dependentKey: string): Ember.ComputedProperty;
        /*
        A computed property that calculates the maximum value in the
        dependent array. This will return `-Infinity` when the dependent
        array is empty.
        
        ```javascript
        let Person = Ember.Object.extend({
          childAges: Ember.computed.mapBy('children', 'age'),
          maxChildAge: Ember.computed.max('childAges')
        });
        
        let lordByron = Person.create({ children: [] });
        
        lordByron.get('maxChildAge'); // -Infinity
        lordByron.get('children').pushObject({
          name: 'Augusta Ada Byron', age: 7
        });
        lordByron.get('maxChildAge'); // 7
        lordByron.get('children').pushObjects([{
          name: 'Allegra Byron',
          age: 5
        }, {
          name: 'Elizabeth Medora Leigh',
          age: 8
        }]);
        lordByron.get('maxChildAge'); // 8
        ```
        
        If the types of the arguments are not numbers,
        they will be converted to numbers and the type
        of the return value will always be `Number`.
        For example, the max of a list of Date objects will be
        the highest timestamp as a `Number`.
        This behavior is consistent with `Math.max`.
        */
        max(dependentKey: string): Ember.ComputedProperty;
        /*
        A computed property that returns true if the value of the dependent
        property is NOT null, an empty string, empty array, or empty function.
        
        Example
        
        ```javascript
        let Hamster = Ember.Object.extend({
          hasStuff: Ember.computed.notEmpty('backpack')
        });
        
        let hamster = Hamster.create({ backpack: ['Food', 'Sleeping Bag', 'Tent'] });
        
        hamster.get('hasStuff');         // true
        hamster.get('backpack').clear(); // []
        hamster.get('hasStuff');         // false
        ```
        */
        notEmpty(dependentKey: string): Ember.ComputedProperty;
        /*
        A computed property that returns true if the value of the dependent
        property is null or undefined. This avoids errors from JSLint complaining
        about use of ==, which can be technically confusing.
        
        Example
        
        ```javascript
        let Hamster = Ember.Object.extend({
          isHungry: Ember.computed.none('food')
        });
        
        let hamster = Hamster.create();
        
        hamster.get('isHungry'); // true
        hamster.set('food', 'Banana');
        hamster.get('isHungry'); // false
        hamster.set('food', null);
        hamster.get('isHungry'); // true
        ```
        */
        none(dependentKey: string): Ember.ComputedProperty;
        /*
        A computed property that calculates the minimum value in the
        dependent array. This will return `Infinity` when the dependent
        array is empty.
        
        ```javascript
        let Person = Ember.Object.extend({
          childAges: Ember.computed.mapBy('children', 'age'),
          minChildAge: Ember.computed.min('childAges')
        });
        
        let lordByron = Person.create({ children: [] });
        
        lordByron.get('minChildAge'); // Infinity
        lordByron.get('children').pushObject({
          name: 'Augusta Ada Byron', age: 7
        });
        lordByron.get('minChildAge'); // 7
        lordByron.get('children').pushObjects([{
          name: 'Allegra Byron',
          age: 5
        }, {
          name: 'Elizabeth Medora Leigh',
          age: 8
        }]);
        lordByron.get('minChildAge'); // 5
        ```
        
        If the types of the arguments are not numbers,
        they will be converted to numbers and the type
        of the return value will always be `Number`.
        For example, the min of a list of Date objects will be
        the lowest timestamp as a `Number`.
        This behavior is consistent with `Math.min`.
        */
        min(dependentKey: string): Ember.ComputedProperty;
        /*
        A computed property that returns the inverse boolean value
        of the original value for the dependent property.
        
        Example
        
        ```javascript
        let User = Ember.Object.extend({
          isAnonymous: Ember.computed.not('loggedIn')
        });
        
        let user = User.create({loggedIn: false});
        
        user.get('isAnonymous'); // true
        user.set('loggedIn', true);
        user.get('isAnonymous'); // false
        ```
        */
        not(dependentKey: string): Ember.ComputedProperty;
        /*
        Returns an array mapped via the callback
        
        The callback method you provide should have the following signature.
        `item` is the current item in the iteration.
        `index` is the integer index of the current item in the iteration.
        
        ```javascript
        function(item, index);
        ```
        
        Example
        
        ```javascript
        let Hamster = Ember.Object.extend({
          excitingChores: Ember.computed.map('chores', function(chore, index) {
            return chore.toUpperCase() + '!';
          })
        });
        
        let hamster = Hamster.create({
          chores: ['clean', 'write more unit tests']
        });
        
        hamster.get('excitingChores'); // ['CLEAN!', 'WRITE MORE UNIT TESTS!']
        ```
        */
        map(dependentKey: string, callback: Function): Ember.ComputedProperty;
        /*
        A computed property that converts the provided dependent property
        into a boolean value.
        
        ```javascript
        let Hamster = Ember.Object.extend({
          hasBananas: Ember.computed.bool('numBananas')
        });
        
        let hamster = Hamster.create();
        
        hamster.get('hasBananas'); // false
        hamster.set('numBananas', 0);
        hamster.get('hasBananas'); // false
        hamster.set('numBananas', 1);
        hamster.get('hasBananas'); // true
        hamster.set('numBananas', null);
        hamster.get('hasBananas'); // false
        ```
        */
        bool(dependentKey: string): Ember.ComputedProperty;
        /*
        Returns an array mapped to the specified key.
        
        ```javascript
        let Person = Ember.Object.extend({
          childAges: Ember.computed.mapBy('children', 'age')
        });
        
        let lordByron = Person.create({ children: [] });
        
        lordByron.get('childAges'); // []
        lordByron.get('children').pushObject({ name: 'Augusta Ada Byron', age: 7 });
        lordByron.get('childAges'); // [7]
        lordByron.get('children').pushObjects([{
          name: 'Allegra Byron',
          age: 5
        }, {
          name: 'Elizabeth Medora Leigh',
          age: 8
        }]);
        lordByron.get('childAges'); // [7, 5, 8]
        ```
        */
        mapBy(dependentKey: string, propertyKey: string): Ember.ComputedProperty;
        /*
        A computed property which matches the original value for the
        dependent property against a given RegExp, returning `true`
        if the value matches the RegExp and `false` if it does not.
        
        Example
        
        ```javascript
        let User = Ember.Object.extend({
          hasValidEmail: Ember.computed.match('email', /^.+@.+\..+$/)
        });
        
        let user = User.create({loggedIn: false});
        
        user.get('hasValidEmail'); // false
        user.set('email', '');
        user.get('hasValidEmail'); // false
        user.set('email', 'ember_hamster@example.com');
        user.get('hasValidEmail'); // true
        ```
        */
        match(dependentKey: string, regexp: RegExp): Ember.ComputedProperty;
        /*
        Filters the array by the callback.
        
        The callback method you provide should have the following signature.
        `item` is the current item in the iteration.
        `index` is the integer index of the current item in the iteration.
        `array` is the dependant array itself.
        
        ```javascript
        function(item, index, array);
        ```
        
        ```javascript
        let Hamster = Ember.Object.extend({
          remainingChores: Ember.computed.filter('chores', function(chore, index, array) {
            return !chore.done;
          })
        });
        
        let hamster = Hamster.create({
          chores: [
            { name: 'cook', done: true },
            { name: 'clean', done: true },
            { name: 'write more unit tests', done: false }
          ]
        });
        
        hamster.get('remainingChores'); // [{name: 'write more unit tests', done: false}]
        ```
        
        You can also use `@each.property` in your dependent key, the callback will still use the underlying array:
        
        ```javascript
        let Hamster = Ember.Object.extend({
          remainingChores: Ember.computed.filter('chores.@each.done', function(chore, index, array) {
            return !chore.get('done');
          })
        });
        
        let hamster = Hamster.create({
          chores: Ember.A([
            Ember.Object.create({ name: 'cook', done: true }),
            Ember.Object.create({ name: 'clean', done: true }),
            Ember.Object.create({ name: 'write more unit tests', done: false })
          ])
        });
        hamster.get('remainingChores'); // [{name: 'write more unit tests', done: false}]
        hamster.get('chores').objectAt(2).set('done', true);
        hamster.get('remainingChores'); // []
        ```
        */
        filter(dependentKey: string, callback: Function): Ember.ComputedProperty;
        /*
        A computed property that returns true if the provided dependent property
        is equal to the given value.
        
        Example
        
        ```javascript
        let Hamster = Ember.Object.extend({
          satisfied: Ember.computed.equal('percentCarrotsEaten', 100)
        });
        
        let hamster = Hamster.create();
        
        hamster.get('satisfied'); // false
        hamster.set('percentCarrotsEaten', 100);
        hamster.get('satisfied'); // true
        hamster.set('percentCarrotsEaten', 50);
        hamster.get('satisfied'); // false
        ```
        */
        equal(dependentKey: string, value: string | number | any): Ember.ComputedProperty;
        /*
        A computed property that returns true if the provided dependent property
        is greater than the provided value.
        
        Example
        
        ```javascript
        let Hamster = Ember.Object.extend({
          hasTooManyBananas: Ember.computed.gt('numBananas', 10)
        });
        
        let hamster = Hamster.create();
        
        hamster.get('hasTooManyBananas'); // false
        hamster.set('numBananas', 3);
        hamster.get('hasTooManyBananas'); // false
        hamster.set('numBananas', 11);
        hamster.get('hasTooManyBananas'); // true
        ```
        */
        gt(dependentKey: string, value: number): Ember.ComputedProperty;
        /*
        Filters the array by the property and value
        
        ```javascript
        let Hamster = Ember.Object.extend({
          remainingChores: Ember.computed.filterBy('chores', 'done', false)
        });
        
        let hamster = Hamster.create({
          chores: [
            { name: 'cook', done: true },
            { name: 'clean', done: true },
            { name: 'write more unit tests', done: false }
          ]
        });
        
        hamster.get('remainingChores'); // [{ name: 'write more unit tests', done: false }]
        ```
        */
        filterBy(dependentKey: string, propertyKey: string, value: any): Ember.ComputedProperty;
        /*
        A computed property that returns true if the provided dependent property
        is greater than or equal to the provided value.
        
        Example
        
        ```javascript
        let Hamster = Ember.Object.extend({
          hasTooManyBananas: Ember.computed.gte('numBananas', 10)
        });
        
        let hamster = Hamster.create();
        
        hamster.get('hasTooManyBananas'); // false
        hamster.set('numBananas', 3);
        hamster.get('hasTooManyBananas'); // false
        hamster.set('numBananas', 10);
        hamster.get('hasTooManyBananas'); // true
        ```
        */
        gte(dependentKey: string, value: number): Ember.ComputedProperty;
        /*
        A computed property which returns a new array with all the unique
        elements from one or more dependent arrays.
        
        Example
        
        ```javascript
        let Hamster = Ember.Object.extend({
          uniqueFruits: Ember.computed.uniq('fruits')
        });
        
        let hamster = Hamster.create({
          fruits: [
            'banana',
            'grape',
            'kale',
            'banana'
          ]
        });
        
        hamster.get('uniqueFruits'); // ['banana', 'grape', 'kale']
        ```
        */
        uniq(...propertyKey: string[]): Ember.ComputedProperty;
        /*
        A computed property that returns true if the provided dependent property
        is less than the provided value.
        
        Example
        
        ```javascript
        let Hamster = Ember.Object.extend({
          needsMoreBananas: Ember.computed.lt('numBananas', 3)
        });
        
        let hamster = Hamster.create();
        
        hamster.get('needsMoreBananas'); // true
        hamster.set('numBananas', 3);
        hamster.get('needsMoreBananas'); // false
        hamster.set('numBananas', 2);
        hamster.get('needsMoreBananas'); // true
        ```
        */
        lt(dependentKey: string, value: number): Ember.ComputedProperty;
        /*
        A computed property that returns true if the provided dependent property
        is less than or equal to the provided value.
        
        Example
        
        ```javascript
        let Hamster = Ember.Object.extend({
          needsMoreBananas: Ember.computed.lte('numBananas', 3)
        });
        
        let hamster = Hamster.create();
        
        hamster.get('needsMoreBananas'); // true
        hamster.set('numBananas', 5);
        hamster.get('needsMoreBananas'); // false
        hamster.set('numBananas', 3);
        hamster.get('needsMoreBananas'); // true
        ```
        */
        lte(dependentKey: string, value: number): Ember.ComputedProperty;
        /*
        A computed property which returns a new array with all the unique
        elements from an array, with uniqueness determined by specific key.
        
        Example
        
        ```javascript
        let Hamster = Ember.Object.extend({
          uniqueFruits: Ember.computed.uniqBy('fruits', 'id')
        });
        let hamster = Hamster.create({
          fruits: [
            { id: 1, 'banana' },
            { id: 2, 'grape' },
            { id: 3, 'peach' },
            { id: 1, 'banana' }
          ]
        });
        hamster.get('uniqueFruits'); // [ { id: 1, 'banana' }, { id: 2, 'grape' }, { id: 3, 'peach' }]
        ```
        */
        uniqBy(dependentKey: string, propertyKey: string): Ember.ComputedProperty;
        /*
        A computed property that performs a logical `and` on the
        original values for the provided dependent properties.
        
        You may pass in more than two properties and even use
        property brace expansion.  The computed property will
        return the first falsy value or last truthy value
        just like JavaScript's `&&` operator.
        
        Example
        
        ```javascript
        let Hamster = Ember.Object.extend({
          readyForCamp: Ember.computed.and('hasTent', 'hasBackpack'),
          readyForHike: Ember.computed.and('hasWalkingStick', 'hasBackpack')
        });
        
        let tomster = Hamster.create();
        
        tomster.get('readyForCamp'); // false
        tomster.set('hasTent', true);
        tomster.get('readyForCamp'); // false
        tomster.set('hasBackpack', true);
        tomster.get('readyForCamp'); // true
        tomster.set('hasBackpack', 'Yes');
        tomster.get('readyForCamp'); // 'Yes'
        tomster.set('hasWalkingStick', null);
        tomster.get('readyForHike'); // null
        ```
        */
        and(...dependentKey: string[]): Ember.ComputedProperty;
        /*
        A computed property which returns a new array with all the unique
        elements from one or more dependent arrays.
        
        Example
        
        ```javascript
        let Hamster = Ember.Object.extend({
          uniqueFruits: Ember.computed.union('fruits', 'vegetables')
        });
        
        let hamster = Hamster.create({
          fruits: [
            'banana',
            'grape',
            'kale',
            'banana',
            'tomato'
          ],
          vegetables: [
            'tomato',
            'carrot',
            'lettuce'
          ]
        });
        
        hamster.get('uniqueFruits'); // ['banana', 'grape', 'kale', 'tomato', 'carrot', 'lettuce']
        ```
        */
        union(...propertyKey: string[]): Ember.ComputedProperty;
        /*
        A computed property which performs a logical `or` on the
        original values for the provided dependent properties.
        
        You may pass in more than two properties and even use
        property brace expansion.  The computed property will
        return the first truthy value or last falsy value just
        like JavaScript's `||` operator.
        
        Example
        
        ```javascript
        let Hamster = Ember.Object.extend({
          readyForRain: Ember.computed.or('hasJacket', 'hasUmbrella'),
          readyForBeach: Ember.computed.or('{hasSunscreen,hasUmbrella}')
        });
        
        let tomster = Hamster.create();
        
        tomster.get('readyForRain'); // undefined
        tomster.set('hasUmbrella', true);
        tomster.get('readyForRain'); // true
        tomster.set('hasJacket', 'Yes');
        tomster.get('readyForRain'); // 'Yes'
        tomster.set('hasSunscreen', 'Check');
        tomster.get('readyForBeach'); // 'Check'
        ```
        */
        or(...dependentKey: string[]): Ember.ComputedProperty;
        /*
        A computed property which returns a new array with all the elements
        two or more dependent arrays have in common.
        
        Example
        
        ```javascript
        let obj = Ember.Object.extend({
          friendsInCommon: Ember.computed.intersect('adaFriends', 'charlesFriends')
        }).create({
          adaFriends: ['Charles Babbage', 'John Hobhouse', 'William King', 'Mary Somerville'],
          charlesFriends: ['William King', 'Mary Somerville', 'Ada Lovelace', 'George Peacock']
        });
        
        obj.get('friendsInCommon'); // ['William King', 'Mary Somerville']
        ```
        */
        intersect(...propertyKey: string[]): Ember.ComputedProperty;
        /*
        Creates a new property that is an alias for another property
        on an object. Calls to `get` or `set` this property behave as
        though they were called on the original property.
        
        ```javascript
        let Person = Ember.Object.extend({
          name: 'Alex Matchneer',
          nomen: Ember.computed.alias('name')
        });
        
        let alex = Person.create();
        
        alex.get('nomen'); // 'Alex Matchneer'
        alex.get('name');  // 'Alex Matchneer'
        
        alex.set('nomen', '@machty');
        alex.get('name');  // '@machty'
        ```
        */
        alias(dependentKey: string): Ember.ComputedProperty;
        /*
        Where `computed.alias` aliases `get` and `set`, and allows for bidirectional
        data flow, `computed.oneWay` only provides an aliased `get`. The `set` will
        not mutate the upstream property, rather causes the current property to
        become the value set. This causes the downstream property to permanently
        diverge from the upstream property.
        
        Example
        
        ```javascript
        let User = Ember.Object.extend({
          firstName: null,
          lastName: null,
          nickName: Ember.computed.oneWay('firstName')
        });
        
        let teddy = User.create({
          firstName: 'Teddy',
          lastName:  'Zeenny'
        });
        
        teddy.get('nickName');              // 'Teddy'
        teddy.set('nickName', 'TeddyBear'); // 'TeddyBear'
        teddy.get('firstName');             // 'Teddy'
        ```
        */
        oneWay(dependentKey: string): Ember.ComputedProperty;
        /*
        A computed property which returns a new array with all the
        properties from the first dependent array that are not in the second
        dependent array.
        
        Example
        
        ```javascript
        let Hamster = Ember.Object.extend({
          likes: ['banana', 'grape', 'kale'],
          wants: Ember.computed.setDiff('likes', 'fruits')
        });
        
        let hamster = Hamster.create({
          fruits: [
            'grape',
            'kale',
          ]
        });
        
        hamster.get('wants'); // ['banana']
        ```
        */
        setDiff(setAProperty: string, setBProperty: string): Ember.ComputedProperty;
        /*
        This is a more semantically meaningful alias of `computed.oneWay`,
        whose name is somewhat ambiguous as to which direction the data flows.
        */
        reads(dependentKey: string): Ember.ComputedProperty;
        /*
        Where `computed.oneWay` provides oneWay bindings, `computed.readOnly` provides
        a readOnly one way binding. Very often when using `computed.oneWay` one does
        not also want changes to propagate back up, as they will replace the value.
        
        This prevents the reverse flow, and also throws an exception when it occurs.
        
        Example
        
        ```javascript
        let User = Ember.Object.extend({
          firstName: null,
          lastName: null,
          nickName: Ember.computed.readOnly('firstName')
        });
        
        let teddy = User.create({
          firstName: 'Teddy',
          lastName:  'Zeenny'
        });
        
        teddy.get('nickName');              // 'Teddy'
        teddy.set('nickName', 'TeddyBear'); // throws Exception
        // throw new Ember.Error('Cannot Set: nickName on: <User:ember27288>' );`
        teddy.get('firstName');             // 'Teddy'
        ```
        */
        readOnly(dependentKey: string): Ember.ComputedProperty;
        /*
        A computed property that returns the array of values
        for the provided dependent properties.
        
        Example
        
        ```javascript
        let Hamster = Ember.Object.extend({
          clothes: Ember.computed.collect('hat', 'shirt')
        });
        
        let hamster = Hamster.create();
        
        hamster.get('clothes'); // [null, null]
        hamster.set('hat', 'Camp Hat');
        hamster.set('shirt', 'Camp Shirt');
        hamster.get('clothes'); // ['Camp Hat', 'Camp Shirt']
        ```
        */
        collect(...dependentKey: string[]): Ember.ComputedProperty;
        /*
        Creates a new property that is an alias for another property
        on an object. Calls to `get` or `set` this property behave as
        though they were called on the original property, but also
        print a deprecation warning.
        
        ```javascript
        let Hamster = Ember.Object.extend({
          bananaCount: Ember.computed.deprecatingAlias('cavendishCount', {
            id: 'hamster.deprecate-banana',
            until: '3.0.0'
          })
        });
        
        let hamster = Hamster.create();
        
        hamster.set('bananaCount', 5); // Prints a deprecation warning.
        hamster.get('cavendishCount'); // 5
        ```
        */
        deprecatingAlias(dependentKey: string, options: any): Ember.ComputedProperty;
        /*
        A computed property which returns a new array with all the
        properties from the first dependent array sorted based on a property
        or sort function.
        
        The callback method you provide should have the following signature:
        
        ```javascript
        function(itemA, itemB);
        ```
        
        - `itemA` the first item to compare.
        - `itemB` the second item to compare.
        
        This function should return negative number (e.g. `-1`) when `itemA` should come before
        `itemB`. It should return positive number (e.g. `1`) when `itemA` should come after
        `itemB`. If the `itemA` and `itemB` are equal this function should return `0`.
        
        Therefore, if this function is comparing some numeric values, simple `itemA - itemB` or
        `itemA.get( 'foo' ) - itemB.get( 'foo' )` can be used instead of series of `if`.
        
        Example
        
        ```javascript
        let ToDoList = Ember.Object.extend({
          // using standard ascending sort
          todosSorting: ['name'],
          sortedTodos: Ember.computed.sort('todos', 'todosSorting'),
        
          // using descending sort
          todosSortingDesc: ['name:desc'],
          sortedTodosDesc: Ember.computed.sort('todos', 'todosSortingDesc'),
        
          // using a custom sort function
          priorityTodos: Ember.computed.sort('todos', function(a, b){
            if (a.priority > b.priority) {
              return 1;
            } else if (a.priority < b.priority) {
              return -1;
            }
        
            return 0;
          })
        });
        
        let todoList = ToDoList.create({todos: [
          { name: 'Unit Test', priority: 2 },
          { name: 'Documentation', priority: 3 },
          { name: 'Release', priority: 1 }
        ]});
        
        todoList.get('sortedTodos');      // [{ name:'Documentation', priority:3 }, { name:'Release', priority:1 }, { name:'Unit Test', priority:2 }]
        todoList.get('sortedTodosDesc');  // [{ name:'Unit Test', priority:2 }, { name:'Release', priority:1 }, { name:'Documentation', priority:3 }]
        todoList.get('priorityTodos');    // [{ name:'Release', priority:1 }, { name:'Unit Test', priority:2 }, { name:'Documentation', priority:3 }]
        ```
        */
        sort(itemsKey: string, sortDefinition: string | Function): Ember.ComputedProperty;
    }
}
