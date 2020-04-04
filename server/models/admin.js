'use strict';
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    GroupId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  Admin.associate = function (models) {
    Admin.belongsTo(models.Group);
    Admin.belongsTo(models.User);
  };
  return Admin;
};