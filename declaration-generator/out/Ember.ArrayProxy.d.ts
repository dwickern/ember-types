//packages/ember-runtime/lib/system/array_proxy.js
declare namespace Ember {
    /*
    An ArrayProxy wraps any other object that implements `Ember.Array` and/or
    `Ember.MutableArray,` forwarding all requests. This makes it very useful for
    a number of binding use cases or other cases where being able to swap
    out the underlying array is useful.
    
    A simple example of usage:
    
    ```javascript
    let pets = ['dog', 'cat', 'fish'];
    let ap = Ember.ArrayProxy.create({ content: Ember.A(pets) });
    
    ap.get('firstObject');                        // 'dog'
    ap.set('content', ['amoeba', 'paramecium']);
    ap.get('firstObject');                        // 'amoeba'
    ```
    
    This class can also be useful as a layer to transform the contents of
    an array, as they are accessed. This can be done by overriding
    `objectAtContent`:
    
    ```javascript
    let pets = ['dog', 'cat', 'fish'];
    let ap = Ember.ArrayProxy.create({
        content: Ember.A(pets),
        objectAtContent: function(idx) {
            return this.get('content').objectAt(idx).toUpperCase();
        }
    });
    
    ap.get('firstObject'); // . 'DOG'
    ```
    */
    class ArrayProxy {
        /*
        Should actually retrieve the object at the specified index from the
        content. You can override this method in subclasses to transform the
        content item to something new.
        
        This method will only be called if content is non-`null`.
        */
        objectAtContent(idx: number): any;
    }
}
