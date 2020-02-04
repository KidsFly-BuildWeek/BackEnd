const bc = require('bcrypt');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          email: "tim@tim.com",
          password: bc.hashSync("tim", 10),
          role: "admin"
        },
        {
          email: "jeff@jeff.com",
          password: bc.hashSync("jeff", 10)
        },
        {
          "email": "tom@tom.com",
          "password": bc.hashSync("tom", 10)
        }
      ]);
    });
};
