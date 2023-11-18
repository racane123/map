
// global variable
var draw
var FlagisDrawingOn = false
var PointType = ['Poles','Signs','Tree']
var LineType = ['National Highway','StateHighway','River','Street']
var PolygonType = ['Commercial','Residential','Empty Lot','Playground']
var selectedGeomType


// custom control

 /**
       * Define a namespace for the application.
       */
 window.app = {};
 var app = window.app;

 /**
  * @constructor
  * @extends {ol.control.Control}
  * @param {Object=} opt_options Control options.
  */
 app.DrawingApp = function(opt_options) {

   var options = opt_options || {};

   var button = document.createElement('button');
   button.id = 'drawbtn'
   button.innerHTML = '<i class="fa-solid fa-pen-ruler"></i>';

   var this_ = this;
   var startStopApp = function() {
       if (FlagisDrawingOn == false){
    $('#startdrawModal').modal('show')
    
       }else {
            map.removeInteraction(draw)
            FlagisDrawingOn = false
            document.getElementById('drawbtn').innerHTML = '<i class="fa-solid fa-pen-ruler"></i>'
            defineTypeoffeature()
            $('#enterInformationModal').modal('show')
       }
   };

   button.addEventListener('click', startStopApp, false);
   button.addEventListener('touchstart', startStopApp, false);

   var element = document.createElement('div');
   element.className = 'draw-app ol-unselectable ol-control';
   element.appendChild(button);

   ol.control.Control.call(this, {
     element: element,
     target: options.target
   });

 };
 ol.inherits(app.DrawingApp, ol.control.Control);


 //
 // Create map, giving it a rotate to north control.
 //




// view

var myview = new ol.View({
   // projection: 'EPSG:4326',
    center : [13473779.769599514, 1659650.641159134],
    zoom:14,
})

//osm layer
var baselayer = new ol.layer.Tile({
    source : new ol.source.OSM({
        attributions:'GIS MPG'
    })
})


//geoserverlayer
/*
var featureLayersource = new ol.source.TileWMS({
    url:'http://localhost:8080/hays/api.php',
    params:{'LAYERS':'GISMAP:FeatureDrawn', 'tiled': true},
    serverType:'geoserver'

})
var featureLayer = new ol.layer.Tile({
    source:featureLayersource
})*/

//


var featureLayerSource = new ol.source.Vector();


fetch('api.php')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // Parse the GeoJSON data and add features to the vector source
    var features = new ol.format.GeoJSON().readFeatures(data);
    featureLayerSource.addFeatures(features);
    
    // Zoom to the extent of the loaded features
   // map.getView().fit(featureLayerSource.getExtent());
  })
  .catch(function (error) {
    console.error('Error fetching and processing GeoJSON:', error);
  });



  
var featureLayer = new ol.layer.Vector({
    source: featureLayerSource,
    style: function (feature) {
      var geometry = feature.getGeometry().getType();
      var styles = [];
  
      if (geometry === 'Point') {
        styles.push(
          new ol.style.Style({
            image: new ol.style.Circle({
              radius: 6,
              fill: new ol.style.Fill({
                color: 'red',
              }),
              stroke: new ol.style.Stroke({
                color: 'white',
                width: 2,
              }),
            }),
          })
        );
      } else if (geometry === 'LineString') {
        styles.push(
          new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: 'blue',
              width: 2,
            }),
          })
        );
      } else if (geometry === 'Polygon') {
        styles.push(
          new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(0, 128, 0, 0.2)',
            }),
            stroke: new ol.style.Stroke({
              color: 'green',
              width: 2,
            }),
          })
        );
      }
  
      return styles;
    },
  });

  

// draw vector layer
// 1. define source

var drawSource = new ol.source.Vector()
// 2. define layer
var drawLayer = new ol.layer.Vector({
    source : drawSource
})



// Layer array
var layerArray = [baselayer,featureLayer,drawLayer] 

//Map
var map = new ol.Map({

    controls: ol.control.defaults({
        attributionOptions: {
          collapsible: false
        }
      }).extend([
        new app.DrawingApp()
      ]),

    target:'map',
    view: myview,
    layers:layerArray
})





// function to start drawing
function startDraw(geomType){
    selectedGeomType = geomType
    draw = new ol.interaction.Draw({
        type : geomType,
        source:drawSource
    })
  $('#startdrawModal').modal('hide')
 
  map.addInteraction(draw)
  FlagisDrawingOn = true
  document.getElementById('drawbtn').innerHTML = '<i class="fa-solid fa-circle-stop"></i>'
}


//function to add types based on feature
function defineTypeoffeature(){
    var dropdownoftype = document.getElementById('typeoffeatures')
    dropdownoftype.innerHTML = ''
    if (selectedGeomType == 'Point'){
        for (i=0; i<PointType.length; i++){
            var op = document.createElement('option')
            op.value = PointType[i]
            op.innerHTML = PointType[i]
            dropdownoftype.appendChild(op)
        }
    }else if (selectedGeomType == 'LineString'){
        for (i=0; i<LineType.length; i++){
            var op = document.createElement('option')
            op.value = LineType[i]
            op.innerHTML = LineType[i]
            dropdownoftype.appendChild(op)
        }    
    }else{
        for (i=0; i<PolygonType.length; i++){
            var op = document.createElement('option')
            op.value = PolygonType[i]
            op.innerHTML = PolygonType[i]
            dropdownoftype.appendChild(op)
        }
    }

}


//function to save info to in db

function savetodb() {
    var featureArray = drawSource.getFeatures();
    var geoJSONformat = new ol.format.GeoJSON();
    var featuresGeojson = geoJSONformat.writeFeaturesObject(featureArray);
    var geojsonFeatureArray = featuresGeojson.features;

    for (var i = 0; i < geojsonFeatureArray.length; i++) {
        var type = document.getElementById('typeoffeatures').value;
        var name = document.getElementById('exampleInputtext1').value;
        var geom = JSON.stringify(geojsonFeatureArray[i].geometry);

        if (type !== '') {
            $.ajax({
                url: 'save.php',
                type: 'POST',
                data: {
                    typeofgeom: type,
                    nameofgeom: name,
                    stringofgeom: geom
                },
                success: function(dataResult) {
                  try {
                      var result = JSON.parse(dataResult);
                      console.log(result); // Log the entire parsed result
              
                      if (result.statusCode === 200) {
                          console.log('Data added successfully');
                      } else {
                          console.log('Data not added successfully');
                      }
                  } catch (e) {
                      console.error('Error parsing JSON:', e);
                      console.log('Original dataResult:', dataResult);
                  }
              }
            });
        } else {
            alert('Please select a type');
        }
    }



//close the modal
$('#enterInformationModal').modal('hide')

//remove feature from map
drawSource.clear()



}

function clearDrawSource(){

    drawSource.clear()
}