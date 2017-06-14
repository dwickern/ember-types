let blogPost = this.get('store').peekRecord('blog-post', 1);
let comment = this.get('store').createRecord('comment', {
});
blogPost.get('comments').pushObject(comment);
comment.save().then(function () {
  blogPost.save();
});
