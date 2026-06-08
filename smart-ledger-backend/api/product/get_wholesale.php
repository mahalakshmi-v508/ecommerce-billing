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

$company_id = 0;

// GET
if (isset($_GET['company_id'])) {
    $company_id = $_GET['company_id'];
}

// POST
if (isset($_POST['company_id'])) {
    $company_id = $_POST['company_id'];
}

// RAW JSON
$input = json_decode(file_get_contents("php://input"), true);

if (isset($input['company_id'])) {
    $company_id = $input['company_id'];
}

if (!$company_id) {

    echo json_encode([
        "status" => false,
        "message" => "company_id required"
    ]);

    exit;
}

$result = mysqli_query($conn, "
SELECT
    p.id,
    p.product_name,
    p.product_code,
    p.price,
    p.wholesale_price,
    p.min_wholesale_qty,
    p.product_type,
    p.stock,
    p.barcode,
    p.gst_percentage,
    p.image,
    p.company_id,
    p.category_id,
    c.name AS category_name,
    comp.business_type
FROM products p

INNER JOIN categories c
    ON p.category_id = c.id

INNER JOIN companies comp
    ON p.company_id = comp.id

WHERE p.company_id = '$company_id'
AND p.is_deleted = 0

AND (
    p.product_type = 'wholesale'
    OR p.product_type = 'both'
)

ORDER BY p.id DESC
");

$data = [];

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode([
    "status" => true,
    "data" => $data
]);
?>