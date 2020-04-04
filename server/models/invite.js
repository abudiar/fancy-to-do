'use strict';
module.exports = (sequelize, DataTypes) => {
  const Invite = sequelize.define('Invite', {
    GroupId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  Invite.associate = function (models) {
    Invite.belongsTo(models.Group);
    Invite.belongsTo(models.User);
  };
  return Invite;
};