const Sequelize = require('sequelize');

module.exports = function (sequelize) {
  const project = sequelize.define('projects', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    owner_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    desc: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    timestamps: true,
    freezeTableName: true,
  });

  project.sync();

  return project;
};
