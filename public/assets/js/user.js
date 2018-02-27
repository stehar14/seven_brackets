$(document).ready(function() {


    $(document).on("click", "button.newUser", handleNewUser(event, userName, rating, img, fbtoken));
    $(document).on("click", "button.allUsers", allUsers);
    $(document).on("click", ".button.star", handleRatingUpdate(event, currentRating, addedRating, totalRatings));


// I assume we will grab the params below from the fbtoken

    function handleNewUser(event, userName, rating, img, fbtoken){
          event.preventDefault();
          var newUser = {
            userName : userName,
            rating : rating,
            img_url : img,
            fbtoken: fbtoken
          }
        createUser(newUser);
    }

// Actually creates the the User
    function createUser(newReply) {
        $.ajax({
          method: "POST",
          url: "/api/newReply",
          data : newReply
        })
        .then(function() {
            //  or some redirect
          location.reload();
          
        });
      }




      function allUsers(event){
        event.preventDefault();
        $.ajax({
            method : "GET",
            url : "/api/findAllUsers"
        }).then(function(){

        })
      }





///// This sysntax will be handled based on thats on the DOM but left it in
// as i think it could prove useful to ref
// 
//var currentRating = $('.') // stored on DOM?
//var addedRating = this.star.val() // each star will have a value of 1 to 5 attached
// var total ratings =

function handleRatingUpdate(event, currentRating, addedRating, totalRatings){
        event.preventDefault();
        var newTotalRatings = totalRatings + 1
        var updatedRating = (currentRating * totalRatings) / newTotalRatings;
      

        var updatedRatingInfo = {
            rating : updatedRating,
            totalRatings : newTotalRatings
        }
      
      updateRating(updatedRatingInfo);
      
      }
      
      function updateRating(updatedRatingInfo){
          $.ajax({
              method : "PUT",
              url : "api/rating",
              data : updatedRatingInfo
          }).then(
              function(){
                  // Refresh rating div ??
              }
          )
      
      }
      
      
      
      });
      

















