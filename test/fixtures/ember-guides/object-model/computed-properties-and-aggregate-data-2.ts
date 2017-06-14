export default Ember.Component.extend({
  todos: null,

  init() {
    this.set('todos', [
      Ember.Object.create({ isDone: true }),
      Ember.Object.create({ isDone: false }),
      Ember.Object.create({ isDone: true }),
    ]);
  },

  incomplete: Ember.computed.filterBy('todos', 'isDone', false)
});
