'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupTodo = sequelize.define('GroupTodo', {
    GroupId: DataTypes.INTEGER,
    TodoId: DataTypes.INTEGER
  }, {});
  GroupTodo.associate = function (models) {
    GroupTodo.belongsTo(models.Group);
    GroupTodo.belongsTo(models.Todo);
  };
  return GroupTodo;
};