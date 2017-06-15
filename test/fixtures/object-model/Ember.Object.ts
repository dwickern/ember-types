
Ember.Object.extend({
    resource: null,

    init(...args) {
        this._super(...args);
        this.resource = {};
    },

    willDestroy(...args) {
        delete this.resource;
        this._super(...args);
    }
});

Ember.Object.extend({
    init(wrongArgument: number) {} // EXPECT: TS2345
});
