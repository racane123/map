<?php
include 'db.php';


/*
$databaseConfig = [
   'host' => 'sql305.infinityfree.com',
    'user' => 'if0_35435943',
    'password' =>'YETZXocfNE',
   'db_name' => 'if0_35435943_gis',
   'port' =>'3306',
];
*/


// Set up your database connection
$databaseConfig = [
   'host' => 'localhost',
    'user' => 'root',
    'password' =>'',
   'db_name' => 'gis',
   'port' =>'3306',
];


// Create MySQLi connection
$dbconn = new mysqli(
    $databaseConfig['host'],
    $databaseConfig['user'],
    $databaseConfig['password'],
    $databaseConfig['db_name'],
    $databaseConfig['port']
);

// Check connection
if ($dbconn->connect_error) {
    die("Connection failed: " . $dbconn->connect_error);
}

// Handle CORS (Cross-Origin Resource Sharing) if needed
//header('Access-Control-Allow-Origin: https://gis-eta.vercel.app');
header('Access-Control-Allow-Origin: http://http://trygis.infinityfreeapp.com/'); // Adjust to match your actual origin
header('Access-Control-Allow-Methods: GET'); // Adjust as needed
//header('Access-Control-Allow-Headers: Content-Type'); // Adjust as needed

//$clicked = 'POLYGON((13473773.037832 1659717.0409431,13473805.045836 1659717.518674,13473805.58329 1659676.9712194,13473772.918401 1659676.9115039,13473773.037832 1659717.0409431))';
//$clicked2 = 'POLYGON((13473759.631493 1659701.2907342,13473765.364269 1659701.5893163,13473765.782286 1659696.8717187,13473759.810641 1659696.8717187,13473759.631493 1659701.2907342))';


// Define the API endpoint
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    //$query = 'SELECT type, name, ST_AsGeoJSON(geom) as geometry FROM featuredrawn WHERE ST_WITHIN(geom, ST_GeomFromText("POLYGON((13473773.037832 1659717.0409431,13473805.045836 1659717.518674,13473805.58329 1659676.9712194,13473772.918401 1659676.9115039,13473773.037832 1659717.0409431))"))';
   // $query = "SELECT type, name, ST_AsGeoJSON(geom) as geometry FROM featuredrawn WHERE ST_WITHIN(geom, ST_GeomFromText('$clicked'))";
  /* $query = "SELECT type, name, ST_AsGeoJSON(geom) as geometry FROM featuredrawn
   WHERE 
    type = 'Empty Lot'
   AND ST_Distance(
     ST_GeomFromText('$clicked2'), geom
   ) < 1
   ORDER BY
        ST_GeomFromText('$clicked2'), geom"  ;
*/
   
   $query = "SELECT type, name, ST_AsGeoJSON(geom) AS geometry FROM featuredrawn WHERE type = 'Boundary';";
    $result = $dbconn->query($query);

    if (!$result) {
        error_log('Error fetching data: ' . $dbconn->error);
        http_response_code(500);
        echo json_encode(['error' => 'Internal Server Error']);
        exit;
    }

    $features = [];

    while ($row = $result->fetch_assoc()) {
        $geometry = json_decode($row['geometry']);
        $feature = [
            'type' => 'Feature',
            'geometry' => $geometry,
            'properties' => [
                'type' => $row['type'],
                'name' => $row['name'],
            ],
        ];
        $features[] = $feature;
    }

    $geoJsonResponse = [
        'type' => 'FeatureCollection',
        'features' => $features,
    ];
    header('Content-Type: application/json');
    echo json_encode($geoJsonResponse);
    exit;
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Method Not Allowed']);
}


$dbconn->close();
?>