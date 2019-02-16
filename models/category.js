module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category",{
    categoryName : DataTypes.STRING
  })
  Category.associate =  function(models){
    Category.hasMany(models.Thread, {
      onDelete: "cascade"
    });
  };
  return Category;
}