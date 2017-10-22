(function() {
"use strict"
document.onload = function() {
  debugger;
  if($('#unique').length > 0) {
      firebase.database().ref('/users/').once('value', function(snapshot) {
        snapshot.forEach(function(value) {
          value.forEach(function(user) {
            user.forEach(function(events) {
              appendEvent(events.child('title').val(), events.child('startLocation').val(), events.child('description').val(), events.child('date').val(), events.child('time').val());
});
});
});
});
}
};

function initMap() {
    var startpos = {lat: 14.05, lng: 0};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: startpos
    });
    var marker = new google.maps.Marker({
        position: startpos,
        map: map
    });
};

function openProtestPage(protestTitle) {
    firebase.database().ref('/users/').once('value', function(snapshot) {
      snapshot.forEach(function(value) {
        value.forEach(function(name) {
          name.forEach(function(events) {
            if(events.child('title').val() === protestTitle) {
              $('#title').text(events.child('title').val());
              $('#description').text(events.child('description').val());
              /*
              $('#map').append('\
              <iframe\
                frameborder="0"\
                style="border:0"\
                src=\"https://www.google.com/maps/embed/v1/directions?key=AIzaSyAB1Kq4p_9yKm5PFdCxCEasII-5LORxhbA&origin=\"' + events.child('startLocation').val() + '&destination=' + events.child('endLocation').val() + '&mode=walking"\
                allowfullscreen>\
              </iframe>');
              */
            };
          });
        });
      });
    });
    document.getElementById('mainPage').style.display = "none";
    debugger;
    document.getElementById('protestPage').style.display = "block";
  };

function appendEventsInEditList(protestTitle) {
  var el = document.createElement('div');
  var text = document.createTextNode('Event: ' + protestTitle);
  el.appendChild(text);
  el.className += 'eventInEditList';

  var currentDiv = document.getElementById("last");
  document.body.insertBefore(el, last);
};

function appendEvent(protestTitle, startLocation, protestDescription, protestDate, protestTime) {
  var div = document.createElement('div');
  div.innerHTML = '<h3><a href="" class="link">' + protestTitle + '</a></h3><h4>' + startLocation + '</h4><h5>' + protestDescription + '</h5><h6>' + protestDate + ' @ ' + protestTime;
  div.class += 'protest';
  document.getElementById('unique').appendChild(div);
  div.addEventListener("click", function(protestTitle) {
    openProtestPage(protestTitle);
  });
};

if($('#unique').length > 0) {
  $(document).ready(function() {
    firebase.database().ref('/users/').once('value', function(snapshot) {
      snapshot.forEach(function(value) {
        value.forEach(function(user) {
          user.forEach(function(events) {
            appendEvent(events.child('title').val(), events.child('startLocation').val(), events.child('description').val(), events.child('date').val(), events.child('time').val());
          });
        });
      });
    });
  });
};

$('#loginButton').on('click', function() {
  if($('#username input').val().length == 0 || $('#password input').val().length == 0) {
    alert('please enter a username and password');
  } else {
    firebase.database().ref('/users/').child($('#username input').val()).once('value', function(snapshot) {
      if(snapshot.child('username').val() === $('#username input').val() && snapshot.child('password').val() === $('#password input').val()) {
        $('#loginSection').hide();
        $('#createEventButton').show();
        firebase.database().ref('/users/' + $('#username input').val() + '/events').once('value', function(snapshot2) {
          snapshot2.forEach(function(value) {
            appendEventsInEditList(value.child('title').val());
          });
        });
      } else {
        $('#password div').remove();
        $('#password').append('<div>That user does not exist.</div>');
      }
    });
  }
});

function applyButtonClick() {
  if($('#protestTitle input').val().length == 0 || $('#protestDescription input').val().length == 0 || $('#protestTime input').val().length == 0 || $('#protestDate input').val().length == 0 || $('#startLocation input').val().length == 0 ||
     $('#endLocation input').val().length == 0 || $('#twitterUsername input').val().length == 0) {
    $('#twitterUsername div').remove();
    $('#twitterUsername').append('<div>Please enter fill in all blank fields.</div>');
  } else {
    firebase.database().ref('/users/' + $('#username input').val() + '/events/' + $('#protestTitle input').val()).set({
      title: $('#protestTitle input').val(),
      description: $('#protestDescription input').val(),
      time: $('#protestTime input').val(),
      date: $('#protestDate input').val(),
      startLocation: $('#startLocation input').val(),
      endLocation: $('#endLocation input').val(),
      twitterUsername: $('#twitterUsername input').val()
    });
    appendEventsInEditList($('#protestTitle input').val());
    close();
  }
}

$('#createEventButton').on('click', function() {
  $('#eventEditor div').remove();
  $('#eventEditor').append('\
  <div id="box">\
    <div id="protestTitle">\
      Title\
      <input type="text">\
    </div>\
    <br>\
    <div id="protestDescription">\
      Description\
      <input type="text">\
    </div>\
    <br>\
    <div id="protestTime">\
      Time\
      <input type="text">\
    </div>\
    <br>\
    <div id="protestDate">\
      Date\
      <input type="text">\
    </div>\
    <br>\
    <div id="startLocation">\
      Starting Location\
      <input type="text">\
    </div>\
    <br>\
    <div id="endLocation">\
      Ending Location\
      <input type="text">\
    </div>\
    <br>\
    <div id="twitterUsername">\
      Twitter Username\
      <input type="text">\
    </div>\
    <br>\
    <button id="applyButton">Apply</button>\
    <button id="closeButton">Close</button>\
  </div>\
  ');
  document.getElementById('closeButton').addEventListener("click", close);
  document.getElementById('applyButton').addEventListener("click", applyButtonClick);
});

function close() {
  $('#eventEditor div').remove();
}

$("#registerButton").on("click", function() {
  if($('#username input').val().length == 0 || $('#password input').val().length == 0) {
    $('#password div').remove();
    $('#password').append('<div>Please enter a username and password.</div>')
  } else {
    firebase.database().ref('/users/').child($('#username input').val()).once('value', function(snapshot) {
      if(snapshot.child('username').val() === $('#username input').val() && snapshot.child('password').val() === $('#password input').val()) {
        $('password div').remove();
        $('#password').append('<div>That user already exists.</div>');
        return;
      }
    });
    firebase.database().ref('/users/' + $('#username input').val()).set({
      username: $('#username input').val(),
      password: $('#password input').val()
    });
    $('#password div').remove();
    $('#password').append('<div>Registered new account.</div>')
  }
});
})();
