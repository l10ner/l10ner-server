const Sequelize = require('sequelize');

module.exports = function (sequelize) {
  const user = sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      // validate: {
      //   isEmail: true,
      // },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    timestamps: true,
    freezeTableName: true,
  });

  user.sync();

  return user;
};
