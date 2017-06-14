store.findRecord('post', 1).then(function(post) {
  post.get('title'); // => "Rails is Omakase"

  post.set('title', 'A new post');

  post.save(); // => PATCH to '/posts/1'
});
