<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include './inc/dbconn.php';

// Get data from request
$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];
$password = $data['password'];

// Prepare SQL statement to fetch user details
$stmt = $conn->prepare("SELECT id, username, password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($id, $username, $passwordHash);
$stmt->fetch();

// Check if user exists and verify password
if ($stmt->num_rows > 0 && password_verify($password, $passwordHash)) {
    echo json_encode(["status" => "success", "message" => "Login successful", "name" => $username]);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid email or password"]);
}

// Close statement and connection
$stmt->close();
$conn->close();
?>
