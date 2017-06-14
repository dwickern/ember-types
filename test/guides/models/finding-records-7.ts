store.queryRecord('user', {}).then(function(user) {
  let username = user.get('username');
  console.log(`Currently logged in as ${username}`);
});
