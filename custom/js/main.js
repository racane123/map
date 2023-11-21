
// global variable
var featureLayer
var geoms
var feature_id

var selectInt
var modi
var snapi
var editdrawLayer

var draw
var snapii

var FlagisDrawingOn = false
var FlagisModifyOn = false
var PointType = ['Poles','Signs','Tree']
var LineType = ['National Highway','StateHighway','River','Street']
var PolygonType = ['Boundary','Business','Residential','School','Empty Lot','Playground']
var selectedGeomType


/* ayaw ma collapse putek

mapboxgl.accessToken = 'pk.eyJ1IjoicmFjYW5lMTIzIiwiYSI6ImNscDJhZ2xmbDBwdmEybG9pa2w4Yms0emEifQ.vyLoKd0CBDl14MKI_9JDCQ';
    
const map2 = new mapboxgl.Map({
  style: 'mapbox://styles/mapbox/light-v11',
  //center : [13473779.769599514, 1659650.641159134],
  center: [121.037023, 14.7434445],

  zoom: 14,
  pitch: 45,
  bearing: -17.6,
  container: 'map2',
  antialias: true
});


map2.on('style.load', () => {
  // Fetch your polygon data from the API
  fetch('api.php')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const featuresArray = data.features;

      // Check if data is an array
      if (featuresArray && Array.isArray(featuresArray)) {
        // Create a GeoJSON object
        const geojsonObject = {
          'type': 'FeatureCollection',
          'features': featuresArray.map(feature => ({
            'type': 'Feature',
            'geometry': feature.geometry,
            'properties': feature.properties
          }))
        };

        // Add a new source for your polygon data
        map2.addSource('custom-polygon-source', {
          'type': 'geojson',
          'data': geojsonObject
        });

        // Add a new layer using the source
        map2.addLayer({
          'id': 'custom-polygon-layer',
          'type': 'symbol', // Use 'symbol' type for Point features
          'source': 'custom-polygon-source', // Reference the added source
          'layout': {
            'icon-image': 'assets/img/marked-place.png', // Set the icon image
            'icon-size': 100, // Adjust the size as needed
            'text-field': ['get', 'name'],
            'text-font': ['Open Sans Regular'],
            'text-size': 12,
            'text-offset': [0, 0.6],
            'text-anchor': 'top'
          }
        });

        // Get the coordinates of the first point
        const firstPointCoordinates = featuresArray[0].geometry.coordinates;

        // Set the map view to fit the bounds of the first point
        map2.fitBounds([
          [firstPointCoordinates[0] - 0.1, firstPointCoordinates[1] - 0.1], // Adjust the bounds as needed
          [firstPointCoordinates[0] + 0.1, firstPointCoordinates[1] + 0.1]
        ]);
      } else {
        console.error('Features array is missing or not an array:', data);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});
*/



