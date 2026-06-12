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

if (empty($id)) {
    echo json_encode(["status" => false, "message" => "Category ID is required"]);
    exit;
}

// Start transaction
mysqli_begin_transaction($conn);

try {
    // First, update categories to remove main_category reference
    mysqli_query($conn, "UPDATE categories SET main_category_id = NULL WHERE main_category_id = $id");
    
    // Soft delete main category
    $sql = "UPDATE main_categories SET is_deleted = 1 WHERE id = $id";
    
    if (!mysqli_query($conn, $sql)) {
        throw new Exception("Failed to delete main category");
    }
    
    mysqli_commit($conn);
    
    echo json_encode([
        "status" => true,
        "message" => "Main category deleted successfully"
    ]);
    
} catch (Exception $e) {
    mysqli_rollback($conn);
    echo json_encode([
        "status" => false,
        "message" => $e->getMessage()
    ]);
}
?>