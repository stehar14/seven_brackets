  // Thread routes 
  var threadApi = {
  // Get all threads - Get / findAll
  getThreads: function () {
    $.get('/api/threads', function(data) {
    })
  },
  // Get Thread by id
  getOneThread: function (threadId, cb) {
    $.get('/api/threads/' + threadId, function(data) {
      cb(data)
    })
  },
  // New Thread - Post / create
 
postThread: function (threadObject) {
    $.post('/api/threads', threadObject, function(response) {
    })
  },
  // Delete thread - Delete / destroy
  deleteThread: function (threadId) {
    $.post('/api/threadDelete', {id: threadId}, function(response) {
    })
  },
  // Confimed solved - Put / update
  updateThread: function (threadId) {
    $.post('/api/threadUpdate', threadId, function(response) { 
    })

  },
  solveThread: function (threadId) {
    $.post('/api/threadSolved', threadId, function(response) { 
    })

  }
}




 
// module.exports  = threadApi;


function jqueryStuffs() {
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1791323147839783',
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

    $('.reply-count').each(function(index){
      var this_reply = $(this)
      threadApi.getOneThread($(this).attr('data-threadId'), function(data){
        this_reply.text(data[0].Replies.length)
      })
    })

    $('.category-name').each(function(index){
      var category = $(this).attr('data-userId')
      var category_text; 
      if (category == 1){
        category_text = "Financial Advice"
      } else if (category == 2) {
        category_text = "Family Advice"
      } else if(category == 3) {
        category_text = "Relationship Advice"
      } else if (category == 4) {
        category_text = "Fitness Advice"
      } else if (category == 5) {
        category_text = "Education Advice"
      } else if (category == 6) {
        category_text = "Mental Health Advice"
      }
      
      
      $(this).text(category_text)
    })

  // Event listener for new thread post
  $('#new-thread-submit').on('click', function(event){
    event.preventDefault();
    var current_user;
    var usr_token;
    var newThread;
    // Grabbing current users login token
    FB.getLoginStatus(function(response) {
      usr_token = response.authResponse.userID;
      // Getting user data from database matching the current logged in user
      $.get("/api/checkUser/" + usr_token, function(res) {
        current_user = res.id;
        // Building thread object
        newThread = {
          body : $('#inputpost').val(),
          solved : 0,
          UserId : res.id,
          CategoryId: $('#inputcategory')[0].selectedIndex
        }
      // Calling post ajax method 
      threadApi.postThread(newThread)
      })
    });
  })
  // Event Listener for thread deletes
  $('.delete-thread').on("click", function(event){
    event.preventDefault();
    var usr_token;
    // Getting author and thread ID from the DOM.
    var authorId = $(this).attr('data-userId');
    var threadId = $(this).attr('data-threadId');

        console.log("**********************************************")
        console.log('delete threads')
    // Getting login status to check the current user.
    FB.getLoginStatus(function(response) {
        console.log("**********************************************")
        console.log('fb check')
      usr_token = response.authResponse.userID;
      // If current user is the same as the author
      if (usr_token == authorId) {
        $('#delete-h3').html('Are you sure you want to delete this post?')
        $('#delete-thread-confirm').on('click', function() {
          threadApi.deleteThread(threadId)
          location.reload();
        })
      } else {
          $('#delete-h3').val('')
          $('#delete-h3').val('You are not the author of this post...')
        } 
    })
  });
  // Event Listener for thread update
  $('.update-thread').on("click", function(event){
      event.preventDefault();
      var usr_token;
      // Getting author and thread ID from the DOM.
      var poster_id = $(this).attr('data-userId');
      var threadId = $(this).attr('data-threadId');
      var current_words = $(`#thread${threadId}-body`).text()
      
      // Getting login status to check the current user.
      FB.getLoginStatus(function(response) {
        usr_token = response.authResponse.userID;
        // If current user is the same as the author
        if (usr_token == poster_id) {
          $('#update-thread-text').val(current_words)
          $('#update-thread-confirm').on('click', function() {
            var update_object = {
              id: threadId,
              body: $('#update-thread-text').val()
            }
            threadApi.updateThread(update_object)
            location.reload();
          })
        } else {
          $('#update-thread-text').val('')
            $('#update-thread-text').val('You are not the author of this post...')
        } 
      })
    });


    $('#solved-thread').on("click", function(event){
      event.preventDefault();
      var usr_token;
      // Getting author and thread ID from the DOM.
      threadApi.getOneThread
      var threadId = $(this).attr('data-threadId');
      
      // Getting login status to check the current user.
      FB.getLoginStatus(function(response) {
        usr_token = response.authResponse.userID;
        // If current user is the same as the author
        if (usr_token == authorId) {
          $('#solve-thread-confirm').on('click', function() {
            
            threadApi.solveThread()
          });
        } else {
            $('#delete-h3').val('');
            $('#delete-h3').val('You are not the author of this post...')
        } 
      })
    });


    // Event listener for connection accept
    $('#accept-connection').on("click", function(event){
      event.preventDefault();
      var usr_token;
      // Getting author and thread ID from the DOM.
      var reply_authorID = $('#deleteReply').attr('data-userId')
      var authorId = $(this).attr('data-userId');
      var threadId = $(this).attr('data-threadId');
      var current_words = $(`#thread${threadId}-body`).text()
      
      // Getting login status to check the current user.
      FB.getLoginStatus(function(response) {
        usr_token = response.authResponse.userID;
        // If current user is the same as the author
        if (usr_token == authorId) {

        }
      })
    }); 
  }


