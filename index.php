<!DOCTYPE HTML>
<html>
 <body>

   <button onclick="myFunction()">Click me</button>

 <script src="https://www.gstatic.com/firebasejs/3.2.1/firebase.js"></script>
 <script>
   // Initialize Firebase
   var config = {
     apiKey: "AIzaSyADoUMDd759jMrXsBx1XYjlCC37aIQe9XY",
     authDomain: "friendly-guacamole.firebaseapp.com",
     databaseURL: "https://friendly-guacamole.firebaseio.com",
     storageBucket: "friendly-guacamole.appspot.com",
   };
   firebase.initializeApp(config);
   var database = firebase.database();
 </script>

    <script>

    function writeUserData(userId, name, email, imageUrl) {
      firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }
    function myFunction() {
      var btn = document.createElement("BUTTON");
      document.body.appendChild(btn);
      writeUserData('me', 'you', 'him', 'her');
    }
    </script>
 </body>
</html>
