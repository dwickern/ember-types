Router.map(function() {
  this.route('photo', { path: '/photo/:photo_id' }, function() {
    this.route('comment', { path: '/comment/:comment_id' });
  });
});
