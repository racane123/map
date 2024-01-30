<?php
include 'header.php';


?>


<div id="map-container mt-5">
      <div id="map"></div>
      <div class="container mt-5">
        <div id="saveForm">
        <h3>Save Drawing</h3>
      <form id="drawingForm">
        <div class="mb-3">
        <label for="saveName" class="form-label">Name:</label>
        <input type="text" class="form-control" id="saveName" name="saveName" required>
        </div>
        <div class="text-center">
        <button type="submit" class="btn btn-primary">Save</button>
        <button type="button" class="btn btn-secondary" onclick="cancelDrawing()">Cancel</button>
      </div>
    </form>
  </div>
</div>
    </div>
