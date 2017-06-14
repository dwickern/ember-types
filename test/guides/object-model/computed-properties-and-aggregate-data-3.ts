export default Ember.Component.extend({
  todos: null,

  init() {
    this.set('todos', [
      Ember.Object.create({ isDone: true }),
      Ember.Object.create({ isDone: false }),
      Ember.Object.create({ isDone: true }),
    ]);
  },

  selectedTodo: null,
  indexOfSelectedTodo: Ember.computed('selectedTodo', 'todos.[]', function() {
    return this.get('todos').indexOf(this.get('selectedTodo'));
  })
});
