<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include './inc/dbconn.php';

// Get data from request
$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];
$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_DEFAULT); // Hash the password

// Check if email already exists
$checkEmailStmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$checkEmailStmt->bind_param("s", $email);
$checkEmailStmt->execute();
$checkEmailStmt->store_result();

if ($checkEmailStmt->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Email already exists"]);
} else {
    // Prepare SQL statement to insert new user
    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $password);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "User registered successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error registering user"]);
    }

    // Close statement
    $stmt->close();
}

// Close check email statement and connection
$checkEmailStmt->close();
$conn->close();
?>
