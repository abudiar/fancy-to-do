'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING
  }, {});
  Group.associate = function (models) {
    Group.hasMany(models.Todo);
    Group.belongsToMany(models.User, { through: models.GroupUser });
    Group.hasMany(models.Admin);
    Group.hasMany(models.Invite);
  };
  return Group;
};