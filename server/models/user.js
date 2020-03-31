'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Username cannot be empty"
        },
        notNull: {
          msg: "Username cannot be null"
        }
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password cannot be empty"
        },
        notNull: {
          msg: "Password cannot be null"
        }
      }
    }
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Todo);
  };
  return User;
};