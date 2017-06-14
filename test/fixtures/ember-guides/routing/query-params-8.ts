import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: {
    category: 'articles_category'
  },
  category: null
});
