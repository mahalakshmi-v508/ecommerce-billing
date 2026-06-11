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
$description = trim($data['description'] ?? '');
$status = trim($data['status'] ?? 'active');

if (!$id || !$name) {
    echo json_encode(["status"=>false, "message"=>"ID & Name required"]);
    exit;
}

$sql = "UPDATE main_categories 
        SET name='$name', 
            description='$description', 
            status='$status',
            updated_at = CURRENT_TIMESTAMP 
        WHERE id='$id'";

if ($conn->query($sql)) {
    echo json_encode(["status"=>true, "message"=>"Main Category updated successfully"]);
} else {
    echo json_encode(["status"=>false, "message"=>$conn->error]);
}
?>