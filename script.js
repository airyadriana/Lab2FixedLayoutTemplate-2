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
//'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg'
map.on('load', function() {

  //Add layer here
  map.addLayer({
    id: 'stamen-basemap',
    type: 'raster',
    source: {
      type: 'raster',
      tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
             'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
             'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png']
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
};

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
};


//Add building's pop-up on click

map.on('click', 'denver-buildings-47eoag', function(e) {
  var id = e.features[0].properties.id;
  var type = e.features[0].properties.type;

  var popUpHTML = [`<p><h3>Building Type:</h3> ${type}</p>
                  <p><h3>ID:</h3> ${id}</p>`]

  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    //['<h3>'+'Building type:'+'</h3><p>'+type + '</p><h3>'+'ID:'+'</h3><p>'+id+'</p>']
    .setHTML(popUpHTML)
    .addTo(map);

  // Find all features at a point
  var feature = map.queryRenderedFeatures(e.point);
  console.log(feature)

  // get the coordinates to use with the centroid function from turf.js




  // Query all rendered features from a single layer
  var features = map.queryRenderedFeatures({ layers: ['food-stores-c8wq25'] });
  //console.log(features)
});

// Change the cursor to a crosshair style when the mouse is over the places layer.
map.on('mouseenter', 'denver-buildings-47eoag', function() {
  map.getCanvas().style.cursor = 'crosshair';
});
 
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'denver-buildings-47eoag', function() {
  map.getCanvas().style.cursor = '';
});

