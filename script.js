mapboxgl.accessToken = 'pk.eyJ1IjoiYWlyeTE5OTEiLCJhIjoiY2p2YTMyaG5tMGhpNTN5bTdjYnVrbDVvaSJ9.8Q4cQXdI3lMDNEq1PlH3mQ';
      var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/airy1991/ck7xtphwc04zm1is5nb8nrzle', // stylesheet location
        center: [-104.88799, 39.78023], // starting position [lng, lat]
        zoom: 13, // starting zoom
        minZoom: 10,
        maxZoom: 18
      });

// Add zoom and rotation controls to the map.
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'bottom-right');

//Add BASE MAP TILES
map.on('load', function() {

  //Add layer here
  map.addLayer({
    id: 'stamen-basemap',
    type: 'raster',
    source: {
      type: 'raster',
      tiles: ['https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg']
    }
  }, 'denver-buildings-47eoag')
});

//Add layer toggling
var checkboxElementBuildings = document.getElementById('layer-toggle-buildings');

checkboxElementBuildings.onclick = function(e) {
  var isChecked = e.target.checked;

  if (isChecked){
    //Turn layer on
    map.setLayoutProperty('denver-buildings-47eoag', 'visibility', 'visible');
    map.setLayoutProperty('denver-buildings-47eoag (1)', 'visibility', 'visible');
  } else {
    //Turn layer off
    map.setLayoutProperty('denver-buildings-47eoag', 'visibility', 'none');
    map.setLayoutProperty('denver-buildings-47eoag (1)', 'visibility', 'none');
  }
}

var checkboxElementFoodStores = document.getElementById('layer-toggle-foodStores');

checkboxElementFoodStores.onclick = function(e) {
  var isChecked = e.target.checked;

  if (isChecked){
    //Turn layer on
    map.setLayoutProperty('food-stores-c8wq25', 'visibility', 'visible');
  } else {
    //Turn layer off
    map.setLayoutProperty('food-stores-c8wq25', 'visibility', 'none');
  }
}

