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
$user_id = $_GET['user_id'];

$query = mysqli_query($conn,"
SELECT 
cart.id,
cart.quantity,
products.product_name,
products.price,
products.stock
FROM cart
JOIN products 
ON cart.product_id = products.id
WHERE cart.user_id = '$user_id'
");

$data = [];

while($row = mysqli_fetch_assoc($query)){
    $data[] = $row;
}

echo json_encode([
    "status" => true,
    "data" => $data
]);

?>