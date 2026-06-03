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

/* PARSE JSON PAYLOAD WHEN NEEDED */
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

/* FORM DATA */

$name = trim($_POST['product_name'] ?? '');
$category_id = intval($_POST['category_id'] ?? 0);
$price = floatval($_POST['price'] ?? 0);
$stock = intval($_POST['stock'] ?? 0);
$product_code = trim($_POST['product_code'] ?? '');
$barcode = trim($_POST['barcode'] ?? '');
$unit = trim($_POST['unit'] ?? 'piece');
$gst = floatval($_POST['gst_percentage'] ?? 0);
$company_id = intval($_POST['company_id'] ?? 0);

$imageName = '';

/* IMAGE UPLOAD */

if (
    isset($_FILES['image']) &&
    $_FILES['image']['error'] === 0
) {

    $uploadDir =
        __DIR__ . '/../../uploads/products/';

    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $ext = pathinfo(
        $_FILES['image']['name'],
        PATHINFO_EXTENSION
    );

    $imageName =
        time() . "_" . rand(1000,9999) . "." . $ext;

    move_uploaded_file(
        $_FILES['image']['tmp_name'],
        $uploadDir . $imageName
    );
}

/* VALIDATION */

if (!$name || !$category_id || !$company_id) {

    echo json_encode([
        "status" => false,
        "message" => "Required fields missing"
    ]);

    exit;
}

/* CATEGORY CHECK */

$check = mysqli_query(
    $conn,
    "SELECT id
     FROM categories
     WHERE id='$category_id'
     AND company_id='$company_id'
     AND is_deleted=0
     AND status='active'"
);

if (mysqli_num_rows($check) == 0) {

    echo json_encode([
        "status" => false,
        "message" => "Invalid category"
    ]);

    exit;
}

/* INSERT */

$sql = "
INSERT INTO products
(
    product_name,
    product_code,
    category_id,
    price,
    stock,
    barcode,
    unit,
    gst_percentage,
    company_id,
    image
)
VALUES
(
    '$name',
    '$product_code',
    '$category_id',
    '$price',
    '$stock',
    '$barcode',
    '$unit',
    '$gst',
    '$company_id',
    '$imageName'
)
";

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