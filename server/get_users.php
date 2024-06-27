<?php
// include 'config.php';
include './inc/dbconn.php';

header('Content-Type: application/json');

// Query to select all users
$sql = "SELECT id, username FROM users";
$result = $conn->query($sql);

$users = [];

if ($result->num_rows > 0) {
    // Output data of each row
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    echo json_encode(["status" => "success", "data" => $users]);
} else {
    echo json_encode(["status" => "error", "message" => "No users found"]);
}

$conn->close();
?>
