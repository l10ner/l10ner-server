// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const dictionariesValues = sequelizeClient.define('dictionaries_values', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    value: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    keyId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    localeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    authorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    comment: {
      type: Sequelize.STRING,
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  dictionariesValues.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return dictionariesValues;
};
