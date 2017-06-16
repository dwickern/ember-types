//packages/ember-metal/lib/map.js
declare namespace Ember {
    /*
    A Map stores values indexed by keys. Unlike JavaScript's
    default Objects, the keys of a Map can be any JavaScript
    object.
    
    Internally, a Map has two data structures:
    
    1. `keys`: an OrderedSet of all of the existing keys
    2. `values`: a JavaScript Object indexed by the `Ember.guidFor(key)`
    
    When a key/value pair is added for the first time, we
    add the key to the `keys` OrderedSet, and create or
    replace an entry in `values`. When an entry is deleted,
    we delete its entry in `keys` and `values`.
    */
    private class Map {
    }
}
