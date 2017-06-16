//packages/ember-metal/lib/core.js
declare namespace Ember {
    /*
    This namespace contains all Ember methods and functions. Future versions of
    Ember may overwrite this namespace and therefore, you should avoid adding any
    new properties.
    
    At the heart of Ember is Ember-Runtime, a set of core functions that provide
    cross-platform compatibility and object property observing.  Ember-Runtime is
    small and performance-focused so you can use it alongside other
    cross-platform libraries such as jQuery. For more details, see
    [Ember-Runtime](https://emberjs.com/api/modules/ember-runtime.html).
    */
    class Ember {
        /*
        Returns true if the passed value is null or undefined. This avoids errors
        from JSLint complaining about use of ==, which can be technically
        confusing.
        
        ```javascript
        Ember.isNone();              // true
        Ember.isNone(null);          // true
        Ember.isNone(undefined);     // true
        Ember.isNone('');            // false
        Ember.isNone([]);            // false
        Ember.isNone(function() {}); // false
        ```
        */
        isNone(obj: any): boolean;
        /*
        Copy properties from a source object to a target object.
        
        ```javascript
        var a = { first: 'Yehuda' };
        var b = { last: 'Katz' };
        var c = { company: 'Tilde Inc.' };
        Ember.assign(a, b, c); // a === { first: 'Yehuda', last: 'Katz', company: 'Tilde Inc.' }, b === { last: 'Katz' }, c === { company: 'Tilde Inc.' }
        ```
        */
        assign(original: any, ...args: any[]): any;
        /*
        Compares two objects, returning true if they are equal.
        
        ```javascript
        Ember.isEqual('hello', 'hello');                   // true
        Ember.isEqual(1, 2);                               // false
        ```
        
        `isEqual` is a more specific comparison than a triple equal comparison.
        It will call the `isEqual` instance method on the objects being
        compared, allowing finer control over when objects should be considered
        equal to each other.
        
        ```javascript
        let Person = Ember.Object.extend({
          isEqual(other) { return this.ssn == other.ssn; }
        });
        
        let personA = Person.create({name: 'Muhammad Ali', ssn: '123-45-6789'});
        let personB = Person.create({name: 'Cassius Clay', ssn: '123-45-6789'});
        
        Ember.isEqual(personA, personB); // true
        ```
        
        Due to the expense of array comparisons, collections will never be equal to
        each other even if each of their items are equal to each other.
        
        ```javascript
        Ember.isEqual([4, 2], [4, 2]);                     // false
        ```
        */
        isEqual(a: any, b: any): boolean;
        /*
        Merge the contents of two objects together into the first object.
        
        ```javascript
        Ember.merge({ first: 'Tom' }, { last: 'Dale' }); // { first: 'Tom', last: 'Dale' }
        var a = { first: 'Yehuda' };
        var b = { last: 'Katz' };
        Ember.merge(a, b); // a == { first: 'Yehuda', last: 'Katz' }, b == { last: 'Katz' }
        ```
        */
        merge(original: any, updates: any): any;
        /*
        A value is present if it not `isBlank`.
        
        ```javascript
        Ember.isPresent();                // false
        Ember.isPresent(null);            // false
        Ember.isPresent(undefined);       // false
        Ember.isPresent('');              // false
        Ember.isPresent('  ');            // false
        Ember.isPresent('\n\t');          // false
        Ember.isPresent([]);              // false
        Ember.isPresent({ length: 0 })    // false
        Ember.isPresent(false);           // true
        Ember.isPresent(true);            // true
        Ember.isPresent('string');        // true
        Ember.isPresent(0);               // true
        Ember.isPresent(function() {})    // true
        Ember.isPresent({});              // true
        Ember.isPresent(false);           // true
        Ember.isPresent('\n\t Hello');    // true
        Ember.isPresent([1,2,3]);         // true
        ```
        */
        isPresent(obj: any): boolean;
        /*
        A value is blank if it is empty or a whitespace string.
        
        ```javascript
        Ember.isBlank();                // true
        Ember.isBlank(null);            // true
        Ember.isBlank(undefined);       // true
        Ember.isBlank('');              // true
        Ember.isBlank([]);              // true
        Ember.isBlank('\n\t');          // true
        Ember.isBlank('  ');            // true
        Ember.isBlank({});              // false
        Ember.isBlank('\n\t Hello');    // false
        Ember.isBlank('Hello world');   // false
        Ember.isBlank([1,2,3]);         // false
        ```
        */
        isBlank(obj: any): boolean;
        /*
        To get multiple properties at once, call `Ember.getProperties`
        with an object followed by a list of strings or an array:
        
        ```javascript
        Ember.getProperties(record, 'firstName', 'lastName', 'zipCode');
        // { firstName: 'John', lastName: 'Doe', zipCode: '10011' }
        ```
        
        is equivalent to:
        
        ```javascript
        Ember.getProperties(record, ['firstName', 'lastName', 'zipCode']);
        // { firstName: 'John', lastName: 'Doe', zipCode: '10011' }
        ```
        */
        getProperties(obj: any, list: string | Array): any;
        /*
        Verifies that a value is `null` or an empty string, empty array,
        or empty function.
        
        Constrains the rules on `Ember.isNone` by returning true for empty
        string and empty arrays.
        
        ```javascript
        Ember.isEmpty();                // true
        Ember.isEmpty(null);            // true
        Ember.isEmpty(undefined);       // true
        Ember.isEmpty('');              // true
        Ember.isEmpty([]);              // true
        Ember.isEmpty({});              // false
        Ember.isEmpty('Adam Hawkins');  // false
        Ember.isEmpty([0,1,2]);         // false
        Ember.isEmpty('\n\t');          // false
        Ember.isEmpty('  ');            // false
        ```
        */
        isEmpty(obj: any): boolean;
        /*
        Set a list of properties on an object. These properties are set inside
        a single `beginPropertyChanges` and `endPropertyChanges` batch, so
        observers will be buffered.
        
        ```javascript
        let anObject = Ember.Object.create();
        
        anObject.setProperties({
          firstName: 'Stanley',
          lastName: 'Stuart',
          age: 21
        });
        ```
        */
        setProperties(obj: any, properties: any): any;
        /*
        `getEngineParent` retrieves an engine instance's parent instance.
        */
        getEngineParent(engine: EngineInstance): EngineInstance;
        /*
        Framework objects in an Ember application (components, services, routes, etc.)
        are created via a factory and dependency injection system. Each of these
        objects is the responsibility of an "owner", which handled its
        instantiation and manages its lifetime.
        
        `getOwner` fetches the owner object responsible for an instance. This can
        be used to lookup or resolve other class instances, or register new factories
        into the owner.
        
        For example, this component dynamically looks up a service based on the
        `audioType` passed as an attribute:
        
        ```app/components/play-audio.js
        import Ember from 'ember';
        
        // Usage:
        //
        //   {{play-audio audioType=model.audioType audioFile=model.file}}
        //
        export default Ember.Component.extend({
          audioService: Ember.computed('audioType', function() {
            let owner = Ember.getOwner(this);
            return owner.lookup(`service:${this.get('audioType')}`);
          }),
          click() {
            let player = this.get('audioService');
            player.play(this.get('audioFile'));
          }
        });
        ```
        */
        getOwner(object: any): any;
        /*
        Allows for runtime registration of handler functions that override the default deprecation behavior.
        Deprecations are invoked by calls to [Ember.deprecate](https://emberjs.com/api/classes/Ember.html#method_deprecate).
        The following example demonstrates its usage by registering a handler that throws an error if the
        message contains the word "should", otherwise defers to the default handler.
        
        ```javascript
        Ember.Debug.registerDeprecationHandler((message, options, next) => {
          if (message.indexOf('should') !== -1) {
            throw new Error(`Deprecation message with should: ${message}`);
          } else {
            // defer to whatever handler was registered before this one
            next(message, options);
          }
        });
        ```
        
        The handler function takes the following arguments:
        
        <ul>
          <li> <code>message</code> - The message received from the deprecation call.</li>
          <li> <code>options</code> - An object passed in with the deprecation call containing additional information including:</li>
            <ul>
              <li> <code>id</code> - An id of the deprecation in the form of <code>package-name.specific-deprecation</code>.</li>
              <li> <code>until</code> - The Ember version number the feature and deprecation will be removed in.</li>
            </ul>
          <li> <code>next</code> - A function that calls into the previously registered handler.</li>
        </ul>
        */
        registerDeprecationHandler(handler: Function): any;
        /*
        Allows for runtime registration of handler functions that override the default warning behavior.
        Warnings are invoked by calls made to [Ember.warn](https://emberjs.com/api/classes/Ember.html#method_warn).
        The following example demonstrates its usage by registering a handler that does nothing overriding Ember's
        default warning behavior.
        
        ```javascript
        // next is not called, so no warnings get the default behavior
        Ember.Debug.registerWarnHandler(() => {});
        ```
        
        The handler function takes the following arguments:
        
        <ul>
          <li> <code>message</code> - The message received from the warn call. </li>
          <li> <code>options</code> - An object passed in with the warn call containing additional information including:</li>
            <ul>
              <li> <code>id</code> - An id of the warning in the form of <code>package-name.specific-warning</code>.</li>
            </ul>
          <li> <code>next</code> - A function that calls into the previously registered handler.</li>
        </ul>
        */
        registerWarnHandler(handler: Function): any;
        /*
        Sets the value of a property on an object, respecting computed properties
        and notifying observers and other listeners of the change. If the
        property is not defined but the object implements the `setUnknownProperty`
        method then that will be invoked as well.
        
        ```javascript
        Ember.set(obj, "name", value);
        ```
        */
        set(obj: any, keyName: string, value: any): any;
        /*
        Gets the value of a property on an object. If the property is computed,
        the function will be invoked. If the property is not defined but the
        object implements the `unknownProperty` method then that will be invoked.
        
        ```javascript
        Ember.get(obj, "name");
        ```
        
        If you plan to run on IE8 and older browsers then you should use this
        method anytime you want to retrieve a property on an object that you don't
        know for sure is private. (Properties beginning with an underscore '_'
        are considered private.)
        
        On all newer browsers, you only need to use this method to retrieve
        properties if the property might not be defined on the object and you want
        to respect the `unknownProperty` handler. Otherwise you can ignore this
        method.
        
        Note that if the object itself is `undefined`, this method will throw
        an error.
        */
        get(obj: any, keyName: string): any;
        /*
        Returns true if the passed object is an array or Array-like.
        
        Objects are considered Array-like if any of the following are true:
        
          - the object is a native Array
          - the object has an objectAt property
          - the object is an Object, and has a length property
        
        Unlike `Ember.typeOf` this method returns true even if the passed object is
        not formally an array but appears to be array-like (i.e. implements `Ember.Array`)
        
        ```javascript
        Ember.isArray();                                          // false
        Ember.isArray([]);                                        // true
        Ember.isArray(Ember.ArrayProxy.create({ content: [] }));  // true
        ```
        */
        isArray(obj: any): boolean;
        /*
        Checks to see if the `methodName` exists on the `obj`,
        and if it does, invokes it with the arguments passed.
        
        ```javascript
        let d = new Date('03/15/2013');
        
        Ember.tryInvoke(d, 'getTime');              // 1363320000000
        Ember.tryInvoke(d, 'setFullYear', [2014]);  // 1394856000000
        Ember.tryInvoke(d, 'noSuchMethod', [2014]); // undefined
        ```
        */
        tryInvoke(obj: any, methodName: string, args: Array): any;
        addObserver(obj: any, _path: string, target: any | Function, method: Function | string): any;
        /*
        Compares two javascript values and returns:
        
         - -1 if the first is smaller than the second,
         - 0 if both are equal,
         - 1 if the first is greater than the second.
        
         ```javascript
         Ember.compare('hello', 'hello');  // 0
         Ember.compare('abc', 'dfg');      // -1
         Ember.compare(2, 1);              // 1
         ```
        
        If the types of the two objects are different precedence occurs in the
        following order, with types earlier in the list considered `<` types
        later in the list:
        
         - undefined
         - null
         - boolean
         - number
         - string
         - array
         - object
         - instance
         - function
         - class
         - date
        
         ```javascript
         Ember.compare('hello', 50);       // 1
         Ember.compare(50, 'hello');       // -1
         ```
        */
        compare(v: any, w: any): number;
        removeObserver(obj: any, path: string, target: any | Function, method: Function | string): any;
        /*
        `setOwner` forces a new owner on a given object instance. This is primarily
        useful in some testing cases.
        */
        setOwner(object: any, object: any): any;
        /*
        Returns a consistent type for the passed object.
        
        Use this instead of the built-in `typeof` to get the type of an item.
        It will return the same result across all browsers and includes a bit
        more detail. Here is what will be returned:
        
            | Return Value  | Meaning                                              |
            |---------------|------------------------------------------------------|
            | 'string'      | String primitive or String object.                   |
            | 'number'      | Number primitive or Number object.                   |
            | 'boolean'     | Boolean primitive or Boolean object.                 |
            | 'null'        | Null value                                           |
            | 'undefined'   | Undefined value                                      |
            | 'function'    | A function                                           |
            | 'array'       | An instance of Array                                 |
            | 'regexp'      | An instance of RegExp                                |
            | 'date'        | An instance of Date                                  |
            | 'filelist'    | An instance of FileList                              |
            | 'class'       | An Ember class (created using Ember.Object.extend()) |
            | 'instance'    | An Ember object instance                             |
            | 'error'       | An instance of the Error object                      |
            | 'object'      | A JavaScript object not inheriting from Ember.Object |
        
        Examples:
        
        ```javascript
        Ember.typeOf();                       // 'undefined'
        Ember.typeOf(null);                   // 'null'
        Ember.typeOf(undefined);              // 'undefined'
        Ember.typeOf('michael');              // 'string'
        Ember.typeOf(new String('michael'));  // 'string'
        Ember.typeOf(101);                    // 'number'
        Ember.typeOf(new Number(101));        // 'number'
        Ember.typeOf(true);                   // 'boolean'
        Ember.typeOf(new Boolean(true));      // 'boolean'
        Ember.typeOf(Ember.A);                // 'function'
        Ember.typeOf([1, 2, 90]);             // 'array'
        Ember.typeOf(/abc/);                  // 'regexp'
        Ember.typeOf(new Date());             // 'date'
        Ember.typeOf(event.target.files);     // 'filelist'
        Ember.typeOf(Ember.Object.extend());  // 'class'
        Ember.typeOf(Ember.Object.create());  // 'instance'
        Ember.typeOf(new Error('teamocil'));  // 'error'
        
        // 'normal' JavaScript object
        Ember.typeOf({ a: 'b' });             // 'object'
        ```
        */
        typeOf(item: any): string;
        /*
        Display a warning with the provided message.
        
        * In a production build, this method is defined as an empty function (NOP).
        Uses of this method in Ember itself are stripped from the ember.prod.js build.
        */
        warn(message: string, test: boolean, options: any): any;
        /*
        Add an event listener
        */
        addListener(obj: any, eventName: string, target: any | Function, method: Function | string, once: boolean): any;
        /*
        Creates a shallow copy of the passed object. A deep copy of the object is
        returned if the optional `deep` argument is `true`.
        
        If the passed object implements the `Ember.Copyable` interface, then this
        function will delegate to the object's `copy()` method and return the
        result. See `Ember.Copyable` for further details.
        
        For primitive values (which are immutable in JavaScript), the passed object
        is simply returned.
        */
        copy(obj: any, deep: boolean): any;
        /*
        Define an assertion that will throw an exception if the condition is not met.
        
        * In a production build, this method is defined as an empty function (NOP).
        Uses of this method in Ember itself are stripped from the ember.prod.js build.
        
        ```javascript
        // Test for truthiness
        Ember.assert('Must pass a valid object', obj);
        
        // Fail unconditionally
        Ember.assert('This code path should never be run');
        ```
        */
        assert(desc: string, test: boolean): any;
        /*
        Display a debug notice.
        
        * In a production build, this method is defined as an empty function (NOP).
        Uses of this method in Ember itself are stripped from the ember.prod.js build.
        
        ```javascript
        Ember.debug('I\'m a debug notice!');
        ```
        */
        debug(message: string): any;
        /*
        Retrieves the value of a property from an Object, or a default value in the
        case that the property returns `undefined`.
        
        ```javascript
        Ember.getWithDefault(person, 'lastName', 'Doe');
        ```
        */
        getWithDefault(obj: any, keyName: string, defaultValue: any): any;
        /*
        Remove an event listener
        
        Arguments should match those passed to `Ember.addListener`.
        */
        removeListener(obj: any, eventName: string, target: any | Function, method: Function | string): any;
        /*
        Creates an `Ember.NativeArray` from an Array like object.
        Does not modify the original object's contents. Ember.A is not needed if
        `EmberENV.EXTEND_PROTOTYPES` is `true` (the default value). However,
        it is recommended that you use Ember.A when creating addons for
        ember or when you can not guarantee that `EmberENV.EXTEND_PROTOTYPES`
        will be `true`.
        
        Example
        
        ```js
        export default Ember.Component.extend({
          tagName: 'ul',
          classNames: ['pagination'],
        
          init() {
            this._super(...arguments);
        
            if (!this.get('content')) {
              this.set('content', Ember.A());
            }
          }
        });
        ```
        */
        A(): Ember.NativeArray;
        /*
        Returns a unique id for the object. If the object does not yet have a guid,
        one will be assigned to it. You can call this on any object,
        `Ember.Object`-based or not, but be aware that it will add a `_guid`
        property.
        
        You can also use this method on DOM Element objects.
        */
        guidFor(obj: any): string;
        /*
        Error-tolerant form of `Ember.set`. Will not blow up if any part of the
        chain is `undefined`, `null`, or destroyed.
        
        This is primarily used when syncing bindings, which may try to update after
        an object has been destroyed.
        */
        trySet(root: any, path: string, value: any): any;
        /*
        Display a deprecation warning with the provided message and a stack trace
        (Chrome and Firefox only).
        
        * In a production build, this method is defined as an empty function (NOP).
        Uses of this method in Ember itself are stripped from the ember.prod.js build.
        */
        deprecate(message: string, test: boolean, options: any): any;
        /*
        Run a function meant for debugging.
        
        * In a production build, this method is defined as an empty function (NOP).
        Uses of this method in Ember itself are stripped from the ember.prod.js build.
        
        ```javascript
        Ember.runInDebug(() => {
          Ember.Component.reopen({
            didInsertElement() {
              console.log("I'm happy");
            }
          });
        });
        ```
        */
        runInDebug(func: Function): any;
        /*
        Send an event. The execution of suspended listeners
        is skipped, and once listeners are removed. A listener without
        a target is executed on the passed object. If an array of actions
        is not passed, the actions stored on the passed object are invoked.
        */
        sendEvent(obj: any, eventName: string, params: Array, actions: Array, meta: Meta): any;
        /*
        A function may be assigned to `Ember.onerror` to be called when Ember
        internals encounter an error. This is useful for specialized error handling
        and reporting code.
        
        ```javascript
        Ember.onerror = function(error) {
          Em.$.ajax('/report-error', 'POST', {
            stack: error.stack,
            otherInformation: 'whatever app state you want to provide'
          });
        };
        ```
        
        Internally, `Ember.onerror` is used as Backburner's error handler.
        */
        onerror(error: Exception): any;
        /*
        An empty function useful for some operations. Always returns `this`.
        */
        K(): any;
        /*
        Define a property as a function that should be executed when
        a specified event or events are triggered.
        
        
        ``` javascript
        let Job = Ember.Object.extend({
          logCompleted: Ember.on('completed', function() {
            console.log('Job completed!');
          })
        });
        
        let job = Job.create();
        
        Ember.sendEvent(job, 'completed'); // Logs 'Job completed!'
         ```
        */
        on(...eventNames: string[], func: Function): any;
        /*
        Global helper method to create a new binding. Just pass the root object
        along with a `to` and `from` path to create and connect the binding.
        */
        bind(obj: any, to: string, from: string): Ember.Binding;
        /*
        The semantic version
        */
        VERSION: string;
        /*
        Returns the cached value for a property, if one exists.
        This can be useful for peeking at the value of a computed
        property that is generated lazily, without accidentally causing
        it to be created.
        */
        cacheFor(obj: any, key: string): any;
        /*
        Alias for jQuery
        */
        $(): any;
        /*
        Makes a method available via an additional name.
        
        ```javascript
        App.Person = Ember.Object.extend({
          name: function() {
            return 'Tomhuda Katzdale';
          },
          moniker: Ember.aliasMethod('name')
        });
        
        let goodGuy = App.Person.create();
        
        goodGuy.name();    // 'Tomhuda Katzdale'
        goodGuy.moniker(); // 'Tomhuda Katzdale'
        ```
        */
        aliasMethod(methodName: string): any;
        /*
        Specify a method that observes property changes.
        
        ```javascript
        Ember.Object.extend({
          valueObserver: Ember.observer('value', function() {
            // Executes whenever the "value" property changes
          })
        });
        ```
        
        Also available as `Function.prototype.observes` if prototype extensions are
        enabled.
        */
        observer(...propertyNames: string[], func: Function): any;
    }
}
