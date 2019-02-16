module.exports = function (sequelize, DataTypes) {
  
  var Reply = sequelize.define("Reply", {
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [10]
    }
  });   
   
  Reply.associate = function(models) {
    // This makes it so a Reply can't exist without a user.
    Reply.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Reply.belongsTo(models.Thread, {
      foreignKey : {
        allowNull : false
      }
    });
  };
  // return table name 
  return Reply;
};