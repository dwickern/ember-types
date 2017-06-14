let blogPost = this.get('store').peekRecord('blog-post', 1);

blogPost.get('comments').then((comments) => {
  // now we can work with the comments
});
