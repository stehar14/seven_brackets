module.exports = function (sequelize, DataTypes){
  var Ally =  sequelize.define("Ally", {
    Ally1 : {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    Ally2 : {
      type : DataTypes.INTEGER,
      allowNull : false
    }
  })
  return Ally;
}