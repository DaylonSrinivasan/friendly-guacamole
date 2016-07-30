firebase.auth().onAuthStateChanged(function(user) {
  if(user) {
    console.log("User on");
  }
  else{
    console.log("No user");
  }
});
