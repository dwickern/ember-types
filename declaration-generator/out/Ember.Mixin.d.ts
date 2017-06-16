//packages/ember-metal/lib/mixin.js
declare namespace Ember {
    /*
    The `Ember.Mixin` class allows you to create mixins, whose properties can be
    added to other classes. For instance,
    
    ```javascript
    const EditableMixin = Ember.Mixin.create({
      edit() {
        console.log('starting to edit');
        this.set('isEditing', true);
      },
      isEditing: false
    });
    
    // Mix mixins into classes by passing them as the first arguments to
    // `.extend.`
    const Comment = Ember.Object.extend(EditableMixin, {
      post: null
    });
    
    let comment = Comment.create({
      post: somePost
    });
    
    comment.edit(); // outputs 'starting to edit'
    ```
    
    Note that Mixins are created with `Ember.Mixin.create`, not
    `Ember.Mixin.extend`.
    
    Note that mixins extend a constructor's prototype so arrays and object literals
    defined as properties will be shared amongst objects that implement the mixin.
    If you want to define a property in a mixin that is not shared, you can define
    it either as a computed property or have it be created on initialization of the object.
    
    ```javascript
    // filters array will be shared amongst any object implementing mixin
    const FilterableMixin = Ember.Mixin.create({
      filters: Ember.A()
    });
    
    // filters will be a separate array for every object implementing the mixin
    const FilterableMixin = Ember.Mixin.create({
      filters: Ember.computed(function() {
        return Ember.A();
      })
    });
    
    // filters will be created as a separate array during the object's initialization
    const Filterable = Ember.Mixin.create({
      init() {
        this._super(...arguments);
        this.set("filters", Ember.A());
      }
    });
    ```
    */
    class Mixin {
        create(...arguments: any[]): any;
    }
}
