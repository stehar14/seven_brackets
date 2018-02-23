var db = require('../models');


module.exports = function(app) {
 
    
    // Show the replies on a thread
    app.get("api/showReplies", function(req,res){
        db.Reply.findAll({
            include : [db.User]
        }).then(function(dbReplies){
            res.json(dbAuthor);
        })
    });
    
    
    // post a reply to a specified thread

    app.post("/api/newReply", function(req,res){
        console.log("git api endpint");
        console.log(req.body);
        db.Reply.create(
            req.body
        )
    .then(function(dbReply){
        res.json(dbReply);
    })

});
     


    // edit a reply on a thread
     app.put("/api/editReply", function(req, res){
         db.Reply.update(
             req.body.body,
             {
             where : {
                 id : req.body.id
             }
             }).then(function(dbReply){
                 res.json(dbReply)
             })
     })


    // delete reply

    app.delete("/api/deleteReply", function(req,res){
        db.Reply.destroy({
            where : {
                id : req.body.id
                // or params?
            }
        }).then(function(dbReply){
            res.json(dbReply);
        })
    })







    }