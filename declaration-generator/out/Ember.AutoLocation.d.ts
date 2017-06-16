//packages/ember-routing/lib/location/auto_location.js
declare namespace Ember {
    /*
    Ember.AutoLocation will select the best location option based off browser
    support with the priority order: history, hash, none.
    
    Clean pushState paths accessed by hashchange-only browsers will be redirected
    to the hash-equivalent and vice versa so future transitions are consistent.
    
    Keep in mind that since some of your users will use `HistoryLocation`, your
    server must serve the Ember app at all the routes you define.
    */
    private class AutoLocation {
    }
}
