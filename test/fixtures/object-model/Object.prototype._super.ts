Ember.Object.extend({
    superWithSpread(...args) {
        this._super(...args);
    },
    superWithApply() {
        this._super.apply(this, arguments);
    },

    // https://github.com/Microsoft/TypeScript/issues/4384
    superWithSpreadArguments() {
        this._super(...arguments); // EXPECT: TS2461
    }
});
