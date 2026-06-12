<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include __DIR__ . '/../../config/db.php';

$category_id = isset($_GET['category_id']) ? intval($_GET['category_id']) : 0;

if (!$category_id) {
    echo json_encode(["status" => false, "message" => "Category ID required"]);
    exit;
}

$query = "SELECT id, product_name, product_code, price, stock, image 
          FROM products 
          WHERE category_id = $category_id 
          AND is_deleted = 0 
          AND status = 'active' 
          ORDER BY id DESC";

$result = mysqli_query($conn, $query);
$products = [];

while ($row = mysqli_fetch_assoc($result)) {
    $products[] = $row;
}

echo json_encode([
    "status" => true,
    "data" => $products
]);
?>