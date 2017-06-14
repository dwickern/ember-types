import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['category'],
  category: null,

  filteredArticles: Ember.computed('category', 'model', function() {
    let category = this.get('category');
    let articles = this.get('model');

    if (category) {
      return articles.filterBy('category', category);
    } else {
      return articles;
    }
  })
});
