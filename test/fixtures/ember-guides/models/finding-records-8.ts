// GET to /users?filter[email]=tomster@example.com
tom = store.query('user', {
  filter: {
    email: 'tomster@example.com'
  }
}).then(function(users) {
  return users.get("firstObject");
});
