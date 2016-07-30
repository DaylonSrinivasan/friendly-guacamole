var app = angular.module('myApp', []);
app.directive('chatRoom', function() {
  return {
    template: "<div id='myChatRoom'></div>"
  };
});
app.controller('myCtrl', function($scope, $element, $attrs) {
  firebase.database().ref('chat').on('child_added', function(data) {
    var p = angular.element("<p>" +data.val() +"</p");

    $element.find('div').append(p);
  });
  $scope.update = function() {
    firebase.database().ref('chat').push($scope.message);
  }
  $scope.createNewUser = function() {
    if($scope.newEmail && $scope.newPassword) {
      firebase.auth().createUserWithEmailAndPassword($scope.newEmail, $scope.newPassword).catch(function(error) {
        //Handle Errors
        console.log("error code: " + error.code);
        console.log("error message: " + error.message);
      });
    }
  }
  $scope.signOut = function() {
    firebase.auth().signOut().then(function() {
      console.log("sign out successful");
    }, function(error) {
      console.log("error message: " + error.message);
    });
  }
});
