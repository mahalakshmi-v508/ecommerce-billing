<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

/* HANDLE PREFLIGHT */
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include __DIR__ . '/../../config/db.php';

/* CHECK USER ID */
if (!isset($_GET['user_id']) || empty($_GET['user_id'])) {
    echo json_encode([
        "status" => false,
        "message" => "user_id required"
    ]);
    exit();
}

$user_id = intval($_GET['user_id']);

/* GET CART ITEMS */
$query = mysqli_query($conn, "
SELECT
    cart.id AS cart_id,
    cart.product_id,
    cart.quantity,
    products.product_name,
    products.price,
    products.stock,
    products.barcode,
    products.unit,
    products.gst_percentage,
    products.company_id
FROM cart
INNER JOIN products
    ON cart.product_id = products.id
WHERE cart.user_id = '$user_id'
AND products.is_deleted = 0
");

if (!$query) {
    echo json_encode([
        "status" => false,
        "message" => mysqli_error($conn)
    ]);
    exit();
}

$data = [];

while ($row = mysqli_fetch_assoc($query)) {
    $data[] = $row;
}

echo json_encode([
    "status" => true,
    "data" => $data
]);