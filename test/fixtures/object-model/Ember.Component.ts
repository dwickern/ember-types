
Ember.Component.extend();
Ember.Component.extend({});

Ember.Component.extend({
    classNames: [ 'alert-detail' ],
    classNameBindings: ['isUrgent'],
    isUrgent: false,

    didInsertElement(...args) {
        this._super(...args);

        this.element.querySelectorAll('.child-class');
        this.$('.child-class');
    },

    actions: {
        selected() {
            if (this.isDestroyed) {
                return;
            }

            this.set('isUrgent', true);
        }
    }
});

Ember.Component.extend({
    init() {
        this.isDestryed; // EXPECT: TS2339
    }
});

Ember.Component.extend({
    classNameBindings: 42 // EXPECT: TS2345
});


Ember.Component.extend({
    actions: {
        notAnAction: 42 // EXPECT: TS2345
    }
});
