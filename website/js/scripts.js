<SCRIPT>
function initMap() {
<<<<<<< HEAD
    var startpos = {lat: 14.05, lng: 0};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: startpos
    });
    var marker = new google.maps.Marker({
        position: startpos,
        map: map
    });
}
=======
  var startpos = {lat: 14.05, lng: 0};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: startpos
  });
  var marker = new google.maps.Marker({
    position: startpos,
    map: map
  });
}

$('#loginButton').on('click', function() {
  if($('#username').val().length == 0 || $('#password').val().length == 0) {
    alert('please enter a username and password');
  } else {
    firebase.database().ref('/users/').child($('#username').val()).once('value', function(snapshot) {
      if(snapshot.child('username').val() === $('#username').val() && snapshot.child('password').val() === $('#password').val()) {
        alert('logged in');
      } else {
        alert('that user does not exist');
      }
    });
  }
/*
  firebase.database().ref('/users/' + $('#username').val()).once('value', function(snapshot) {
    snapshot.forEach(function(snapshotChild) {
      //if(snapshotChild.val() === )
    });
  });*/
});

$("#registerButton").on("click", function() {
  if($('#username').val().length == 0 || $('#password').val().length == 0) {
    alert('please enter a username and password');
  }
  firebase.database().ref('/users/' + $('#username').val()).set({
    username: $('#username').val(),
    password: $('#password').val()
  });
});
>>>>>>> 6fde92f1910b9cb5d89acabad55399f050169aa0
