//packages/ember-views/lib/mixins/view_support.js
declare namespace Ember {
    private class ViewMixin {
        /*
        A list of properties of the view to apply as attributes. If the property
        is a string value, the value of that string will be applied as the value
        for an attribute of the property's name.
        
        The following example creates a tag like `<div priority="high" />`.
        
        ```javascript
        Ember.Component.extend({
          attributeBindings: ['priority'],
          priority: 'high'
        });
        ```
        
        If the value of the property is a Boolean, the attribute is treated as
        an HTML Boolean attribute. It will be present if the property is `true`
        and omitted if the property is `false`.
        
        The following example creates markup like `<div visible />`.
        
        ```javascript
        Ember.Component.extend({
          attributeBindings: ['visible'],
          visible: true
        });
        ```
        
        If you would prefer to use a custom value instead of the property name,
        you can create the same markup as the last example with a binding like
        this:
        
        ```javascript
        Ember.Component.extend({
          attributeBindings: ['isVisible:visible'],
          isVisible: true
        });
        ```
        
        This list of attributes is inherited from the component's superclasses,
        as well.
        */
        attributeBindings: Array;
        /*
        Renders the view again. This will work regardless of whether the
        view is already in the DOM or not. If the view is in the DOM, the
        rendering process will be deferred to give bindings a chance
        to synchronize.
        
        If children were added during the rendering process using `appendChild`,
        `rerender` will remove them, because they will be added again
        if needed by the next `render`.
        
        In general, if the display of your view changes, you should modify
        the DOM element directly instead of manually calling `rerender`, which can
        be slow.
        */
        rerender(): any;
        /*
        Returns the current DOM element for the view.
        */
        element: DOMElement;
        /*
        Returns a jQuery object for this view's element. If you pass in a selector
        string, this method will return a jQuery object, using the current element
        as its buffer.
        
        For example, calling `view.$('li')` will return a jQuery object containing
        all of the `li` elements inside the DOM element of this view.
        */
        $(selector: string): JQuery;
        /*
        The HTML `id` of the view's element in the DOM. You can provide this
        value yourself but it must be unique (just as in HTML):
        
        ```handlebars
          {{my-component elementId="a-really-cool-id"}}
        ```
        
        If not manually set a default value will be provided by the framework.
        
        Once rendered an element's `elementId` is considered immutable and you
        should never change it. If you need to compute a dynamic value for the
        `elementId`, you should do this when the component or element is being
        instantiated:
        
        ```javascript
          export default Ember.Component.extend({
            init() {
              this._super(...arguments);
              let index = this.get('index');
              this.set('elementId', 'component-id' + index);
            }
          });
        ```
        */
        elementId: string;
        /*
        Called when a view is going to insert an element into the DOM.
        */
        willInsertElement(): any;
        /*
        Called when the element of the view has been inserted into the DOM.
        Override this function to do any set up that requires an element
        in the document body.
        
        When a view has children, didInsertElement will be called on the
        child view(s) first and on itself afterwards.
        */
        didInsertElement(): any;
        /*
        Called when the view is about to rerender, but before anything has
        been torn down. This is a good opportunity to tear down any manual
        observers you have installed based on the DOM state
        */
        willClearRender(): any;
        /*
        Called when the element of the view is going to be destroyed. Override
        this function to do any teardown that requires an element, like removing
        event listeners.
        
        Please note: any property changes made during this event will have no
        effect on object observers.
        */
        willDestroyElement(): any;
        /*
        Tag name for the view's outer element. The tag name is only used when an
        element is first created. If you change the `tagName` for an element, you
        must destroy and recreate the view element.
        
        By default, the render buffer will use a `<div>` tag for views.
        */
        tagName: string;
    }
}
