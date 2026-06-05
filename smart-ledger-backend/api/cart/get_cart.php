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

$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;

$sql = "
SELECT 
    cart.id,
    cart.quantity,
    products.id AS product_id,
    products.company_id AS company_id,
    products.product_name,
    products.price,
    products.stock,
    products.image
FROM cart
JOIN products 
    ON cart.product_id = products.id
WHERE cart.user_id = ?
";

$stmt = mysqli_prepare($conn, $sql);

if (!$stmt) {
    echo json_encode([
        "status" => false,
        "message" => "Failed to prepare cart query",
        "data" => []
    ]);
    exit;
}

mysqli_stmt_bind_param($stmt, 'i', $user_id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

$data = [];

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

mysqli_stmt_close($stmt);

echo json_encode([
    "status" => true,
    "data" => $data
]);
?>