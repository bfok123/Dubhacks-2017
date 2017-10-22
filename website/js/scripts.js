<SCRIPT>
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
    }


function passWord() {
    var testV = 1;
    var pass1 = prompt('Please Enter Your Password',' ');
    while (testV < 3) {
            if (!pass1) 
            history.go(-1);
            if (pass1.toLowerCase() == "letmein") {
            alert('You Got it Right!');
            window.open('www.wikihow.com');
            break;
        } 
        testV+=1;
        var pass1 = 
        prompt('Access Denied - Password Incorrect, Please Try Again.','Password');
    }
    if (pass1.toLowerCase()!="password" & testV ==3) 
      history.go(-1);
    return " ";
} 
</SCRIPT>
<CENTER>
<FORM>
<input type="button" value="Enter Protected Area" onClick="passWord()">
</FORM>
</CENTER>
