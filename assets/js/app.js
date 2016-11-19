import $ from 'jquery';

function loadMap(country, cities, paths, airport, zoom) {
  geocodePromise(country).then((latlang) => {
    var mapOptions = {
       center: latlang, zoom: zoom,
       mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Cities
    setCities(map, cities).then((cityLatLangs) => {
      // Paths
      setPaths(map, paths, cityLatLangs);
    });
    // Geocoder don't permit over 10 times request per second!
    setTimeout(() => setAirport(map, airport), 1000);
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
      url: 'assets/img/Germany.png',
      scaledSize: new google.maps.Size(50, 50), // scaled size
  };
  var dfd = $.Deferred();
  cities.forEach((city, i) => {
    geocodePromise(city).then((latlang) => {
      new google.maps.Marker({
        map: map,
        position: latlang,
        title: cities[i],
        icon: icon
      });
      cityLatLangs.push(latlang);
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
      url: 'assets/img/Plane.png',
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

function main() {
  var country = 'Germany';
  var cities = [
    'Munich',
    'Fussen',
    'Frankfurt',
    'Cologne',
    'Berlin',
    'Potsdam',
    'Dresden',
    'Meissen',
    'Leipzig',
    'Nuremberg'
  ];
  var paths = [
    [0, 1],
    [0, 2],
    [2, 3],
    [2, 4],
    [4, 5],
    [5, 6],
    [6, 7],
    [6, 8],
    [6, 9],
    [9, 0],
  ];
  var airport = 'Munich Airport';
  var zoom = 6;
  loadMap(country, cities, paths, airport, zoom);
}

window.onload = main;
