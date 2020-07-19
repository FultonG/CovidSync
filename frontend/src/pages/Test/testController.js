import * as _ from 'lodash';

export async function getUsers() {
  const users = [
    {
      name: 'Arturo',
      age: 20,
    },
    {
      name: 'Bruce',
      age: 18,
    },
    {
      name: 'Gabriel',
      age: 12,
    },
  ];
  return users;
}

export function filterUsers(users) {
  return _.filter(users, (user) => user.age > 12);
}
