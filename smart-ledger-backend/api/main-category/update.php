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
$company_id = intval($data['company_id'] ?? 0);

if (empty($id)) {
    echo json_encode(["status" => false, "message" => "Category ID is required"]);
    exit;
}

if (empty($name)) {
    echo json_encode(["status" => false, "message" => "Category name is required"]);
    exit;
}

// Check for duplicate excluding current
$check_sql = "SELECT id FROM main_categories 
              WHERE name = '$name' 
              AND company_id = $company_id 
              AND is_deleted = 0 
              AND id != $id";
$check_result = mysqli_query($conn, $check_sql);

if (mysqli_num_rows($check_result) > 0) {
    echo json_encode(["status" => false, "message" => "Main category already exists"]);
    exit;
}

$sql = "UPDATE main_categories 
        SET name = '$name', 
            description = '$description', 
            status = '$status' 
        WHERE id = $id";

if (mysqli_query($conn, $sql)) {
    echo json_encode([
        "status" => true,
        "message" => "Main category updated successfully"
    ]);
} else {
    echo json_encode(["status" => false, "message" => "Database error: " . mysqli_error($conn)]);
}
?>