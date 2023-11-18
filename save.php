<?php
include 'db.php';

$type = $_POST['typeofgeom'];
$name = $_POST['nameofgeom'];
$stringgeom = $_POST['stringofgeom'];
//$srid = '3857';


// Prepare the INSERT query with proper MySQL syntax
$add_query = "INSERT INTO featuredrawn (type, name, geom) VALUES ('$type', '$name', ST_GeomFromGeoJSON('$stringgeom'))";
//$add_query = "INSERT INTO featuredrawn (type, name, geom) VALUES ('$type', '$name', ST_GeomFromGeoJSON('$stringgeom', 4326))";

// Execute the query

$query = $dbconn->query($add_query);

// Check if the query was successful

// Check if the query was successful
if ($query) {
    // Return a valid JSON response
    header('Content-Type: application/json');
    echo json_encode(array("statusCode" => 200));
    exit;
} else {
    // Return a valid JSON response
    header('Content-Type: application/json');
    echo json_encode(array("statusCode" => 201));
    exit;
}

// Close the database connection





/*
include 'db.php';

$type = $_POST['typeofgeom'];
$name = $_POST['nameofgeom'];
$stringgeom = $_POST['stringofgeom'];
$srid = '3857';
//$add_query = "INSERT INTO public.\"FeatureDrawn\" (type, name, geom) VALUES ('$type', '$name', ST_GeomFromGeoJSON('$stringgeom'))";

$add_query = "INSERT INTO public.\"FeatureDrawn\" (type, name, geom) VALUES ('$type', '$name', ST_SetSRID(ST_GeomFromGeoJSON('$stringgeom'), $srid))";

$query = pg_query($dbconn, $add_query);
if ($query) {
    echo json_encode(array("statusCode" => 200));
} else {
    echo json_encode(array("statusCode" => 201));
}
*/
?>