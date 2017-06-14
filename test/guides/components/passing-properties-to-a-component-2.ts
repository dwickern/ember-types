import Ember from 'ember';

const BlogPostComponent = Ember.Component.extend({});

BlogPostComponent.reopenClass({
  positionalParams: ['title', 'body']
});

export default BlogPostComponent;
