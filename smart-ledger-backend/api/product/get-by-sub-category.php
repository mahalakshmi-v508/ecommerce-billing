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

$category_id = isset($_GET['category_id']) ? intval($_GET['category_id']) : 0;

if (!$category_id) {
    echo json_encode(["status" => false, "message" => "Category ID required"]);
    exit;
}

$query = "
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
        p.unit
    FROM products p
    WHERE p.category_id = $category_id
    AND p.is_deleted = 0
    AND p.status = 'active'
    ORDER BY p.id DESC
";

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