<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!---bootstrap css-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <!--OpenLayers CSS-->
    <link rel="stylesheet" href="https://openlayers.org/en/v4.6.5/css/ol.css" type="text/css">
    <!--OpenLayers JS-->
    <script src="https://openlayers.org/en/v4.6.5/build/ol.js" type="text/javascript"></script>
    <!--Custom CSS-->
    <link rel="stylesheet" href="custom/css/style.css">
    <!--fontawesome icons-->
    <link href="assets\fontawesome\css\all.css" rel="stylesheet">

    <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>



    
    <script src="assets\js\search_ol-ext.js"></script>
    <!--crop-->
    <script src="assets\js\crop_ol-ext.js"></script>
    
    <script src="assets\js\hays_ol-ext.js"></script>
    <!--control-->
    <!--<link rel="stylesheet" href="assets\css\control_ol-ext.css">-->
    <script src="assets\js\control_ol-ext.js"></script>
    

    <link rel="stylesheet" href="assets\css\search_ol-ext.css">
    <!--pop up-->
    <link rel="stylesheet" href="assets\css\ol-ext.css">
    <!--<script src="assets\js\ol-ext.js"></script>-->
    



    <!-- mapbox
    <link href="https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css" rel="stylesheet">
    <script src="https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js"></script>-->


    <link rel="icon" href="/favicon.ico" type="image/x-icon">

    <title>GIS MAP</title>




</head>
<body>
    <!--navbar-->
<?php

include('navbar.php');
?>    




    

    <!-- Map Div-->
    <div class="map" id="map"></div>
    
    <!--<div class="map2" id="map2"></div>-->

    
    <!--start modify feature confirmation Modal -->
<div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modifying Points - Lines - Polygons</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
       ARE YOU SURE?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="clearEditSource()">NO</button>
        <button type="button" class="btn btn-primary" onclick="startedit()">YES</button>
      </div>
    </div>
  </div>
</div>
   <!--end modify feature confirmation Modal -->

   <!--start save update modify feature confirmation Modal -->
<div class="modal fade" id="confirmFeatureModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">SAVING MODIFIED Points - Lines - Polygons</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
       ARE YOU SURE?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="clearEditSource()">NO</button>
        <button type="button" class="btn btn-primary" id="refreshButton2" onclick="saveModitodb()">YES</button>
      </div>
    </div>
  </div>
</div>
   <!--end save update modify feature confirmation Modal -->


    
    <!--begin: start draw Modal -->
<div class="modal fade" id="startdrawModal" tabindex="-1" aria-labelledby="startdrawModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="startdrawModalLabel">Select Draw Type</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" style="text-align: center;">
        <!--cards-->

    <div class="row">

        <div class="col-4">
        <div class="card">
            <div class="card-body">
              <h5 class="card-title">Point</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">POLE,SIGNS,TREE etc..</h6>
              <p class="card-text"><i class="fa-solid fa-location-dot fa-2x "></i></p>
              <a onclick="startDraw('Point')" class="card-link">Add Point</a>
            
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Line</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">Road,River,Sapa etc</h6>
              <p class="card-text"><i class="fa-solid fa-road fa-2x"></i></p>
              <a onclick="startDraw('LineString')" class="card-link">Add Line</a>
             
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Polygon</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">Building,Empty Lot etc..</h6>
              <p class="card-text"><i class="fa-solid fa-draw-polygon fa-2x"></i></p>
              <a onclick="startDraw('Polygon')" class="card-link">Add Polygon</a>
              
            </div>
          </div>
        </div>

    </div>


        </div>
        
      </div>
    </div>
  </div>
   <!--end: start draw Modal -->



<!--begin: enter information Modal -->
<div class="modal fade" id="enterInformationModal" tabindex="-1" aria-labelledby="enterInformationModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="enterInformationModalLabel">Enter Feature's Details</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" style="text-align: center;">


        <!--begin input-->

        <div class="form-group">
            <label for="typeoffeatures">Type of Feature</label>
            <select class="form-control" id="typeoffeatures">
              
            </select>
          </div>
    

          <div class="form-group">
            <label for="exampleInputtext1">Name</label>
            <input type="text" class="form-control" id="exampleInputtext1" aria-describedby="textHelp">
            <small id="textHelp" class="form-text text-muted">Address,Name etc..</small>
          </div>

        <!--end input-->

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="clearDrawSource()">Close</button>
          <button type="button" class="btn btn-primary" id="refreshButton" onclick="savetodb()"> Save Feature </button>
        </div>
      </div>
    </div>
  </div>
   <!--end: enter information Modal -->






  <!--boostrap js-->
 
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossorigin="anonymous"></script>
  
 
  <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.6.2/proj4.js"></script>-->

  <!--Custom JS-->
  <script src="custom\js\main.js"></script>



</body>
</html>