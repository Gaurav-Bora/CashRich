<?php
$servername = "localhost";
$username = "root";
$password = "Gaurav@98";
$dbname = "my_app";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
