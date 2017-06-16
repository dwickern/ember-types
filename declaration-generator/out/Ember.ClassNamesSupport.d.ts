//packages/ember-views/lib/mixins/class_names_support.js
declare namespace Ember {
    private class ClassNamesSupport {
        /*
        Standard CSS class names to apply to the view's outer element. This
        property automatically inherits any class names defined by the view's
        superclasses as well.
        */
        classNames: Array;
        /*
        A list of properties of the view to apply as class names. If the property
        is a string value, the value of that string will be applied as a class
        name.
        
        ```javascript
        // Applies the 'high' class to the view element
        Ember.Component.extend({
          classNameBindings: ['priority'],
          priority: 'high'
        });
        ```
        
        If the value of the property is a Boolean, the name of that property is
        added as a dasherized class name.
        
        ```javascript
        // Applies the 'is-urgent' class to the view element
        Ember.Component.extend({
          classNameBindings: ['isUrgent'],
          isUrgent: true
        });
        ```
        
        If you would prefer to use a custom value instead of the dasherized
        property name, you can pass a binding like this:
        
        ```javascript
        // Applies the 'urgent' class to the view element
        Ember.Component.extend({
          classNameBindings: ['isUrgent:urgent'],
          isUrgent: true
        });
        ```
        
        This list of properties is inherited from the component's superclasses as well.
        */
        classNameBindings: Array;
    }
}
