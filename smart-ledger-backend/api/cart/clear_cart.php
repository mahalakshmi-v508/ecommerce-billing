<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "../../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);
$user_id = intval($data['user_id'] ?? 0);

if ($user_id > 0) {
    // Ungaloda cart table name 'cart' enil dynamic target delete
    $query = "DELETE FROM cart WHERE user_id = '$user_id'";
    
    if ($conn->query($query)) {
        echo json_encode(["status" => true, "message" => "Cart cleared successfully"]);
    } else {
        echo json_encode(["status" => false, "message" => "Database clear error: " . $conn->error]);
    }
} else {
    echo json_encode(["status" => false, "message" => "Invalid User ID context"]);
}