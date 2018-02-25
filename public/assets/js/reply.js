$(document).ready(function() {


// Click events for new reply
// MAY NEED TO CHANGE... ACTUALLY MORE THAN LIKELY WILL
// WHAT THESE ON CLICKS ARE LISTENING ON!!!!!!!!!!
$(document).on("click", "button.newReply", handleReply());
$(document).on("click", "button.delete", handleDelete());
$(document).on("click", "button.edit", handleReplyEdit());
$(document).on("click", // star buutons? each one having a value of one to five?
, handleRatingUpdate);



  function handleReply(event, bodyInput, userId, threadId) {
    event.preventDefault();
    // Wont submit the Reply if we are missing a body
    if (!bodyInput) {
      return;
    }
    // Constructing a newReply object to hand to the database
    var newReply = {
      body: bodyInput,
        
        // need to figure out where these ids willl come from  somewhere on DOM?
       userId: userId,
        threadId : threadId,
    }; 

      postReply(newReply);
}


// This function does an API call to make a reply
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






  function handleDelete(event, userId, threadId) {
      event.preventDefault();
          var replyToDelete = {
            // Again getting the id somewhere form the dom? 
            
            id : id
          }
          // Condiational to make sure the post with a a corresponding thread and 
          // UserID can edit
        if(threadId === threadId && userId === userId   ){
         deleteReply(replyToDelete)
        }
     
  }





  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + id
    })
    .then(function() {
      getPosts(postthreadSelect.val());
    });
  }


 function deleteReply(event, userId, threadId)
  $.ajax({
    method: "DELETE",
    url : "api/deleteReply",
    data : replyToDelete
}).then(
    function() {
        // redirect to a confirmation of deleteion.
        
    }
)


function  handleEdit(event, bodyInput, userId, threadId){
    event.preventDefault();
    if(userId )
    var editedReply = {
        body: bodyInput
      
    };
    editReply(id ,editedReply);
}





function editedReply(id , editedReply){
    $.ajax({
      method : "PUT",
      url : "api/editReply/" + id,
      data : editedReply  
    }).then(
        function(){
        location.reload()
        // ?????
        }
    )
}



// NEED TO FIGURE OUUT WHICH RATING I'M TARGETING
// THAT IS WHO DOES IT BELONG TO??/ USERID SINCE
// RATING IS IN THE USERMODEL

function handleRatingUpdate(event){
  event.preventDefault();
  var currentRating = $('.') // stored on DOM?
  var addScore = this.star.val() // each star will have a value of 1 to 5 attached
  var updatedRating = j /// j is a place holder???


updateRating(updatedRating);

}

function updateRating(updatedRating){
    $.ajax({
        method : "PUT",
        url : "api/rating",
        data : updatedRating
    }).then(
        function(){
            // Refresh rating div ??
        }
    )

}



});



