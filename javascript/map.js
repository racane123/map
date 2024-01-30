
mapboxgl.accessToken = 'pk.eyJ1IjoicmFjYW5lMTIzIiwiYSI6ImNscDJhZ2xmbDBwdmEybG9pa2w4Yms0emEifQ.vyLoKd0CBDl14MKI_9JDCQ';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [120.96788000, 14.64953000],
  zoom: 16
});
var draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    point: true,
    line_string: true,
    polygon: true,
    trash: true
  }
});

map.addControl(draw);
var saveForm = document.getElementById('saveForm');
var drawingForm = document.getElementById('drawingForm');

map.on('draw.create', function (event) {
    showSaveForm();
    drawingForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = document.getElementById('saveName').value;
        var featureType = event.features[0].geometry.type;
        var coordinates = JSON.stringify(event.features[0].geometry.coordinates);
        saveData(name, featureType, coordinates);
        hideSaveForm();
    });
});

function saveData(name, featureType, coordinates) {
    var xhr = new XMLHttpRequest(); 
    var url = 'postapi.php';

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
        }
    };

    var data = 'name=' + encodeURIComponent(name) +
    '&featureType=' + encodeURIComponent(featureType) +
    '&coordinates=' + encodeURIComponent(coordinates);

    xhr.send(data);
}

map.on('load', function() {
  fetch('polyapi.php')
    .then(response => response.json())
    .then(data => {
      map.addSource('geojsonSource', {
        type: 'geojson',
        data: data,
      });

      map.addLayer({
        id: 'points',
        type: 'circle',
        source: 'geojsonSource',
        paint: {
          'circle-radius': 6,
          'circle-color': 'red'
        },
        filter: ['==', '$type', 'Point']
      });

      map.addLayer({
        id: 'lines',
        type: 'line',
        source: 'geojsonSource',
        layout: {},
        paint: {
          'line-color': 'blue',
          'line-width': 2
        },
        filter: ['==', '$type', 'LineString']
      });

      map.addLayer({
        id: 'polygons',
        type: 'fill',
        source: 'geojsonSource',
        layout: {},
        paint: {
          'fill-color': 'green',
          'fill-opacity': 0.5
        },
        filter: ['==', '$type', 'Polygon']
      });

      map.setLayoutProperty('points', 'visibility', 'visible');
      map.setLayoutProperty('lines', 'visibility', 'visible');
      map.setLayoutProperty('polygons', 'visibility', 'visible');
    })
    .catch(error => {
      console.error('Error:', error);
    });
});






function showSaveForm() {
  saveForm.style.display = 'block';
}

drawingForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var features = draw.getAll();
  var name = document.getElementById('saveName').value;
  // Add logic to save the features and name as needed
  console.log('Saving features:', features, 'with name:', name);
  hideSaveForm();
});

function cancelDrawing() {
  draw.deleteAll();
  hideSaveForm();
}

function hideSaveForm() {
  saveForm.style.display = 'none';
}






