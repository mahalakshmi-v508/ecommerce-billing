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

$id = $_GET['id'] ?? 0;

if (!$id) {
    echo json_encode(["status" => false, "message" => "ID required"]);
    exit;
}

$query = "
    SELECT c.*, mc.name as main_category_name, mc.id as main_category_id
    FROM categories c
    LEFT JOIN main_categories mc ON c.main_category_id = mc.id
    WHERE c.id = '$id' AND c.is_deleted = 0
";

$result = mysqli_query($conn, $query);
$data = mysqli_fetch_assoc($result);

if ($data) {
    echo json_encode(["status" => true, "data" => $data]);
} else {
    echo json_encode(["status" => false, "message" => "Category not found"]);
}
?>