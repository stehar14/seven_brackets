$(document).ready(function() {


// Click events for new reply
// MAY NEED TO CHANGE... ACTUALLY MORE THAN LIKELY WILL
// WHAT THESE ON CLICKS ARE LISTENING ON!!!!!!!!!!
$(document).on("click", ".submit", handleReply);
//$(document).on("click", "button.delete", handleDelete());
//$(document).on("click", "button.edit", handleReplyEdit());




  function handleReply(event, bodyInput, userId, threadId) {
    event.preventDefault();
    // Wont submit the Reply if we are missing a body
    // if (!bodyInput) {
    //   return;
    // }
    // Constructing a newReply object to hand to the database
    var newReply = {
      body: $('#bodyInput').val(),
        
        // need to figure out where these ids willl come from  somewhere on DOM?
       UserId: $('#userId').val(),
        ThreadId : $('#threadId').val(),
    }; 
      console.log(newReply);
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






  function handleDelete(event, userId) {
      event.preventDefault();
      var replyId = 
           
          // Condiational to make sure the post with a a corresponding thread and 
          // UserID can edit
       // if(userId === userId){
         deleteReply(replyId)
      //  }
     
  }



 function deleteReply(replyId){
  $.ajax({
    method: "DELETE",
    url : "api/deleteReply/" + replyId,
    
}).then(
    function() {
        // redirect to a confirmation of deleteion.
        
    }
)

 }


function  handleEdit(event, bodyInput, userId){
    event.preventDefault();
    var id = $(this.id)
    var editedReply = {
        body: bodyInput
      
    };
    // Check it against something?
    //if(userId == )
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

});




