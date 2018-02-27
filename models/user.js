

//
// USER TABLE
//
module.exports = function (sequelize, DataTypes) {
  
 var User = sequelize.define("User", {
     userName : {
     type : DataTypes.STRING,
     allowNull : false, 
    },
    rating : { 
        type: DataTypes.DECIMAL(3, 2),
        default : null,   
     },
     fbtoken : {
      type : DataTypes.STRING,
      allowNull: false
     },
     img_url: {
      type: DataTypes.STRING,
      allowNull: true
     }
 })

 User.associate = function(models) {
  // Associating User with Replys
  // When an User is deleted, also delete any associated Replys
  User.hasMany(models.Reply, {
    onDelete: "cascade"
  });

  User.hasMany(models.Thread, {
    onDelete: "cascade"
  });
};


  // return table name 
  return User;
};
