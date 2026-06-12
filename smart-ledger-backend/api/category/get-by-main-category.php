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

$main_category_id = intval($_GET['main_category_id'] ?? 0);
$company_id = intval($_GET['company_id'] ?? 0);

if (!$main_category_id || !$company_id) {
    echo json_encode(["status" => false, "message" => "Main category ID and Company ID required"]);
    exit;
}

$query = "
    SELECT id, name, status
    FROM categories
    WHERE main_category_id = $main_category_id
    AND company_id = $company_id
    AND is_deleted = 0
    AND status = 'active'
    ORDER BY name ASC
";

$result = mysqli_query($conn, $query);
$data = [];

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode([
    "status" => true,
    "data" => $data
]);
?>