//packages/ember-runtime/lib/mixins/copyable.js
declare namespace Ember {
    /*
    Implements some standard methods for copying an object. Add this mixin to
    any object you create that can create a copy of itself. This mixin is
    added automatically to the built-in array.
    
    You should generally implement the `copy()` method to return a copy of the
    receiver.
    
    Note that `frozenCopy()` will only work if you also implement
    `Ember.Freezable`.
    */
    private class Copyable {
    }
}
