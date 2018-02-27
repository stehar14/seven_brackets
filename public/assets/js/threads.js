// var db = require('../models');
$(document).on('ready', function(){

  

});
  // Thread routes 
  var threadApi = {
  // Get all threads - Get / findAll
  getThreads: function () {
    $.get('/api/threads', function(data) {
      console.log(data)
    })
  },
  // Get Thread by id
  getOneThread: function (threadId) {
    $.get('/api/threads/' + threadId, function(data) {
      console.log(data)
    })
  },
  // New Thread - Post / create
  postThread: function (threadObject) {
    $.post('/api/threads', threadObject, function(response) {
      console.log(response)
    })
  },
  // Delete thread - Delete / destroy
  deleteThread: function (threadId) {
    $.delete('/api/threads', threadId, function(response) {
      console.log(response)
    })
  },
  // Confimed solved - Put / update
  updateThread: function (threadId) {
    $.put('/api/threads', threadId, function(response) { 
      console.log(response)
    })
  }
}


// module.exports  = threadApi;