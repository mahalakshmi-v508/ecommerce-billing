<?php

// header("Content-Type: application/json");
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: Content-Type, Authorization");
// header("Access-Control-Allow-Methods: POST, OPTIONS");

// if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
//     http_response_code(200);
//     exit();
// }

// include __DIR__ . '/../../config/db.php';

// $company_id = $_GET['company_id'] ?? 0;

// if ($company_id === '' || $company_id === null) {

//     echo json_encode([
//         "status" => false,
//         "message" => "company_id required"
//     ]);

//     exit;
// }

// $result = mysqli_query($conn, "
// SELECT * FROM categories
// WHERE company_id='$company_id'
// AND is_deleted=0
// AND status='active'
// ");

// $data = [];

// while ($row = mysqli_fetch_assoc($result)) {
//     $data[] = $row;
// }

// echo json_encode([
//     "status" => true,
//     "data" => $data
// ]);


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
    SELECT *
    FROM categories
    WHERE is_deleted = 0
    AND status = 'active'
";

if (!empty($company_id)) {
    $company_id = mysqli_real_escape_string($conn, $company_id);
    $query .= " AND company_id = '$company_id'";
}

$query .= " ORDER BY id DESC";

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