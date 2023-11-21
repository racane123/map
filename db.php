<?php

/*
$server = 'sql305.infinityfree.com';
$db_name = 'if0_35435943_gis';
$username = 'if0_35435943';
$password = 'YETZXocfNE';
$port = '3306';
*/


$server = 'localhost';
$db_name = 'gis';
$username = 'root';
$password = '';
$port = '3390';


// Create connection
$dbconn = new mysqli($server, $username, $password, $db_name, $port);

// Check connection
if ($dbconn->connect_error) {
    die("Connection failed: " . $dbconn->connect_error);
}

//echo "Connected successfully";








/*

$server = 'localhost';
$db_name = 'gis';
$username = 'root';
$password = '';
$port   = '3390';


 $dbconn = new mysqli("host=$server, user=$username, password=$password, dbname=$db_name, port=$port");

 
if (!$dbconn) {
    die("Connection failed: " . pg_last_error());
}




$server = 'localhost';
$db_name = 'GIS';
$username = 'postgres';
$password = 'postgres';
$port   = '5432';
*/

//$dbconn = pg_connect("host=$server dbname=$db_name user=$username password=$password port=$port");

//$server = 'db.buycuwzzxzvvrcibgynq.supabase.co';
 //$db_name= 'postgres';
 //$username= 'postgres';
 //$password= '0909Try_only0909';
 //$port= '5432';

 //$dbconn = pg_connect("host=$server dbname=$db_name user=$username password=$password port=$port");

//user=postgres password=0909Try_only0909 host=db.buycuwzzxzvvrcibgynq.supabase.co port=5432 dbname=postgres
?>


