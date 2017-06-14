if (Ember.Debug && typeof Ember.Debug.registerDeprecationHandler === 'function') {
    Ember.Debug.registerDeprecationHandler((message, options, next) => {
        if (options && options.until && options.until !== '2.0.0') {
            return;
        }
        next(message, options);
    });
}
