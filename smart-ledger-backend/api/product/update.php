<?php
// 🔥 CORS HEADERS
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// 🔥 PREFLIGHT
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include __DIR__ . '/../../config/db.php';

$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
$rawInput = file_get_contents('php://input');

if (
    stripos($contentType, 'application/json') !== false &&
    !empty($rawInput)
) {
    $jsonData = json_decode($rawInput, true);

    if (json_last_error() === JSON_ERROR_NONE && is_array($jsonData)) {
        $_POST = array_merge($_POST, $jsonData);
    }
}

$id = intval($_POST['id'] ?? 0);
$name = trim($_POST['product_name'] ?? '');
$product_code = trim($_POST['product_code'] ?? '');
$category_id = intval($_POST['category_id'] ?? 0);
$price = floatval($_POST['price'] ?? 0);
$stock = intval($_POST['stock'] ?? 0);
$barcode = trim($_POST['barcode'] ?? '');
$gst = floatval($_POST['gst_percentage'] ?? 0);
$company_id = intval($_POST['company_id'] ?? 0);

if (!$id || !$name || !$category_id || !$company_id) {
    echo json_encode(["status"=>false,"message"=>"Missing fields"]);
    exit;
}

// 🔥 VALIDATION AGAIN
$check = mysqli_query($conn, "SELECT id FROM categories 
WHERE id='$category_id' AND company_id='$company_id' AND is_deleted=0");

if (mysqli_num_rows($check) == 0) {
    echo json_encode(["status"=>false,"message"=>"Invalid category/company"]);
    exit;
}

$sql = "UPDATE products SET
product_name='$name',
product_code='$product_code',
category_id='$category_id',
price='$price',
stock='$stock',
barcode='$barcode',
gst_percentage='$gst'
WHERE id='$id'";

if ($conn->query($sql)) {
    echo json_encode(["status"=>true,"message"=>"Updated"]);
} else {
    echo json_encode(["status"=>false,"message"=>$conn->error]);
}
?>