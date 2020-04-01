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
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Name cannot be empty"
        },
        notNull: {
          msg: "Name cannot be null"
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
    },
    use_google: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Todo);
  };
  return User;
};