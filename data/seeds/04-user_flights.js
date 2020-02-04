
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_flights').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('user_flights').insert([
        {
          "user_id": 1,
          "flight_id": 1,
          "carry_ons": "3",
          "number_of_children": "3",
          "special_needs_req": false
        },
        {
          "user_id": 2,
          "flight_id": 2,
          "carry_ons": "3",
          "number_of_children": "3",
          "special_needs_req": true
        },
        {
          "user_id": 3,
          "flight_id": 3,
          "carry_ons": "3",
          "number_of_children": "3",
          "special_needs_req": false,
          "completed": true
        }
      ]);
    });
};
