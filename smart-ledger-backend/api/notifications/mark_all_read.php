<?php



header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


include "../../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

$company_id = intval($data['company_id'] ?? 0);

if (!$company_id) {
    echo json_encode([
        "status" => false,
        "message" => "Company ID required"
    ]);
    exit;
}

mysqli_query(
    $conn,
    "UPDATE notifications
     SET is_read = 1
     WHERE company_id = '$company_id'
     AND is_read = 0"
);

echo json_encode([
    "status" => true,
    "message" => "Marked as read"
]);