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

$sql = "SELECT id, name, description 
        FROM main_categories 
        WHERE company_id = $company_id 
        AND is_deleted = 0 
        AND status = 'active' 
        ORDER BY name ASC";

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