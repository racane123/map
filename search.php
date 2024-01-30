<?php
include 'dbconn.php';

if (isset($_GET['query'])) {
    $query = $_GET['query'];

    // Escape the input to prevent SQL injection
    $query = pg_escape_string($query);

    // Construct the SQL query
    $sql = "SELECT * FROM drawn_features WHERE name ILIKE '$query%' ";

    // Execute the query
    $result = pg_query($conn, $sql);

    if ($result) {
        if (pg_num_rows($result) > 0) {
            // Fetch and display results
            while ($row = pg_fetch_assoc($result)) {
                // Output your results here
                echo $row['name'] . "<br>";
                echo $row['feature_type']. "<br>";
                echo $row['coordinates'];
            }
        } else {
            echo "No results found.";
        }
    } else {
        // Handle query execution error
        echo "Error executing query: " . pg_last_error($connection);
    }
} else {
    echo "Invalid search query.";
}

// Close the database connection (assuming $connection is your PostgreSQL connection)
?>
