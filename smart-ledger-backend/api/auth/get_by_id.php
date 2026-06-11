<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "../../config/db.php";

$id = intval($_GET['id'] ?? 0);

if (!$id) {
    echo json_encode([
        "status" => false,
        "message" => "User ID required"
    ]);
    exit;
}

$query = mysqli_query(
    $conn,
    "SELECT id, name, email, company_id, role
     FROM users
     WHERE id = $id
     LIMIT 1"
);

$user = mysqli_fetch_assoc($query);

if (!$user) {
    echo json_encode([
        "status" => false,
        "message" => "User not found"
    ]);
    exit;
}

echo json_encode([
    "status" => true,
    "data" => [
        "id" => $user['id'],
        "name" => $user['name'],
        "email" => $user['email'],
        "company_id" => $user['company_id'],
        "role" => $user['role'] ?: 'user'
    ]
]);

?>