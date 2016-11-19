import { loadMap } from './maps';

function init() {
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

window.onload = init;
