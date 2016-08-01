var app = angular.module('myApp', []);
app.directive('chatRoom', function() {
  return {
    template: "<div id='myChatRoom'></div>" +
    "<input type='text' ng-model='message' ng-keypress='checkEnter($event)' class='form-control' placeholder='Say something!'></input>"
  };
});
app.controller('myCtrl', function($scope, $window, $element, $attrs) {
  firebase.database().ref('chat').on('child_added', function(data) {
    var p = angular.element('<p><strong>' + data.val().user +": </strong>" + data.val().message + '</p>');
    $element.find('#myChatRoom').append(p);
    });

  firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
      $scope.userOn = true;
      $scope.userEmail = user.email;
      if(!user.displayName){
        $element.find('#usernameModal').modal('show');
      }
      else{
        $scope.displayName = user.displayName;
      }
    }
    else{
      $scope.userOn = false;
    }
    $scope.$digest();
  });

  $scope.checkEnter = function($event) {
    if($event.charCode == 13){ //enter key
      $scope.sendMessage();
      $scope.message = "";
    }
  }
  $scope.sendMessage = function() {
    firebase.database().ref('chat').push({'user': $scope.displayName ? $scope.displayName : $scope.userEmail, 'message': $scope.message});
  }
  $scope.createNewUser = function() {
    var failed = false;
    firebase.auth().createUserWithEmailAndPassword($scope.signUpEmail, $scope.signUpPassword).catch(function(error) {

      //Handle Errors
      console.log("error code: " + error.code);
      console.log("error message: " + error.message);
      $("#signUpError").show();
      $scope.errorText = error.message;
      $scope.$digest();
      failed = true;
    });
  }

  $scope.signInUser = function() {
    firebase.auth().signInWithEmailAndPassword($scope.signInEmail, $scope.signInPassword).catch(function(error) {
      //Handle Errors
      console.log("error code: " + error.code);
      console.log("error message: " + error.message);
      $scope.errorText = error.message;
      $("#signInError").show();
      $scope.$digest();
    })
  }
  $scope.signOut = function() {
    firebase.auth().signOut().then(function() {
      //console.log("sign out successful");
    }, function(error) {
      //console.log("error message: " + error.message);
    });
  }
  $scope.setUsername = function() {
    firebase.auth().currentUser.updateProfile({displayName: $scope.signUpUsername})
      .then(function() {
          //success
          $scope.displayName = $scope.signUpUsername;
          $element.find('#usernameModal').modal('hide');
      }, function(error) {
        //error
        console.log(error.message);
      });
  }
});
