
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('connection_flights').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('connection_flights').insert([
        {flight_id: 1, user_id: 1, connection_id: 1},
        {flight_id: 2, user_id: 2, connection_id: 2},
        {flight_id: 3, user_id: 3, connection_id: 3}
      ]);
    });
};
