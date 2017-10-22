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