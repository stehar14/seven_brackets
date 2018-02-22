
module.exports = function (sequelize, DataTypes) {
  
    var Reply = sequelize.define("Reply", {
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
   
        
    
   
    Reply.associate = function(models) {
    // This makes it so a Reply can't exist without an author.
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