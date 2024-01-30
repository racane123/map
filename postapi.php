<?php
include_once 'dbconn.php';

if (isset($_POST['name'], $_POST['featureType'], $_POST['coordinates'])) {
    $name = $_POST['name'];
    $featureType = $_POST['featureType'];
    $rawCoordinates = $_POST['coordinates'];
  
    // Remove surrounding double quotes from the received GeoJSON
    $rawCoordinates = trim($rawCoordinates, '"');
  
    // Decode coordinates as an array
    $coordinates = json_decode($rawCoordinates, true);
  
    // Ensure $coordinates is an array
    if (!is_array($coordinates)) {
        echo "Error: Invalid coordinates format.";
        exit;
    }
  
    // Manually add the "type" property to the GeoJSON data
    $geojson = '{"type": "' . $featureType . '", "coordinates": ' . json_encode($coordinates) . '}';
  
    // Insert data into the database using a prepared statement
    $sql = "INSERT INTO drawn_features (name, feature_type, coordinates) VALUES (?, ?, ST_GeomFromGeoJSON(?))";
  
    // Create a prepared statement
    $stmt = mysqli_prepare($conn, $sql);

    // Bind parameters to the prepared statement
    mysqli_stmt_bind_param($stmt, "sss", $name, $featureType, $geojson);
  
    // Execute the query
    $result = mysqli_stmt_execute($stmt);

    // Check if the insertion was successful
    if ($result) {
        echo "Data inserted successfully.";
    } else {
        echo "Error: Failed to insert data. " . mysqli_error($conn);
    }

    // Close the statement
    mysqli_stmt_close($stmt);
} else {
    echo "Error: Invalid input.";
}

// Close the database connection
mysqli_close($conn);
?>
