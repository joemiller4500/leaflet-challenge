var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

function markerSize(num) {
  return num * 5;
}

// var magnitudes = []

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  eqData = data
  // Once we get a response, send the data.features object to the createFeatures function
  // createFeatures(data.features);
  console.log(data.features[0])

  var locations = []

  for (var i = 0; i < data.features.length; i++) {
    // // Setting the marker radius for the state by passing population into the markerSize function
    // console.log([data.features[i].geometry.coordinates[0],data.features[i].geometry.coordinates[1]])
    latlng = [data.features[i].geometry.coordinates[0],data.features[i].geometry.coordinates[1]]    
    // console.log(latlng)
    locations.push(
      L.circle(latlng, {
        stroke: false,
        fillOpacity: 0.75,
        color: "white",
        fillColor: "white",
        // radius: 50
        // color: data.features[i].properties.mag,
        // fillColor: data.features[i].coordinates,
        radius: markerSize(data.features[i].properties.mag)
      })
    );
  }
  console.log(locations)

  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: 'pk.eyJ1Ijoiam9lbWlsbGVyNDUwMCIsImEiOiJja2Jud2RwcDkwNjk2Mm5qejBvdGh6ZHJ0In0.GCI6bvKOIR1VYDu87nY8Ow'
  });
  
  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: 'pk.eyJ1Ijoiam9lbWlsbGVyNDUwMCIsImEiOiJja2Jud2RwcDkwNjk2Mm5qejBvdGh6ZHJ0In0.GCI6bvKOIR1VYDu87nY8Ow'
  });
  
  var quakes = L.layerGroup(locations);
  
  // Create a baseMaps object
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };
    
  // console.log(quakes)
  
  // Create an overlay object
  var overlayMaps = {
    "earthquakes": quakes
  };
  
  // Define a map object
  var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [streetmap, quakes]
  });
  
  // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: true
  }).addTo(myMap);

});
