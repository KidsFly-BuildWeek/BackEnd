
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
      table.increments();
      table.string('email', 128).unique().notNullable();
      table.string('password', 255).notNullable();
      table.string('name', 128);
      table.string('street');
      table.string('city', 128);
      table.string('state', 3);
      table.integer('zip', 5).unsigned();
      table.string('airport');
      table.integer('phone').unsigned();
      table.string('role').defaultTo('traveler');
      table.integer('rating').unsigned();
      table.string('all-ratings');
  })
  .createTable('flights', table => {
      table.increments();
      table.string('airline', 128).notNullable();
      table.string('airport', 128).notNullable();
      table.string('flight_number').notNullable().unique().index();
      table.date('flight_date').notNullable();
      table.time('flight_time').notNullable();
  })
  .createTable('connection', table => {
    table.increments();
    table.string('email', 128).unique().notNullable();
    table.string('password', 255).notNullable();
    table.string('name', 128);
  })
  .createTable('connection_flights', table => {
    table.integer('flight_id').unsigned().references('id').inTable('flights').onDelete('RESTRICT').onUpdate('CASCADE');
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('RESTRICT').onUpdate('CASCADE');
    table.integer('connection_id').unsigned().references('id').inTable('users').onDelete('RESTRICT').onUpdate('CASCADE');
    table.boolean('completed').defaultTo(false);
  })
  .createTable('user_flights', table => {
      table.increments();
      table.integer('user_id').unsigned().references('id').inTable('users')
      .onDelete('RESTRICT').onUpdate('CASCADE');
      table.integer('flight_id').unsigned().unique().references('id').inTable('flights')
      .onDelete('RESTRICT').onUpdate('CASCADE');
      table.integer('carry_ons').unsigned().notNullable();
      table.integer('number_of_children').unsigned().notNullable();
      table.boolean('special_needs_req').defaultTo(false);
      table.boolean('completed').defaultTo(false);
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('connection_flights')
    .dropTableIfExists('connection')
    .dropTableIfExists('user_flights')
    .dropTableIfExists('flights')
    .dropTableIfExists('users');
};
