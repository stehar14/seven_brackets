$(document).ready(function() {


// Click events for new reply
// MAY NEED TO CHANGE... ACTUALLY MORE THAN LIKELY WILL
// WHAT THESE ON CLICKS ARE LISTENING ON!!!!!!!!!!
$(document).on("click", "button.newReply", handleReply);
$(document).on("click", "button.delete", handleDelete);
$(document).on("click", "button.edit", handleReplyEdit);




  function handleReply(event) {
    event.preventDefault();
    // Wont submit the Reply if we are missing a body
    if (!bodyInput.val().trim()) {
      return;
    }
    // Constructing a newReply object to hand to the database
    var newReply = {
      body: bodyInput
        .val()
        .trim(),
        // need to figure out where these ids willl come from  somewhere on DOM?
        UserId: UserId,
        ThreadId : ThreadId,
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


  function handleDelete(event) {
      event.preventDefault();
          var replyToDelete = {
            // Again getting the id somewhere form the dom? 
            //In burger I attached it to the button  
            id : this.id
          }

         deleteReply(replyToDelete)
     
  }


 function deleteReply(replyToDelete)
  $.ajax({
    method: "DELETE",
    url : "api/deleteReply",
    data : replyToDelete
}).then(
    function() {
        // redirect to a confirmation of deleteion.
        
    }
)


function  handleEdit(event){
    event.preventDefault();
    var id = this.id;
    var editedReply = {
        body: bodyInput
        .val()
        .trim(),
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







});