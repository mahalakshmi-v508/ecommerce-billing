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

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if (empty($id)) {
    echo json_encode(["status" => false, "message" => "Category ID is required"]);
    exit;
}

$sql = "SELECT * FROM main_categories WHERE id = $id AND is_deleted = 0";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) == 0) {
    echo json_encode(["status" => false, "message" => "Category not found"]);
    exit;
}

$category = mysqli_fetch_assoc($result);

echo json_encode([
    "status" => true,
    "data" => $category
]);
?>