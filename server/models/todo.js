'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Title can't be empty"
        }
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          msg: "Due date must be a date"
        }
      }
    },
  }, {});
  Todo.associate = function (models) {
    Todo.belongsTo(models.User);
    Todo.belongsTo(models.Group);
  };
  return Todo;
};