// custom control
window.apps = {};
 var apps = window.apps;

 /**
  * @constructor
  * @extends {ol.control.Control}
  * @param {Object=} opt_options Control options.
  */

 apps.DrawingApp = function(opt_options) {

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
            map.removeInteraction(snapii) 
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
 ol.inherits(apps.DrawingApp, ol.control.Control);


// custom control

window.appss = {};
var appss = window.appss;

/**
 * @constructor
 * @extends {ol.control.Control}
 * @param {Object=} opt_options Control options.
 */
appss.ModifyFeatureApp = function(opt_options) {

  var options = opt_options || {};

  var button = document.createElement('button');
  button.id = 'editbtn'
  button.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

  var this_ = this;
  var startStopApp = function() {
      if (FlagisModifyOn == false){
        $('#confirmModal').modal('show')
      }else {
       
           FlagisModifyOn = false
           map.removeLayer(editdrawLayer)
           map.removeInteraction(selectInt)
           map.removeInteraction(modi)
           map.removeInteraction(snapi)
           
           editSource.clear()        
           document.getElementById('editbtn').innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'
           $('#confirmFeatureModal').modal('show')
      }
  };

  button.addEventListener('click', startStopApp, false);
  button.addEventListener('touchstart', startStopApp, false);

  var element = document.createElement('div');
  element.className = 'modify-app ol-unselectable ol-control ol-bar';
  element.appendChild(button);

  ol.control.Control.call(this, {
    element: element,
    target: options.target
  });

};
ol.inherits(appss.ModifyFeatureApp, ol.control.Control);



// view
var myview = new ol.View({
   // projection: 'EPSG:3857',
    center : [13473779.769599514, 1659650.641159134],
    zoom:14,
})
//osm layer
var baselayer = new ol.layer.Tile({
    source : new ol.source.OSM({
        attributions:'GIS MPG'
    })
})


/* baoundary
var boundaryLayerSource = new ol.source.Vector();

fetch('boundary.php')
.then(function (response) {
  return response.json();
})
.then(function (data) {
  // Parse the GeoJSON data and add features to the vector source
  var features = new ol.format.GeoJSON().readFeatures(data);
  boundaryLayerSource.addFeatures(features);
  
  // Zoom to the extent of the loaded features
 // map.getView().fit(featureLayerSource.getExtent());
})
.catch(function (error) {
  console.error('Error fetching and processing GeoJSON:', error);
});

var boundary = new ol.layer.Vector({
  source: boundaryLayerSource
});

*/


// source para sa featurelayer
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
// nirerefresh yung features pagtapos mag add or mag edit ng points,linestring,polygon
function refresh(){
  featureLayerSource.clear();
  fetch('api.php')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // Parse the GeoJSON data and add features to the vector source
    var features = new ol.format.GeoJSON().readFeatures(data);
    featureLayerSource.addFeatures(features);
    
    // Zoom to the extent of the loaded features
   //  map.getView().fit(featureLayerSource.getExtent());
  })
  .catch(function (error) {
    console.error('Error fetching and processing GeoJSON:', error);
  });
}

document.getElementById("refreshButton").addEventListener("click", function() {
  // Call the refresh function when the button is clicked
  refresh();
 });
 document.getElementById("refreshButton2").addEventListener("click", function() {
  // Call the refresh function when the button is clicked
  refresh();
 });
//setInterval(function(){ refresh(); }, 2000);


// pag display ng mga feature sa map na may style depende kung point,linstring, or polygon
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

 
 // Popup overlay with popupClass=anim
 var popup = new ol.Overlay.Popup ({
  popupClass: "default anim", //"tooltips", "warning" "black" "default", "tips", "shadow",
  closeBox: true,
  onclose: function(){ console.log("You close the box"); },
  positioning: 'auto',
  autoPan: {
    animation: {
      duration: 100
    }
  }
});
  
// draw vector layer
// 1. define source
var drawSource = new ol.source.Vector()
// 2. define layer
var drawLayer = new ol.layer.Vector({
    source : drawSource
})

// vector source para sa edit features
var editSource = new ol.source.Vector()

fetch('api.php')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // Parse the GeoJSON data and add features to the vector source
    var features = new ol.format.GeoJSON().readFeatures(data);
    editSource.addFeatures(features);
    
    // Zoom to the extent of the loaded features
   // map.getView().fit(featureLayerSource.getExtent());
  })
  .catch(function (error) {
    console.error('Error fetching and processing GeoJSON:', error);
  });


// Layer array
var layerArray = [baselayer,featureLayer,drawLayer] 
//Map
var map = new ol.Map({
    controls: ol.control.defaults({
        attributionOptions: {
          collapsible: false
        }
      }).extend([
        new apps.DrawingApp(),
        new appss.ModifyFeatureApp()
      ]),

    target:'map',
    view: myview,
    layers:layerArray,
    overlays: [popup]
  
})




// Control Select 
var select = new ol.interaction.Select({});
map.addInteraction(select);

