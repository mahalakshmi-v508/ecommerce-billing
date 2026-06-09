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
    echo json_encode([
        "status" => false,
        "message" => "Missing fields"
    ]);
    exit;
}

/* CATEGORY VALIDATION */

$check = mysqli_query(
    $conn,
    "SELECT id
     FROM categories
     WHERE id='$category_id'
     AND company_id='$company_id'
     AND is_deleted=0"
);

if (mysqli_num_rows($check) == 0) {

    echo json_encode([
        "status" => false,
        "message" => "Invalid category/company"
    ]);
    exit;
}

/* IMAGE UPLOAD */

$imageName = '';

if (
    isset($_FILES['image']) &&
    $_FILES['image']['error'] === 0
) {

    $uploadDir = __DIR__ . '/../../uploads/products/';

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

/* UPDATE QUERY */

$sql = "
UPDATE products SET
product_name='$name',
product_code='$product_code',
category_id='$category_id',
price='$price',
stock='$stock',
barcode='$barcode',
gst_percentage='$gst'
";

if ($imageName != '') {
    $sql .= ", image='$imageName'";
}

$sql .= " WHERE id='$id'";

/* EXECUTE */

if (mysqli_query($conn, $sql)) {

    echo json_encode([
        "status" => true,
        "message" => "Product updated successfully"
    ]);

} else {

    echo json_encode([
        "status" => false,
        "message" => mysqli_error($conn)
    ]);
}