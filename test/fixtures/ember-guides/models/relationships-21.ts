let blogPost = this.get('store').peekRecord('blog-post', 1);
let comment = this.get('store').createRecord('comment', {
  blogPost: blogPost
});
comment.save();
