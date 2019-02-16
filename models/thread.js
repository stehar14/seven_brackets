// Thread Table
// 
// Confident about this one after doing more research on sequlize and associations
module.exports = function(sequelize, DataTypes) {
  var Thread = sequelize.define("Thread", {
    body : {
      type : DataTypes.TEXT,
      allowNull : false,
      validate : {
        len: [10]
      }
    },
    solved : {
      type : DataTypes.BOOLEAN,
      allowNull : false,
      defaultValue : false
    },
    CategoryId: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  })
    
  Thread.associate = function(models) {
    Thread.belongsTo(models.User)
    Thread.belongsTo(models.Category)
    Thread.hasMany(models.Reply)
  }
  return Thread;
}