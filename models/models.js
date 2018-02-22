// require Sequelize
var Sequelize = require('sequelize');
// make sequelize object using connection export
var sequelize = require('../config/connection.js');



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
  // Associating User with Posts
  // When an User is deleted, also delete any associated Posts
  User.hasMany(models.Post, {
    onDelete: "cascade"
  });
};


  // return table name 
  return User;
};

//
// POST(S) Table
//

module.exports = function (sequelize, DataTypes) {
  
  var Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [20]
    }
  });   
 
      
  
 
  Post.associate = function(models) {
  // This makes it so a post can't exist without an author.
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
 
   // return table name 
   return Post;
 };

// 
// Thread Table
// 
// COnfident about this one after doing more research on sequlize and associations
module.exports = function(sequlize, DataTypes) {
   var Thread = sequelize.define("Thread", {
    category : {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
      len: [5]
      }
    },
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
      
     
    


   })
 
  Thread.associate = function(models) {
    Thread.belongsTo(User.models)
    Thread.

  }
  return Thread;


}

module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category",{
   categoryName : DataTypes.STRING

  })
  // Category.associate = function(models){

  // }
}




module.exports = function(sequelize, DataTypes) {
  var Burgers = sequelize.define("Burgers", {
    burgerName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8]
      }
    },
    devoured : { 
      type: DataTypes.BOOLEAN
      , allowNull: false
      , defaultValue: false }
  });

  
  return Burgers;

  
};





module.exports = function(sequelize, DataTypes) {
  var Author = sequelize.define("Author", {
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING
  });

  Author.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Author.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };

  return Author;
};

