

//
// USER TABLE
//
module.exports = function (sequelize, DataTypes) {
  
 var User = sequelize.define("User", {
     userName : {
     type : DataTypes.STRING,
     allowNull : false, 
     
    },
     rating : DataTypes.DECIMAL(3, 2)      

     
 })

 User.associate = function(models) {
  // Associating User with Replys
  // When an User is deleted, also delete any associated Replys
  User.hasMany(models.Reply, {
    onDelete: "cascade"
  });
};


  // return table name 
  return User;
};
