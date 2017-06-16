//packages/ember-runtime/lib/system/core_object.js
declare namespace Ember {
    class CoreObject {
        /*
        An overridable method called when objects are instantiated. By default,
        does nothing unless it is overridden during class definition.
        
        Example:
        
        ```javascript
        const Person = Ember.Object.extend({
          init() {
            alert(`Name is ${this.get('name')}`);
          }
        });
        
        let steve = Person.create({
          name: 'Steve'
        });
        
        // alerts 'Name is Steve'.
        ```
        
        NOTE: If you do override `init` for a framework class like `Ember.View`,
        be sure to call `this._super(...arguments)` in your
        `init` declaration! If you don't, Ember may not have an opportunity to
        do important setup work, and you'll see strange behavior in your
        application.
        */
        init(): any;
        /*
        Defines the properties that will be concatenated from the superclass
        (instead of overridden).
        
        By default, when you extend an Ember class a property defined in
        the subclass overrides a property with the same name that is defined
        in the superclass. However, there are some cases where it is preferable
        to build up a property's value by combining the superclass' property
        value with the subclass' value. An example of this in use within Ember
        is the `classNames` property of `Ember.View`.
        
        Here is some sample code showing the difference between a concatenated
        property and a normal one:
        
        ```javascript
        const Bar = Ember.Object.extend({
          // Configure which properties to concatenate
          concatenatedProperties: ['concatenatedProperty'],
        
          someNonConcatenatedProperty: ['bar'],
          concatenatedProperty: ['bar']
        });
        
        const FooBar = Bar.extend({
          someNonConcatenatedProperty: ['foo'],
          concatenatedProperty: ['foo']
        });
        
        let fooBar = FooBar.create();
        fooBar.get('someNonConcatenatedProperty'); // ['foo']
        fooBar.get('concatenatedProperty'); // ['bar', 'foo']
        ```
        
        This behavior extends to object creation as well. Continuing the
        above example:
        
        ```javascript
        let fooBar = FooBar.create({
          someNonConcatenatedProperty: ['baz'],
          concatenatedProperty: ['baz']
        })
        fooBar.get('someNonConcatenatedProperty'); // ['baz']
        fooBar.get('concatenatedProperty'); // ['bar', 'foo', 'baz']
        ```
        
        Adding a single property that is not an array will just add it in the array:
        
        ```javascript
        let fooBar = FooBar.create({
          concatenatedProperty: 'baz'
        })
        view.get('concatenatedProperty'); // ['bar', 'foo', 'baz']
        ```
        
        Using the `concatenatedProperties` property, we can tell Ember to mix the
        content of the properties.
        
        In `Ember.Component` the `classNames`, `classNameBindings` and
        `attributeBindings` properties are concatenated.
        
        This feature is available for you to use throughout the Ember object model,
        although typical app developers are likely to use it infrequently. Since
        it changes expectations about behavior of properties, you should properly
        document its usage in each individual concatenated property (to not
        mislead your users to think they can override the property in a subclass).
        */
        concatenatedProperties: Array;
        /*
        Defines the properties that will be merged from the superclass
        (instead of overridden).
        
        By default, when you extend an Ember class a property defined in
        the subclass overrides a property with the same name that is defined
        in the superclass. However, there are some cases where it is preferable
        to build up a property's value by merging the superclass property value
        with the subclass property's value. An example of this in use within Ember
        is the `queryParams` property of routes.
        
        Here is some sample code showing the difference between a merged
        property and a normal one:
        
        ```javascript
        const Bar = Ember.Object.extend({
          // Configure which properties are to be merged
          mergedProperties: ['mergedProperty'],
        
          someNonMergedProperty: {
            nonMerged: 'superclass value of nonMerged'
          },
          mergedProperty: {
            page: { replace: false },
            limit: { replace: true }
          }
        });
        
        const FooBar = Bar.extend({
          someNonMergedProperty: {
            completelyNonMerged: 'subclass value of nonMerged'
          },
          mergedProperty: {
            limit: { replace: false }
          }
        });
        
        let fooBar = FooBar.create();
        
        fooBar.get('someNonMergedProperty');
        // => { completelyNonMerged: 'subclass value of nonMerged' }
        //
        // Note the entire object, including the nonMerged property of
        // the superclass object, has been replaced
        
        fooBar.get('mergedProperty');
        // => {
        //   page: {replace: false},
        //   limit: {replace: false}
        // }
        //
        // Note the page remains from the superclass, and the
        // `limit` property's value of `false` has been merged from
        // the subclass.
        ```
        
        This behavior is not available during object `create` calls. It is only
        available at `extend` time.
        
        In `Ember.Route` the `queryParams` property is merged.
        
        This feature is available for you to use throughout the Ember object model,
        although typical app developers are likely to use it infrequently. Since
        it changes expectations about behavior of properties, you should properly
        document its usage in each individual merged property (to not
        mislead your users to think they can override the property in a subclass).
        */
        mergedProperties: Array;
        /*
        Destroyed object property flag.
        
        if this property is `true` the observers and bindings were already
        removed by the effect of calling the `destroy()` method.
        */
        isDestroyed: any;
        /*
        Destruction scheduled flag. The `destroy()` method has been called.
        
        The object stays intact until the end of the run loop at which point
        the `isDestroyed` flag is set.
        */
        isDestroying: any;
        /*
        Destroys an object by setting the `isDestroyed` flag and removing its
        metadata, which effectively destroys observers and bindings.
        
        If you try to set a property on a destroyed object, an exception will be
        raised.
        
        Note that destruction is scheduled for the end of the run loop and does not
        happen immediately.  It will set an isDestroying flag immediately.
        */
        destroy(): Ember.Object;
        /*
        Override to implement teardown.
        */
        willDestroy(): any;
        /*
        Returns a string representation which attempts to provide more information
        than Javascript's `toString` typically does, in a generic way for all Ember
        objects.
        
        ```javascript
        const Person = Ember.Object.extend()
        person = Person.create()
        person.toString() //=> "<Person:ember1024>"
        ```
        
        If the object's class is not defined on an Ember namespace, it will
        indicate it is a subclass of the registered superclass:
        
           ```javascript
        const Student = Person.extend()
        let student = Student.create()
        student.toString() //=> "<(subclass of Person):ember1025>"
        ```
        
        If the method `toStringExtension` is defined, its return value will be
        included in the output.
        
        ```javascript
        const Teacher = Person.extend({
          toStringExtension() {
            return this.get('fullName');
          }
        });
        teacher = Teacher.create()
        teacher.toString(); //=> "<Teacher:ember1026:Tom Dale>"
        ```
        */
        toString(): string;
        /*
        Creates a new subclass.
        
        ```javascript
        const Person = Ember.Object.extend({
          say(thing) {
            alert(thing);
           }
        });
        ```
        
        This defines a new subclass of Ember.Object: `Person`. It contains one method: `say()`.
        
        You can also create a subclass from any existing class by calling its `extend()` method.
        For example, you might want to create a subclass of Ember's built-in `Ember.Component` class:
        
        ```javascript
        const PersonComponent = Ember.Component.extend({
          tagName: 'li',
          classNameBindings: ['isAdministrator']
        });
        ```
        
        When defining a subclass, you can override methods but still access the
        implementation of your parent class by calling the special `_super()` method:
        
        ```javascript
        const Person = Ember.Object.extend({
          say(thing) {
            let name = this.get('name');
            alert(`${name} says: ${thing}`);
          }
        });
        
        const Soldier = Person.extend({
          say(thing) {
            this._super(`${thing}, sir!`);
          },
          march(numberOfHours) {
            alert(`${this.get('name')} marches for ${numberOfHours} hours.`);
          }
        });
        
        let yehuda = Soldier.create({
          name: 'Yehuda Katz'
        });
        
        yehuda.say('Yes');  // alerts "Yehuda Katz says: Yes, sir!"
        ```
        
        The `create()` on line #17 creates an *instance* of the `Soldier` class.
        The `extend()` on line #8 creates a *subclass* of `Person`. Any instance
        of the `Person` class will *not* have the `march()` method.
        
        You can also pass `Mixin` classes to add additional properties to the subclass.
        
        ```javascript
        const Person = Ember.Object.extend({
          say(thing) {
            alert(`${this.get('name')} says: ${thing}`);
          }
        });
        
        const SingingMixin = Mixin.create({
          sing(thing){
            alert(`${this.get('name')} sings: la la la ${thing}`);
          }
        });
        
        const BroadwayStar = Person.extend(SingingMixin, {
          dance() {
            alert(`${this.get('name')} dances: tap tap tap tap `);
          }
        });
        ```
        
        The `BroadwayStar` class contains three methods: `say()`, `sing()`, and `dance()`.
        */
        extend(...mixins: Mixin[], ...arguments: any[]): any;
        /*
        Creates an instance of a class. Accepts either no arguments, or an object
        containing values to initialize the newly instantiated object with.
        
        ```javascript
        const Person = Ember.Object.extend({
          helloWorld() {
            alert(`Hi, my name is ${this.get('name')}`);
          }
        });
        
        let tom = Person.create({
          name: 'Tom Dale'
        });
        
        tom.helloWorld(); // alerts "Hi, my name is Tom Dale".
        ```
        
        `create` will call the `init` function if defined during
        `Ember.AnyObject.extend`
        
        If no arguments are passed to `create`, it will not set values to the new
        instance during initialization:
        
        ```javascript
        let noName = Person.create();
        noName.helloWorld(); // alerts undefined
        ```
        
        NOTE: For performance reasons, you cannot declare methods or computed
        properties during `create`. You should instead declare methods and computed
        properties when using `extend`.
        */
        create(...arguments: any[]): any;
        /*
        Augments a constructor's prototype with additional
        properties and functions:
        
        ```javascript
        const MyObject = Ember.Object.extend({
          name: 'an object'
        });
        
        o = MyObject.create();
        o.get('name'); // 'an object'
        
        MyObject.reopen({
          say(msg) {
            console.log(msg);
          }
        });
        
        o2 = MyObject.create();
        o2.say('hello'); // logs "hello"
        
        o.say('goodbye'); // logs "goodbye"
        ```
        
        To add functions and properties to the constructor itself,
        see `reopenClass`
        */
        reopen(): any;
        /*
        Augments a constructor's own properties and functions:
        
        ```javascript
        const MyObject = Ember.Object.extend({
          name: 'an object'
        });
        
        MyObject.reopenClass({
          canBuild: false
        });
        
        MyObject.canBuild; // false
        o = MyObject.create();
        ```
        
        In other words, this creates static properties and functions for the class.
        These are only available on the class and not on any instance of that class.
        
        ```javascript
        const Person = Ember.Object.extend({
          name: '',
          sayHello() {
            alert(`Hello. My name is ${this.get('name')}`);
          }
        });
        
        Person.reopenClass({
          species: 'Homo sapiens',
        
          createPerson(name) {
            return Person.create({ name });
          }
        });
        
        let tom = Person.create({
          name: 'Tom Dale'
        });
        let yehuda = Person.createPerson('Yehuda Katz');
        
        tom.sayHello(); // "Hello. My name is Tom Dale"
        yehuda.sayHello(); // "Hello. My name is Yehuda Katz"
        alert(Person.species); // "Homo sapiens"
        ```
        
        Note that `species` and `createPerson` are *not* valid on the `tom` and `yehuda`
        variables. They are only valid on `Person`.
        
        To add functions and properties to instances of
        a constructor by extending the constructor's prototype
        see `reopen`
        */
        reopenClass(): any;
    }
}
