<?php

include_once('dbconn.php');

if (isset($_POST['first_name'], $_POST['last_name'], $_POST['email'], $_POST['password'], $_POST['role'])) {

    $form_data = array();
    $form_data['first_name'] = pg_escape_string($_POST['first_name']);
    $form_data['last_name'] = pg_escape_string($_POST['last_name']);
    $form_data['email'] = pg_escape_string($_POST['email']);
    $form_data['password'] = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $form_data['role'] = pg_escape_string($_POST['role']);

    $sql = "INSERT INTO users (first_name, last_name, email, password, role) VALUES ($1, $2, $3, $4, $5)";

    $response = pg_query_params($conn, $sql, array_values($form_data));

    if ($response) {
        echo json_encode($form_data);
    } else {
        echo "Error inserting data. " . pg_last_error($conn);
    }
} else {
    echo "No data has been inserted";
}
?>
