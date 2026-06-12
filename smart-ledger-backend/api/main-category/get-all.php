<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include __DIR__ . '/../../config/db.php';

$company_id = isset($_GET['company_id']) ? intval($_GET['company_id']) : 0;

if (empty($company_id)) {
    echo json_encode(["status" => false, "message" => "Company ID is required"]);
    exit;
}

$sql = "SELECT mc.*, 
               (SELECT COUNT(*) FROM categories c WHERE c.main_category_id = mc.id AND c.is_deleted = 0) as sub_category_count
        FROM main_categories mc
        WHERE mc.company_id = $company_id 
        AND mc.is_deleted = 0 
        ORDER BY mc.id DESC";

$result = mysqli_query($conn, $sql);
$categories = [];

while ($row = mysqli_fetch_assoc($result)) {
    $categories[] = $row;
}

echo json_encode([
    "status" => true,
    "data" => $categories
]);
?>