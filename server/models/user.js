'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: {
          msg: "Email cannot be empty"
        },
        notNull: {
          msg: "Email cannot be null"
        }
      }
    },
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