

    function replyjQuery(){

        window.fbAsyncInit = function() {
          FB.init({
            appId      : '2286711464907294',
            cookie     : true,  // enable cookies to allow the server to access 
                                // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.8' // use graph api version 2.8
          });
        };
    
        // Load the SDK asynchronously
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "https://connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
         
        }(document, 'script', 'facebook-jssdk'));
    
    
    
        var ajaxUserData;
        var ThreadId;
        var replyId;
        var userId;
        var userObj;
        var usr_token;
    
    
    
         
    
    
    
          $('.reply').on('click', function(event){
      
         ThreadId = $(this).attr('data-threadId')
         FB.getLoginStatus(function(response) {
          usr_token = response.authResponse.userID;
          console.log(usr_token)
          ajaxUserData = getUserByToken(usr_token, function(cb){        
             
                  userObj = cb;
                  
                   console.log('post reply ajax user data' , userObj)
             
          $('#offerhelp').on("click", function(event) {
             
        //event.preventDefault();
        var bodyInput =  $("#inputreply").val();
        //Wont submit the Reply if we are missing a body
         if (!bodyInput) {
           return;
         }
        // Constructing a newReply object to hand to the database
        var newReply = {
            body: bodyInput,
            
            // need to figure out where these ids willl come from  somewhere on DOM?
            UserId: userObj.id,
            fbToken : usr_token,
            ThreadId : ThreadId,
            
           
        }; 
          console.log(newReply);
          postReply(newReply);
    });
          });
          });
          });
    //   <img class='reply-img' data-userImgId = '{{this.id}}' src="" alt="" />
    // 
    
        function popReplyImages (){
    $('.reply-img').each(function(index){
         var this_reply = $(this)
         getUserById($(this).attr('data-userImgId'),  function(data){
           console.log(data.img_url)
           console.log($(this))
           this_reply.attr('src' , data.img_url)
    
         })
       })
    
        }
        popReplyImages()
    
    $(document).on('click', '#deleteReply', function(event){
        
        
        console.log('del')
             replyId = $(this).attr('data-replyId')
             userId = $(this).attr('data-userId')
              ajaxUserData = getUserById(userId, function(cb){        
             
                  userObj = cb;
                  
              
             console.log(replyId);
             console.log('delete reply userId' , userId)
             console.log('delte reply ajax user data', userObj.fbtoken)
        FB.getLoginStatus(function(response) {
          usr_token = response.authResponse.userID;
          // If current user is the same as the author
          if (usr_token == userObj.fbtoken) {
               $('#delete-reply-confirm').show()
             $('#delete-reply-h3').text('Are you sure you want to delete this reply? It cannot be undone.')
              $('#delete-reply-confirm').on('click', function() {
                        console.log('del confirmation')
                       
                       deleteReply(replyId)
                       
              
                        
    
              })
    
          }
    
          else {
              $('#delete-reply-h3').text('This is not your reply? Why are you trying to delete it? Come on man...')
              $('#delete-reply-confirm').hide()
              
              
          } 
                    })
               
                   
          
              })
    })
    
    
    
    var editId;
    var replyBody;
    $(document).on('click','#editReply', function(event){
        editId = $(this).attr('data-replyId')
        userId = $(this).attr('data-userId')
            
            
            
            ajaxUserData = getUserById(userId, function(cb){
                userObj = cb;
                FB.getLoginStatus(function(response) {
          usr_token = response.authResponse.userID;
          // If current user is the same as the author
          if (usr_token == userObj.fbtoken) {
                console.log('line 386' , userObj)
                replyBody = $(`#reply-${editId}-body`).text()
                console.log(editId);
                console.log(replyBody);
                console.log('edit reply userId' , userId)
                console.log('edit reply ajax user data', userObj.fbtoken)
                 $('#edit-reply-confirm').show()
    
        $('#edit-reply-text').text(replyBody)
            $('#edit-reply-confirm').on('click', function() {
                  replyBody = $('#edit-reply-text').val()
                   var editedReply = {
                      body : replyBody,
                      
                     }
                        console.log("editId inside the confirm " , editId)
                        console.log("edited reply body inside the confirm " , replyBody)
                        
                        editReply(editId, editedReply)
                    })
    
          }
    
          else{
               $('#edit-reply-text').text("This 'isn't' your reply, you 'can't' edit this")
               $('#edit-reply-confirm').hide()
             
          }
               
              // Conditional to make sure the post with a a corresponding thread and 
              // UserID can edit
           // if(userId === userId){
             
          //  } 
              })
    })
    });
    
    
    
    
    function postReply(newReply) {
        $.ajax({
          method: "POST",
          url: "/api/newReply",
          data : newReply
        })
        .then(function() {
          location.reload();
          
        });
      }
    
    
       function deleteReply(replyId){
      $.ajax({
        method: "DELETE",
        url : "/api/deleteReply/" + replyId,
        
    }).then(
        function() {
            // redirect to a confirmation of deleteion.
            
        }
    )
    
     }
    
    
    
    function getUserByToken(fbToken, cb){
        $.ajax({
            url : '/api/checkUser/' + fbToken,
            method : 'GET'
        }).done(function(res){
            cb(res);
        })
    }
    
    
    function getUserById(userId, cb){
      $.ajax({
                url: '/api/findUser/' + userId,
                method: "GET"
              }).done(function(res) {
                 cb(res);
    
           })
           
    }
    
     function editReply(editId, editedReply){
        $.ajax({
          method : "PUT",
          url : "/api/editReply/" + editId,
          data : editedReply  
        }).then(
            function(){
            location.reload()
            // ?????
            }
        )
    }

}
    
    
