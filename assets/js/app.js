function loadMap(country) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'address' : country}, (results, status) => {
        var center = results[0].geometry.location;
        var mapOptions = {
           center: center, zoom: 6,
           mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  });
}

function main() {
  var country = "Germany";
  loadMap(country);
}

window.onload = main;
