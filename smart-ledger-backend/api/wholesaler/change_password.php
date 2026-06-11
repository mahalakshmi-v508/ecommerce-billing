<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "../../config/db.php";

// GET JSON DATA
$data = json_decode(file_get_contents("php://input"), true);

$id               = intval($data['id'] ?? 0);
$current_password = trim($data['current_password'] ?? '');
$new_password     = trim($data['new_password'] ?? '');

if (!$id || !$current_password || !$new_password) {
    echo json_encode([
        "status" => false,
        "message" => "All fields are required"
    ]);
    exit;
}

if (strlen($new_password) < 6) {
    echo json_encode([
        "status" => false,
        "message" => "New password must be at least 6 characters"
    ]);
    exit;
}

// GET WHOLESALER
$query = mysqli_query(
    $conn,
    "SELECT password
     FROM wholesalers
     WHERE id = $id
     LIMIT 1"
);

if (mysqli_num_rows($query) == 0) {
    echo json_encode([
        "status" => false,
        "message" => "Wholesaler not found"
    ]);
    exit;
}

$user = mysqli_fetch_assoc($query);

// VERIFY CURRENT PASSWORD
if (!password_verify($current_password, $user['password'])) {
    echo json_encode([
        "status" => false,
        "message" => "Current password is incorrect"
    ]);
    exit;
}

// HASH NEW PASSWORD
$hashedPassword = password_hash(
    $new_password,
    PASSWORD_DEFAULT
);

// UPDATE PASSWORD
$update = mysqli_query(
    $conn,
    "UPDATE wholesalers
     SET password = '$hashedPassword'
     WHERE id = $id"
);

if (!$update) {
    echo json_encode([
        "status" => false,
        "message" => mysqli_error($conn)
    ]);
    exit;
}

echo json_encode([
    "status" => true,
    "message" => "Password changed successfully"
]);
?>