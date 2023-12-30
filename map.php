<?php

include('header.php');

?>

<style>
    body { margin: 0; padding: 0; }
    #map { position: absolute; top: 0; bottom: 0; width: 100%; }
    #legends { position: absolute; top: 50px; right: 0; width: 30%; padding: 10px; background-color:white;}
    .legend-item { display: flex; align-items: center; margin-bottom: 5px; }
    .legend-color { width: 20px; height: 20px; margin-right: 5px; }
    #toggle { position: absolute; top: 10px; right: 10px; z-index: 1; }
</style>

<div id="map"></div>
<div id="legends">
    <div class="legend-item">
      <div class="legend-color" style="background-color: green;"></div>
      <div class="legend-label">Low Traffic</div>
    </div>
    <div class="legend-item">
      <div class="legend-color" style="background-color: yellow;"></div>
      <div class="legend-label">Moderate Traffic</div>
    </div>
    <div class="legend-item">
      <div class="legend-color" style="background-color: red;"></div>
      <div class="legend-label">Heavy Traffic</div>
    </div>
    <div class="legend-item">
      <div class="legend-color" style="background-color: maroon;"></div>
      <div class="legend-label">Severe Traffic</div>
    </div>
    <div class="legend-item">
      <div class="legend-color" style="background-color: gray;"></div>
      <div class="legend-label">Unknown Traffic</div>
    </div>
  </div>

  <div id="toggle">
    <input type="checkbox" id="trafficToggle" />
    <label for="trafficToggle">Show Traffic</label>
  </div>

<script>
mapboxgl.accessToken = 'pk.eyJ1IjoicmFjYW5lMTIzIiwiYSI6ImNscDJhZ2xmbDBwdmEybG9pa2w4Yms0emEifQ.vyLoKd0CBDl14MKI_9JDCQ';
const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [121.0349, 14.7542],
      zoom: 16
    });

    let trafficVisible = false; // Track the visibility of the traffic layer

    map.on('load', function () {
      // Add the traffic layer
      map.addSource('traffic', {
        type: 'vector',
        url: 'mapbox://mapbox.mapbox-traffic-v1'
      });

      map.addLayer({
        id: 'traffic',
        type: 'line',
        source: 'traffic',
        'source-layer': 'traffic',
        paint: {
          'line-width': 2,
          'line-color': [
            'case',
            ['==', ['get', 'congestion'], 'low'],
            'green',
            ['==', ['get', 'congestion'], 'moderate'],
            'yellow',
            ['==', ['get', 'congestion'], 'heavy'],
            'red',
            ['==', ['get', 'congestion'], 'severe'],
            'maroon',
            'gray'
          ]
        },
        layout: {
          visibility: 'none' // Initially hide the traffic layer
        }
      });

      // Toggle the visibility of the traffic layer when the checkbox is clicked
      const trafficToggle = document.getElementById('trafficToggle');
      trafficToggle.addEventListener('change', function () {
        if (this.checked) {
          map.setLayoutProperty('traffic', 'visibility', 'visible');
          trafficVisible = true;
        } else {
          map.setLayoutProperty('traffic', 'visibility', 'none');
          trafficVisible = false;
        }
      });
    });
</script>