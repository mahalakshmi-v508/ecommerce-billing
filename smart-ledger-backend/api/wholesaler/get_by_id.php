<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
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
        "message" => "Wholesaler ID required"
    ]);
    exit;
}

$query = mysqli_query(
    $conn,
    "SELECT
        id,
        name,
        email,
        phone,
        id_proof,
        approval_status,
        status,
        created_at
     FROM wholesalers
     WHERE id = $id
     LIMIT 1"
);

if (!$query || mysqli_num_rows($query) == 0) {
    echo json_encode([
        "status" => false,
        "message" => "Wholesaler not found"
    ]);
    exit;
}

$wholesaler = mysqli_fetch_assoc($query);

echo json_encode([
    "status" => true,
    "data" => $wholesaler
]);