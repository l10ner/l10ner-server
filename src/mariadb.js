const Sequelize = require('sequelize');

module.exports = function() {
  const app = this;
  const { client, connection: { user, password, database} } = app.get('mariadb');

  const sequelize = new Sequelize(database, user, password, {
    dialect: client,
    logging: false
  });

  app.set('sequelize', sequelize);
};