// Set the control grid reference
var search = new ol.control.SearchFeature({
  //target: $(".options").get(0),
  source: featureLayerSource,
  property: $(".options select").val(),
  sort: function(f1, f2) {
    if (search.getSearchString(f1) < search.getSearchString(f2)) return -1;
    if (search.getSearchString(f1) > search.getSearchString(f2)) return 1;
    return 0;
  }
});
map.addControl(search);

search.on('select', function(e) {
  select.getFeatures().clear();
  select.getFeatures().push(e.search);

  var extent = ol.extent.extend(
    e.search.getGeometry().getExtent(),
    select.getFeatures().getArray()[0].getGeometry().getExtent()
  );

  var center = ol.extent.getCenter(extent);
  var zoomLevel = 17;

  map.getView().animate({
    center: center,
    zoom: zoomLevel,
    duration: 1000
  });
});


//pop up na nagbbug
//var select = new ol.interaction.Select({});
 // map.addInteraction(select);

 select.getFeatures().on(['add'], function (e) {
  if(!FlagisDrawingOn){
      var feature = e.element;
      var content = '<b> TYPE </b>:' + feature.get("type") +
          '</br> <b> NAME </b>:' + feature.get("name") +
          '</br> <b> geom </b>:' + feature.getGeometry().getType("geometry");
      var geometryType = feature.getGeometry().getType();
      var coordinates;
      if (geometryType === 'Point') {
          coordinates = feature.getGeometry().getCoordinates();
      } else if (geometryType === 'LineString') {
          // Use the midpoint of the LineString
          coordinates = ol.extent.getCenter(feature.getGeometry().getExtent());
      } else if (geometryType === 'Polygon') {
          // Use the centroid of the Polygon
          coordinates = ol.extent.getCenter(feature.getGeometry().getExtent());
      }
      popup.show(coordinates, content);
    }
}); 
// On deselected => hide popup
select.getFeatures().on(['remove'], function (e) {
      //featureLayer.clear(true);
      popup.hide();
});













//coordinates ng boundary para sa filter mask 
let dep =      {
  "type": "Feature",
  "geometry": {
      "type": "Polygon",
      "coordinates": [
          [
              [
                  13469794.274080126,
                  1660798.9084294834
              ],
              [
                  13472194.396666227,
                  1661838.4519704243
              ],
              [
                  13474907.911461934,
                  1661104.6566884161
              ],
              [
                  13476444.295613833,
                  1659652.3530052057
              ],
              [
                  13475320.671531308,
                  1658215.336348593
              ],
              [
                  13472905.261262545,
                  1657810.2207401667
              ],
              [
                  13469985.366650838,
                  1659400.1108701816
              ],
              [
                  13469794.274080126,
                  1660798.9084294834
              ]
          ]
      ]
  },
  "properties": {
      "type": "Boundary",
      "name": "TRYCROP"
  }
};
var coords = dep.geometry.coordinates;
var f = new ol.Feature(new ol.geom.Polygon(coords));

var mask= new ol.filter.Mask({ 
  feature: f, 
  wrapX: true,
  inner: false,
  fill: new ol.style.Fill({ color: [0, 0, 255, 0.2] }),
  shadowWidth: 10,
  shadowColor: [0, 0, 0, 1]
});
baselayer.addFilter(mask);

