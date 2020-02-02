
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
      table.increments();
      table.string('email', 128).unique().notNullable();
      table.string('password', 255).notNullable();
      table.string('name', 128);
      table.string('street');
      table.string('city', 128);
      table.string('state', 3);
      table.integer('zip', 5);
      table.string('airport');
      table.integer('phone');
      table.string('role').defaultTo('traveler');
      table.integer('rating');
      table.string('all-ratings');
  })
  .createTable('flights', table => {
      table.increments();
      table.string('airline', 128).notNullable();
      table.string('airport', 128).notNullable();
      table.string('flight_number').notNullable();
      table.date('flight_date').notNullable();
      table.time('flight_time').notNullable();
  })
  .createTable('user_flights', table => {
      table.increments();
      table.integer('user_id').references('id').inTable('users')
      .onDelete('CASCADE').onUpdate('CASCADE');
      table.integer('flight_id').references('id').inTable('flights')
      .onDelete('CASCADE').onUpdate('CASCADE');
      table.integer('carry_ons');
      table.integer('number_of_children');
      table.boolean('special_needs_req').defaultTo(false);
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('user_flights')
    .dropTableIfExists('flights')
    .dropTableIfExists('users');
};
