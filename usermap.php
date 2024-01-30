<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Mapbox Traffic Example</title>
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
    <script src="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js"></script>
    <link href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css" rel="stylesheet" />
    <style>
        body { margin: 0; padding: 0; }
        #map { position: absolute; top: 0; bottom: 0;right:1px; width: 85%; }
        #saveForm {
        display: none;
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 10px;
        z-index: 1;
        max-width: 90%;
        width: 300px;
        text-align: center;
        }

    @media (max-width: 768px) {
        #saveForm {
        width: 90%;
        }
    }  
    </style>

</head>
<body>

<?php
include 'header.php';
include 'map.php';

?>
<script src="javascript/map.js"></script>
</body>
</html>