function loadMap(country) {
  var GoogleMapsLoader = require('@google/maps');
  var config = require('config');

  var googleMapsClient = GoogleMapsLoader.createClient({
    key: config.KEY,
    Promise: Promise
  });

  googleMapsClient.geocode({'address' : country})
  .asPromise()
  .then(function(response){
        var center = response.json.results[0].geometry.location;
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

