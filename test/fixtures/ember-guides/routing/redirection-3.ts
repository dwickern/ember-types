Router.map(function() {
  this.route('posts');
  this.route('post', { path: '/post/:post_id' });
});
