<?php
// Connection parameters
$host = 'localhost';
$username = 'root'; // Replace with your MySQL username
$password = ''; // Replace with your MySQL password
$database = 'localgovernment';
$port = 3308;

// Establish a connection to the database
$conn = mysqli_connect($host, $username, $password, $database, $port);

// Check the connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
