
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('flights')
    .then(function () {
      // Inserts seed entries
      return knex('flights').insert([
        {
          "airline": "Delta",
          "airport": "BDA",
          "flight_number": "F31",
          "flight_date": "2020-03-22",
          "flight_time": "06:00"
        },
        {
          "airline": "Southwest",
          "airport": "MCD",
          "flight_number": "F32",
          "flight_date": "2020-03-23",
          "flight_time": "07:00"
        },
        {
          "airline": "American",
          "airport": "LAX",
          "flight_number": "F33",
          "flight_date": "2020-03-24",
          "flight_time": "08:00"
        }
      ]);
    });
};
