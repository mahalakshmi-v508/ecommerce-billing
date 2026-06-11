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

$id    = intval($data['id'] ?? 0);
$name  = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');

if (!$id) {
    echo json_encode([
        "status" => false,
        "message" => "Wholesaler ID required"
    ]);
    exit;
}

if (!$name || !$email || !$phone) {
    echo json_encode([
        "status" => false,
        "message" => "Name, Email and Phone are required"
    ]);
    exit;
}

// CHECK EXIST
$check = mysqli_query(
    $conn,
    "SELECT id FROM wholesalers WHERE id = $id"
);

if (mysqli_num_rows($check) == 0) {
    echo json_encode([
        "status" => false,
        "message" => "Wholesaler not found"
    ]);
    exit;
}

// CHECK EMAIL DUPLICATE
$emailCheck = mysqli_query(
    $conn,
    "SELECT id FROM wholesalers 
     WHERE email = '$email' 
     AND id != $id"
);

if (mysqli_num_rows($emailCheck) > 0) {
    echo json_encode([
        "status" => false,
        "message" => "Email already exists"
    ]);
    exit;
}

// UPDATE
$update = mysqli_query(
    $conn,
    "UPDATE wholesalers SET
        name = '$name',
        email = '$email',
        phone = '$phone'
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
    "message" => "Wholesaler updated successfully"
]);