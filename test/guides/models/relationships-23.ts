let blogPost = this.get('store').peekRecord('blog-post', 1);
let comment = this.get('store').peekRecord('comment', 1);
comment.set('blogPost', blogPost);
comment.save();
