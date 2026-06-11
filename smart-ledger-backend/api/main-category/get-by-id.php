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
    echo json_encode(["status"=>false, "message"=>"ID required"]);
    exit;
}

$result = mysqli_query($conn, "SELECT * FROM main_categories WHERE id='$id'");

if ($result && mysqli_num_rows($result) > 0) {
    $data = mysqli_fetch_assoc($result);
    echo json_encode(["status"=>true, "data"=>$data]);
} else {
    echo json_encode(["status"=>false, "message"=>"Main Category not found"]);
}
?>