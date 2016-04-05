// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
var myFirebaseRef = new Firebase("https://testdatabase12345.firebaseio.com/");

function newQuestion(data) {
  var question = $("#question").val();
  myFirebaseRef.set({
    question: question,
    answers: [],
    open: true
  }, function(error) {
    if (error) {
      $("#message").show().html("An error has occurred.").fadeOut(2000);
    } else {
      $("#message").show().html("Current question: " + question);
    }
  });
};

// Below code would fetch all answers
myFirebaseRef.child("answers").on("value", function(snapshot) {
  var yesCount = 0;
  var noCount = 0;
  // $("#answers").html(""); // empty the html

  snapshot.forEach(function(child) {
    yesCount += child.val().response === "Yes" ? 1 : 0;
    noCount += child.val().response === "No" ? 1 : 0;
    // $("#answers").append(child.val().response);
  })
  $("#yes-count").html(yesCount);
  $("#no-count").html(noCount);
});

myFirebaseRef.child("question").on("value", function(snapshot) {
  $("#question-stem").html(snapshot.val());
  $("button").attr("disabled", false);
});

function respond(response) {
  $("button").attr("disabled", true);
  myFirebaseRef.child("answers").push({response: response});
};


// myFirebaseRef.child("answers").orderByChild("response").equalTo"yes").on("child_added", function(snapshot) {
//   console.log(snapshot.key());
// });

// Only get new responses
// myFirebaseRef.child("answers").on("child_added", function(snapshot) {
  // $("#answers").append(snapshot.val().response);
// });
