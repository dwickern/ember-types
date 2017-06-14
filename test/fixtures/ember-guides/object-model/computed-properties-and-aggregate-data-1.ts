export default Ember.Component.extend({
  todos: null,

  init() {
    this.set('todos', [
      Ember.Object.create({ isDone: true }),
      Ember.Object.create({ isDone: false }),
      Ember.Object.create({ isDone: true }),
    ]);
  },

  incomplete: Ember.computed('todos.@each.isDone', function() {
    let todos = this.get('todos');
    return todos.filterBy('isDone', false);
  })
});
