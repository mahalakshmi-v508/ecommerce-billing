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

$company_id = $_GET['company_id'] ?? '';
$main_category_id = $_GET['main_category_id'] ?? '';

$query = "
    SELECT c.*, 
           mc.name as main_category_name
    FROM categories c
    LEFT JOIN main_categories mc ON c.main_category_id = mc.id AND mc.is_deleted = 0
    WHERE c.is_deleted = 0
    AND c.status = 'active'
";

if (!empty($company_id)) {
    $company_id = mysqli_real_escape_string($conn, $company_id);
    $query .= " AND c.company_id = '$company_id'";
}

if (!empty($main_category_id)) {
    $main_category_id = mysqli_real_escape_string($conn, $main_category_id);
    $query .= " AND c.main_category_id = '$main_category_id'";
}

$query .= " ORDER BY c.name ASC";

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