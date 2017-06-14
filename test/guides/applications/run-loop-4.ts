let user = User.create({ firstName: 'Tom', lastName: 'Huda' });
user.set('firstName', 'Yehuda');
// {{firstName}} and {{fullName}} are updated

user.set('lastName', 'Katz');
// {{lastName}} and {{fullName}} are updated
