const Sequelize = require('sequelize');

// const Sequelize = require('sequelize');
//
// module.exports = function() {
//   const app = this;
//   const { client, connection: { user, password, database} } = app.get('mariadb');
//
//   const sequelize = new Sequelize(database, user, password, {
//     dialect: client,
//     logging: false
//   });
//
//   app.set('sequelize', sequelize);
// };




module.exports = function () {
  const app = this;
  const { client, connection: { user, password, database} } = app.get('mariadb');
  const sequelize = new Sequelize(database, user, password, {
    dialect: client,
    logging: false,
    define: {
      freezeTableName: true
    }
  });
  const oldSetup = app.setup;

  app.set('sequelize', sequelize);

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach(name => {
      if ('associate' in models[name]) {
        models[name].associate(models);
      }
    });

    // Sync to the database
    sequelize.sync();

    return result;
  };
};
