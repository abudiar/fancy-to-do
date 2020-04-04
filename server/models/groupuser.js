'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupUser = sequelize.define('GroupUser', {
    GroupId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  GroupUser.associate = function (models) {
    GroupUser.belongsTo(models.Group);
    GroupUser.belongsTo(models.User);
  };
  return GroupUser;
};