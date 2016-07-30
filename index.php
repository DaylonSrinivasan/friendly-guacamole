<!DOCTYPE HTML>
<html>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
<script src="https://www.gstatic.com/firebasejs/3.2.1/firebase.js"></script>
<script type="text/javascript" src="firebase.js"></script>
<body>

  <div ng-app="myApp" ng-controller="myCtrl">
    <chat-room></chat-room>
    <input type="text" ng-model="message"></input>
    <button ng-click="update()">Submit</button>
  </div>

  <script>
  var app = angular.module('myApp', []);
  app.directive('chatRoom', function() {
    return {
      template: "<div id='myChatRoom'></div>"
    };
  });
  app.controller('myCtrl', function($scope, $element, $attrs) {
    database.ref('chat').on('child_added', function(data) {
      var p = angular.element("<p>" +data.val() +"</p");

      $element.find('div').append(p);
    });
    $scope.update = function() {
      database.ref('chat').push($scope.message);
    }
  });
  </script>


</body>
</html>
