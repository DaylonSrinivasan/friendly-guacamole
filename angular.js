var app = angular.module('myApp', []);
app.directive('chatRoom', function() {
  return {
    template: "<div id='myChatRoom'></div>" +
    "<input type='text' ng-model='message'></input>" +
    "<button ng-click='update()'>Submit</button>"
  };
});
app.controller('myCtrl', function($scope, $window, $element, $attrs) {
  firebase.database().ref('chat').on('child_added', function(data) {
    var p = angular.element('<p>' + data.val() + '</p>');
    $element.find('#myChatRoom').append(p);
    });

  firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
      console.log("User on");
      $scope.userOn = true;
      $scope.userEmail = user.email;
    }
    else{
      console.log("No user");
      $scope.userOn = false;
    }
    $scope.$digest();
  });

  $scope.$watch('userOn');
  $scope.update = function() {
    firebase.database().ref('chat').push($scope.message);
  }
  $scope.createNewUser = function() {
    firebase.auth().createUserWithEmailAndPassword($scope.email, $scope.password).catch(function(error) {
      //Handle Errors
      console.log("error code: " + error.code);
      console.log("error message: " + error.message);
    });
  }

  $scope.signInUser = function() {
    firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password).catch(function(error) {
      //Handle Errors
      console.log("error code: " + error.code);
      console.log("error message: " + error.message);
    })
  }
  $scope.signOut = function() {
    firebase.auth().signOut().then(function() {
      console.log("sign out successful");
    }, function(error) {
      console.log("error message: " + error.message);
    });
  }
});
