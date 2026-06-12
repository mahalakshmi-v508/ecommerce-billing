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

$query = "
    SELECT c.*, 
           mc.name as main_category_name,
           mc.id as main_category_id
    FROM categories c
    LEFT JOIN main_categories mc ON c.main_category_id = mc.id AND mc.is_deleted = 0
    WHERE c.is_deleted = 0
";

if (!empty($company_id)) {
    $company_id = mysqli_real_escape_string($conn, $company_id);
    $query .= " AND c.company_id = '$company_id'";
}

$query .= " ORDER BY c.id DESC";

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