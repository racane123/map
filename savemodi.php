<?php
include 'db.php';




$feature_id = $_POST['feature_id_ofgeom'];
$stringgeom = $_POST['stringofgeom'];

// Use a prepared statement to avoid SQL injection
$add_query = $dbconn->prepare("UPDATE featuredrawn SET geom = ST_GeomFromGeoJSON(?) WHERE feature_id = ?");
$add_query->bind_param("si", $stringgeom, $feature_id); // 'si' indicates string and integer data types

// Execute the prepared statement
if ($add_query->execute()) {
    echo json_encode(array("statusCode" => 200));
} else {
    echo json_encode(array("statusCode" => 201, "error" => $add_query->error));
}

// Close the prepared statement
$add_query->close();

// Close the database connection (assuming $conn is your database connection)
$dbconn->close();
?>
