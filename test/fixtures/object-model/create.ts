const counter = Ember.Object.create({
    count: 0
});

counter.count += 1;
counter.nonexistent = 123; // EXPECT: TS2339
