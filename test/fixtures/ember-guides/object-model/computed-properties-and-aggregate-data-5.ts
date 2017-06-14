let todos = todoListComponent.get('todos');
let todo = todos.objectAt(1);
todo.set('isDone', true);

todoListComponent.get('incomplete.length');
// 0

todo = Ember.Object.create({ isDone: false });
todos.pushObject(todo);

todoListComponent.get('incomplete.length');
// 1
