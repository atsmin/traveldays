import $ from 'jquery';
import {CITY_IMAGE, PLANE_IMAGE, CAMERA_IMAGE} from './config';

export function loadMap(country, cities, paths, airport, zoom) {
  geocodePromise(country).then((latlang) => {
    var mapOptions = {
       center: latlang, zoom: zoom,
       mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Cities
    setCities(map, cities)
    .then((cityLatLangs) => {
      setPaths(map, paths, cityLatLangs); // Paths
    });
    // Geocoder don't permit over 10 times request per second!
    window.setTimeout(() => setAirport(map, airport), 1000);
  });
}

function geocodePromise(address) {
  var geocoder = new google.maps.Geocoder();
  return new Promise((resolve) => {
    geocoder.geocode({address : address}, (results, status) => {
      resolve(results[0].geometry.location);
    });
  });
}

function setCities(map, cities) {
  var cityLatLangs = [];
  var icon = {
      url: CITY_IMAGE,
      scaledSize: new google.maps.Size(50, 50), // scaled size
  };
  var dfd = $.Deferred();
  cities.forEach((city, i) => {
    geocodePromise(city).then((latlang) => {
      var marker = new google.maps.Marker({
        map: map,
        position: latlang,
        title: cities[i],
        icon: icon
      });
      cityLatLangs.push(latlang);
      // Info Window
      var infowin = new google.maps.InfoWindow({
        content: `
          <div>
            <img src="${CAMERA_IMAGE}" style="vertical-align:middle;">
            <span style="vertical-align:middle;"><strong>${cities[i]}</strong></span>
          </div>
        `
      });
      // mouseover
      google.maps.event.addListener(marker, 'mouseover', function(){
          infowin.open(map, marker);
      });
      // mouseout
      google.maps.event.addListener(marker, 'mouseout', function(){
          infowin.close();
      });
    });
  });
  dfd.resolve(cityLatLangs);
  return dfd.promise();
}

function setPaths(map, paths, cityLatLangs) {
  var lineSymbol = {
    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
  };
  for (let path of paths) {
      var line = new google.maps.Polyline({
      map: map,
      path: [cityLatLangs[path[0]], cityLatLangs[path[1]]],
      strokeColor: 'red',
      strokeOpacity: 0.5,
      strokeWeight: 3,
      icons: [{
        icon: lineSymbol,
        offset: '100%'
      }],
    });
  }
}

function setAirport(map, airport) {
  var icon = {
      url: PLANE_IMAGE,
      scaledSize: new google.maps.Size(60, 60), // scaled size
      anchor: new google.maps.Point(0, 20),
  };
  geocodePromise(airport).then((latlang) => {
    new google.maps.Marker({
      map: map,
      position: latlang,
      title: airport,
      icon: icon
    });
  });
}

