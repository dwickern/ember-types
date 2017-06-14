import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['page', 'filter', {
    category: 'articles_category'
  }],
  category: null,
  page: 1,
  filter: 'recent'
});
