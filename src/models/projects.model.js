/* eslint-disable no-console */

// projects-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.

module.exports = function (app) {
  const db = app.get('knexClient');

  db.schema.createTableIfNotExists('projects', table => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('owner_id').notNullable();
    table.string('desc');
    table.timestamp('ctime').defaultTo(db.fn.now());
  })
  .then(() => console.log('Updated projects table'))
  .catch(e => console.error('Error updating projects table', e));

  return db;
};
