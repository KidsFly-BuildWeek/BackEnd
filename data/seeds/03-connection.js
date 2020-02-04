const bc = require('bcrypt');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('connection').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('connection').insert([
        {
          "name": "tim",
          "email": "tim@tim.com",
          "password": bc.hashSync("tim", 10)
        },
        {
          "name": "tom",
          "email": "tom@tom.com",
          "password": bc.hashSync("tom", 10)
        },
        {
          "name": "jeff",
          "email": "jeff@jeff.com",
          "password": bc.hashSync("jeff", 10)
        }
      ]);
    });
};
