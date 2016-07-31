var userOn;
firebase.auth().onAuthStateChanged(function(user) {
  if(user) {
    console.log("User on");
    userOn = true;
  }
  else{
    console.log("No user");
    userOn = false;
  }
});
