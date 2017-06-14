let user = User.create({ firstName: 'Tom', lastName: 'Huda' });
user.set('firstName', 'Yehuda');
user.set('lastName', 'Katz');
user.set('firstName', 'Tom');
user.set('lastName', 'Huda');
