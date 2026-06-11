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

// 🔥 FIX: If company_id is 0 or empty, use default 1
if (empty($company_id) || $company_id == '0') {
    $company_id = 1;
}

$query = "SELECT * FROM main_categories 
          WHERE status = 'active'";

if (!empty($company_id)) {
    $company_id = mysqli_real_escape_string($conn, $company_id);
    $query .= " AND company_id = '$company_id'";
}

$query .= " ORDER BY name ASC";

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