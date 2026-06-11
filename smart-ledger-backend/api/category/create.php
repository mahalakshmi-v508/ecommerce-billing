<?php
// 🔥 CORS HEADERS
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// 🔥 PREFLIGHT
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include __DIR__ . '/../../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);

$name = trim($data['name'] ?? '');
$main_category_id = intval($data['main_category_id'] ?? 0);
$company_id = intval($data['company_id'] ?? 0);

if (!$name || !$company_id || !$main_category_id) {
    echo json_encode(["status"=>false, "message"=>"Name, Main Category & Company required"]);
    exit;
}

// Check if main category exists and is active
$mainCatCheck = mysqli_query($conn, "SELECT id FROM main_categories 
    WHERE id='$main_category_id' AND company_id='$company_id' AND status='active'");

if (mysqli_num_rows($mainCatCheck) == 0) {
    echo json_encode(["status"=>false, "message"=>"Invalid or inactive Main Category"]);
    exit;
}

// Duplicate check within same main category
$dup = mysqli_query($conn, "SELECT id FROM categories 
    WHERE name='$name' AND company_id='$company_id' AND main_category_id='$main_category_id' AND is_deleted=0");

if (mysqli_num_rows($dup) > 0) {
    echo json_encode(["status"=>false, "message"=>"Sub Category already exists under this Main Category"]);
    exit;
}

$sql = "INSERT INTO categories (name, main_category_id, company_id, status) 
        VALUES ('$name', '$main_category_id', '$company_id', 'active')";

if ($conn->query($sql)) {
    echo json_encode([
        "status"=>true, 
        "message"=>"Sub Category added successfully",
        "id"=>$conn->insert_id
    ]);
} else {
    echo json_encode(["status"=>false, "message"=>$conn->error]);
}
?>