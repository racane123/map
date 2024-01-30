mapboxgl.accessToken = 'pk.eyJ1IjoicmFjYW5lMTIzIiwiYSI6ImNscDJhZ2xmbDBwdmEybG9pa2w4Yms0emEifQ.vyLoKd0CBDl14MKI_9JDCQ';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [120.96788000, 14.64953000],
  zoom: 16
  });

map.addControl(
  new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl
  })
  );

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