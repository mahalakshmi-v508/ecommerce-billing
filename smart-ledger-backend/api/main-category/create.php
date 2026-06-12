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

$name = trim($data['name'] ?? '');
$description = trim($data['description'] ?? '');
$company_id = intval($data['company_id'] ?? 0);
$status = trim($data['status'] ?? 'active');

if (empty($name)) {
    echo json_encode(["status" => false, "message" => "Category name is required"]);
    exit;
}

if (empty($company_id)) {
    echo json_encode(["status" => false, "message" => "Company ID is required"]);
    exit;
}

// Check for duplicate
$check_sql = "SELECT id FROM main_categories WHERE name = '$name' AND company_id = $company_id AND is_deleted = 0";
$check_result = mysqli_query($conn, $check_sql);

if (mysqli_num_rows($check_result) > 0) {
    echo json_encode(["status" => false, "message" => "Main category already exists"]);
    exit;
}

$sql = "INSERT INTO main_categories (name, description, company_id, status) 
        VALUES ('$name', '$description', $company_id, '$status')";

if (mysqli_query($conn, $sql)) {
    $id = mysqli_insert_id($conn);
    echo json_encode([
        "status" => true,
        "message" => "Main category created successfully",
        "data" => ["id" => $id]
    ]);
} else {
    echo json_encode(["status" => false, "message" => "Database error: " . mysqli_error($conn)]);
}
?>