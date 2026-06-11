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

if (!$id) {
    echo json_encode(["status"=>false, "message"=>"ID required"]);
    exit;
}

mysqli_begin_transaction($conn);

try {
    // First update categories to remove reference
    mysqli_query($conn, "UPDATE categories SET main_category_id = NULL WHERE main_category_id = $id");
    
    // Then delete main category
    $result = mysqli_query($conn, "DELETE FROM main_categories WHERE id = $id");
    
    if (!$result) {
        throw new Exception("Delete failed: " . mysqli_error($conn));
    }
    
    mysqli_commit($conn);
    
    echo json_encode([
        "status" => true,
        "message" => "Main Category deleted successfully"
    ]);
    
} catch (Exception $e) {
    mysqli_rollback($conn);
    
    echo json_encode([
        "status" => false,
        "message" => $e->getMessage()
    ]);
}
?>