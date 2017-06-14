let comment = this.get('store').peekRecord('comment', 1);
comment.set('blogPost', null);
comment.save();
