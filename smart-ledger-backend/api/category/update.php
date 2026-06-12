<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include __DIR__ . '/../../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);

$id = intval($data['id'] ?? 0);
$name = trim($data['name'] ?? '');
$main_category_id = isset($data['main_category_id']) && !empty($data['main_category_id']) ? intval($data['main_category_id']) : null;

if (!$id || !$name) {
    echo json_encode(["status" => false, "message" => "ID & Name required"]);
    exit;
}

// Update with main_category_id
if ($main_category_id) {
    $sql = "UPDATE categories SET name='$name', main_category_id=$main_category_id WHERE id='$id'";
} else {
    $sql = "UPDATE categories SET name='$name', main_category_id=NULL WHERE id='$id'";
}

if ($conn->query($sql)) {
    echo json_encode(["status" => true, "message" => "Category updated successfully"]);
} else {
    echo json_encode(["status" => false, "message" => $conn->error]);
}
?>