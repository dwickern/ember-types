Router.map(function() {
  this.route('photos', function(){
    this.route('photo', { path: '/:photo_id' }, function(){
      this.route('comments');
      this.route('comment', { path: '/comments/:comment_id' });
    });
  });
});
