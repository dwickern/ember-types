let comment = this.get('store').peekRecord('comment', 1);

comment.get('blogPost').then((blogPost) => {
  // the blogPost is available here
});
