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

$name = trim($data['product_name'] ?? '');
$category_id = intval($data['category_id'] ?? 0);
$price = floatval($data['price'] ?? 0);
$stock = intval($data['stock'] ?? 0);
$barcode = trim($data['barcode'] ?? '');
$unit = trim($data['unit'] ?? 'piece');

if ($unit === '') {
    $unit = 'piece';
}

$gst = floatval($data['gst_percentage'] ?? 0);
$company_id = intval($data['company_id'] ?? 0);

if (!$name || !$category_id || !$company_id) {
    echo json_encode([
        "status" => false,
        "message" => "Required fields missing"
    ]);
    exit;
}

$check = mysqli_query($conn, "
    SELECT id
    FROM categories
    WHERE id='$category_id'
    AND company_id='$company_id'
    AND is_deleted=0
    AND status='active'
");

if (!$check) {
    echo json_encode([
        "status" => false,
        "message" => mysqli_error($conn)
    ]);
    exit;
}

if (mysqli_num_rows($check) == 0) {
    echo json_encode([
        "status" => false,
        "message" => "Invalid category_id or company_id"
    ]);
    exit;
}

$sql = "INSERT INTO products
(
    product_name,
    category_id,
    price,
    stock,
    barcode,
    unit,
    gst_percentage,
    company_id
)
VALUES
(
    '$name',
    '$category_id',
    '$price',
    '$stock',
    '$barcode',
    '$unit',
    '$gst',
    '$company_id'
)";

if (mysqli_query($conn, $sql)) {
    echo json_encode([
        "status" => true,
        "message" => "Product added successfully"
    ]);
} else {
    echo json_encode([
        "status" => false,
        "message" => mysqli_error($conn)
    ]);
}
?>