// function to start drawing / edit features
function startedit(){

  var editdrawLayer = new ol.layer.Vector({
    source : editSource,
    wrapX: false
})
  map.addLayer(editdrawLayer);

  selectInt = new ol.interaction.Select({
    wrapX: false  });
  modi = new ol.interaction.Modify({
    features: selectInt.getFeatures()  });
  modi.on('modifyend', function(e) {
    var features = e.features.getArray();
    console.log("num of fetaures",features.length);
    for (var i=0;i<features.length;i++){
    console.log("feature revision",features[i].getRevision())
    }
    console.log(features)
    var geoJSONformat = new ol.format.GeoJSON();
    var featuresGeojson = geoJSONformat.writeFeaturesObject(features);
    var geojsonFeatureArray = featuresGeojson.features;
    console.log(geojsonFeatureArray)
    for (var i = 0; i < geojsonFeatureArray.length; i++) {
    geoms = JSON.stringify(geojsonFeatureArray[i].geometry);
    console.log(geoms);
    feature_id = geojsonFeatureArray[i].properties.feature_id;
    console.log("Feature ID:", feature_id);
      
  } 
  
    })
    
$('#confirmModal').modal('hide')

var snapi = new ol.interaction.SnapGuides({ 
  vectorClass: ol.layer.VectorImage 
});
 
snapi.enableInitialGuides_ = true;
snapi.setModifyInteraction(modi);
map.addInteraction(modi);
map.addInteraction(selectInt);
map.addInteraction(snapi);

FlagisModifyOn = true
document.getElementById('editbtn').innerHTML = '<i class="fa-solid fa-circle-stop"></i>'
}
// function to start drawing
function startDraw(geomType){
    selectedGeomType = geomType
    draw = new ol.interaction.Draw({
        type : geomType,
        source:drawSource
        
    }) 
  $('#startdrawModal').modal('hide')

  var snapii = new ol.interaction.SnapGuides({ 
    vectorClass: ol.layer.VectorImage 
  });
  snapii.enableInitialGuides_ = true;
  snapii.setDrawInteraction(draw);
  map.addInteraction(draw)
  map.addInteraction(snapii);
  
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
//function to save modified to in db
function saveModitodb() {
     var newgeom = geoms
     var Id = feature_id
     console.log(newgeom)
     console.log(Id)
     
          $.ajax({
              url: 'savemodi.php',
              type: 'POST',
              data: {
                  feature_id_ofgeom: Id,                
                  stringofgeom: newgeom
              },
              success: function(dataResult) {
                try {
                    var result = JSON.parse(dataResult);
                    console.log(result); // Log the entire parsed result
            
                    if (result.statusCode === 200) {
                        console.log(' feature updated successfully');
                    } else {
                        console.log(' feature not updated successfully');
                    }
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                    console.log('Original dataResult:', dataResult);
                }
            }
          });
//close the modal
$('#confirmFeatureModal').modal('hide')

refresh()
}
//function to save info to in db
function savetodb() {
    var featureArray = drawSource.getFeatures();
    var geoJSONformat = new ol.format.GeoJSON();
    var featuresGeojson = geoJSONformat.writeFeaturesObject(featureArray);
    var geojsonFeatureArray = featuresGeojson.features;
    console.log(geojsonFeatureArray)
    for (var i = 0; i < geojsonFeatureArray.length; i++) {
        var type = document.getElementById('typeoffeatures').value;
        var name = document.getElementById('exampleInputtext1').value;
        var geom = JSON.stringify(geojsonFeatureArray[i].geometry);
        console.log(geom);
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
function clearEditSource(){
  editSource.clear()
}

/* save button sa control bar

var mainbar = new ol.control.Bar({
 // mainbar.setPosition(left);
});
map.addControl(mainbar);

var button = new ol.control.Button({
  html: '<i class="fa-solid fa-pen-to-square"></i>',
  handleClick: function () {
    startedit()
    console.log('Button clicked!');
  }
});
mainbar.addControl(button);
*/

/* mga kupal

var geom = [];
  editdrawLayer.getSource().getFeatures().forEach(function(f) {
    geom.push(f.getGeometry());
  });
  editdrawLayer.getSource().clear();
  editdrawLayer.getSource().addFeature(new ol.Feature(new ol.geom.GeometryCollection(geom)));
  console.log(geom)



modi.on(['modifystart', 'modifyend', 'modifying'], function(e) {
  // Try to get the modified features
  var f = e.features.item(0); // interactions.modify.getModifiedFeatures()[0];
  console.log(f)
  //if (e.type==='modifystart') $('.options p').html('');
  var info = e.type + ' '+ (e.features.getLength()||'??') + ' feature(s) : '; 
  console.log(info)
  info += (f ? f.getGeometry().getType() : '');
  if (f && f.getGeometry().flatCoordinates) info += ' '+(f ? (f.getGeometry().flatCoordinates.length/2) : '?') + ' point(s)'
  $('.options .'+e.type).text(info);
  var geoJSONformat = new ol.format.GeoJSON();
  var featuresGeojson = geoJSONformat.writeFeaturesObject(info);
  console.log(featuresGeojson)
});

modi.on('modifyend', function (event) {
  var modifiedFeature = event.features.getArray()[0];
  var modifiedGeometry = modifiedFeature.getGeometry();
  console.log(modifiedFeature)
  // Check the type of geometry
  var geometryType = modifiedGeometry.getType();
  console.log(geometryType);
  // Process based on the geometry type
  var modifiedCoordinates;

  switch (geometryType) {
    case 'Point':
      modifiedCoordinates = modifiedGeometry.getCoordinates();
      break;
    case 'LineString':
    case 'MultiLineString':
    case 'Polygon':
      modifiedCoordinates = modifiedGeometry.getCoordinates();
      break;
    default:
      console.warn('Unsupported geometry type:', geometryType);
      return;
  }

  // Store or process the modified coordinates as needed
  console.log('Modified Coordinates:', modifiedCoordinates);
});
*/

/* para sa edit features sana kaso ayaw gumana
// Main control bar

//Edit control bar 
var editbar = new ol.control.Bar({
 toggleOne: true,	// one control active at the same time
  group:false			// group controls together
});
mainbar.addControl(editbar);

// Add selection tool:
    //  1- a toggle control with a select interaction
    //  2- an option bar to delete / get information on the selected feature
    var sbar = new ol.control.Bar();
    sbar.addControl (new ol.control.Button({
      html: '<i class="fa fa-times"></i>',
      title: "Delete",
      handleClick: function() {
        var features = selectCtrl.getInteraction().getFeatures();
        if (!features.getLength()) info("Select an object first...");
        else info(features.getLength()+" object(s) deleted.");
        for (var i=0, f; f=features.item(i); i++) {
          vector.getSource().removeFeature(f);
        }
        selectCtrl.getInteraction().getFeatures().clear();
      }
    }));
    sbar.addControl (new ol.control.Button({
      html: '<i class="fa fa-info"></i>',
      title: "Show informations",
      handleClick: function() {
        switch (selectCtrl.getInteraction().getFeatures().getLength()){
          case 0: info("Select an object first...");
            break;
          case 1:
            var f = selectCtrl.getInteraction().getFeatures().item(0);
            info("Selection is a "+f.getGeometry().getType());
            break;
          default:
            info(selectCtrl.getInteraction().getFeatures().getLength()+ " objects seleted.");
            break;
        }
      }
    }));

var selectCtrl = new ol.control.Toggle({
  html: '<i class="fa fa-hand-pointer-o"></i>',
  title: "Select",
  interaction: new ol.interaction.Select ({ hitTolerance: 2 }),
  bar: sbar,
  autoActivate:true,
  active:true
});

editbar.addControl ( selectCtrl);


// Add editing tools
var pedit = new ol.control.Toggle({
  html: '<i class="fa fa-map-marker" ></i>',
  title: 'Point',
  interaction: new ol.interaction.Draw({
    type: 'Point',
    source: drawLayer.getSource()
  })
});
mainbar.addControl ( pedit );

var ledit = new ol.control.Toggle({
  html: '<i class="fa fa-share-alt" ></i>',
  title: 'LineString',
  interaction: new ol.interaction.Draw({
    type: 'LineString',
    source: drawLayer.getSource(),
    // Count inserted points
    geometryFunction: function(coordinates, geometry) {
        if (geometry) geometry.setCoordinates(coordinates);
      else geometry = new ol.geom.LineString(coordinates);
      this.nbpts = geometry.getCoordinates().length;
      return geometry;
    }
  }),
});

editbar.addControl ( ledit );

var fedit = new ol.control.Toggle({
  html: '<i class="fa-solid fa-draw-polygon"></i>',
    title: 'Polygon',
    interaction: new ol.interaction.Draw({
      type: 'Polygon',
      source: drawLayer.getSource(),
      // Count inserted points
      geometryFunction: function(coordinates, geometry) {
        this.nbpts = coordinates[0].length;
        if (geometry) geometry.setCoordinates([coordinates[0].concat([coordinates[0][0]])]);
        else geometry = new ol.geom.Polygon(coordinates);
        return geometry;
      }
    }),
});
editbar.addControl ( fedit );

// Add a simple push button to save features
var save = new ol.control.Button({
  html: '<i class="fa fa-download"></i>',
  title: "Save",
  handleClick: function(e) {
    var json= new ol.format.GeoJSON().writeFeatures(drawLayer.getSource().getFeatures());
    console.log(json)
    drawSource.clear()
  }
});
mainbar.addControl ( save );


map.addInteraction(new ol.interaction.Snap({ 
  source: drawLayer.getSource(), 
  pixelTolerance: 5 
}));


//var drawi = new ol.interaction.Draw({
  //source: featureLayer.getSource(),
  //type: "LineString"
 // type: "Polygon"
///});
//map.addInteraction(drawi);

//var select = new ol.interaction.Select({});
 // map.addInteraction(select);

  var drawi = new ol.interaction.Draw({
    source: drawLayer.getSource(),
    //type: "LineString"
    type: "Polygon"
  });
  map.addInteraction(drawi);

//var modi = new ol.interaction.ModifyFeature({ source: featureLayer.getSource() });
//map.addInteraction(modi);


var snapi = new ol.interaction.SnapGuides({ 
  vectorClass: ol.layer.VectorImage 
});
//snapi.setDrawInteraction(drawi);
snapi.setModifyInteraction(modi);
map.addInteraction(snapi);

// New guide on meridian (default Greenwich)
function addMeridian (x) {
  var p1 = ol.proj.transform([x||0,1], 'EPSG:4326', map.getView().getProjection());
  var p2 = ol.proj.transform([x||0,-1], 'EPSG:4326', map.getView().getProjection());
  snapi.addGuide([ p1, p2 ]);
};
// Switch initial condition
function setInitial (b) {
  snapi.enableInitialGuides_ = b;
};
*/
 /*may edit control bar

var mainbar = new ol.control.Bar();
map.addControl(mainbar);

//Edit control bar 
var editbar = new ol.control.Bar({
  toggleOne: true,	// one control active at the same time
   group:false			// group controls together
 });
 mainbar.addControl(editbar);

var save = new ol.control.Button({
  html: '<i class="fa fa-download"></i>',
  title: "Save",
  handleClick: function(e) {
    
  }
});
mainbar.addControl ( save );




   

*/
/* gumagana pero
map.on('click', function (evt) {
  
  var coordinate = evt.coordinate;
  var pixel = map.getPixelFromCoordinate(coordinate);
  // Get only the features at the clicked pixel
  var featuresAtPixel = map.getFeaturesAtPixel(pixel);
  if (featuresAtPixel) {
    // Initialize an empty GeoJSON object to store feature information
    var geojsonObject = {
      'type': 'FeatureCollection',
      'features': []
    };
    // Iterate through the features at the clicked pixel
    featuresAtPixel.forEach(function (feature) {
      // Get information from the feature as needed
      var geometryType = feature.getGeometry().getType();
      var properties = feature.getProperties();

      // Convert the OpenLayers feature to GeoJSON
      var geojsonFormat = new ol.format.GeoJSON();
      var featureGeoJSON = geojsonFormat.writeFeature(feature);

      // Add GeoJSON feature to the feature collection
      geojsonObject.features.push(JSON.parse(featureGeoJSON));

      // Optionally, log the GeoJSON string to the console
    //console.log('Feature Type:', geometryType);
    // console.log('Feature GeoJSON:', featureGeoJSON);
    });

    // Optionally, log the complete GeoJSON object to the console
   // console.log('Complete GeoJSON Object:', geojsonObject);
  }
});*/