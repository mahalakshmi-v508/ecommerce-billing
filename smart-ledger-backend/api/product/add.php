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
$wholesale_price = floatval($_POST['wholesale_price'] ?? 0);
$min_wholesale_qty = intval($_POST['min_wholesale_qty'] ?? 0);
$stock = intval($_POST['stock'] ?? 0);
$product_code = trim($_POST['product_code'] ?? '');
$barcode = trim($_POST['barcode'] ?? '');
$gst = floatval($_POST['gst_percentage'] ?? 0);
$company_id = intval($_POST['company_id'] ?? 0);

$imageName = '';

/* IMAGE UPLOAD */

/* IMAGE UPLOAD */

$imageName = '';
$imageBase64 = '';

$jsonData = $jsonData ?? [];

if (!empty($jsonData['image']) && is_string($jsonData['image'])) {
    $imageBase64 = $jsonData['image'];
}

/* DEBUG */
error_log("POST => " . print_r($_POST, true));
error_log("FILES => " . print_r($_FILES, true));

if (
    isset($_FILES['image']) &&
    $_FILES['image']['error'] === UPLOAD_ERR_OK
) {

    $uploadDir = __DIR__ . '/../../uploads/products/';

    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $ext = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));

    $imageName = time() . "_" . rand(1000,9999) . "." . $ext;

    $targetFile = $uploadDir . $imageName;

    if (
        !move_uploaded_file(
            $_FILES['image']['tmp_name'],
            $targetFile
        )
    ) {

        echo json_encode([
            "status" => false,
            "message" => "Failed to move uploaded image",
            "tmp_file" => $_FILES['image']['tmp_name'],
            "target" => $targetFile
        ]);
        exit;
    }

} elseif (!empty($imageBase64)) {

    $uploadDir = __DIR__ . '/../../uploads/products/';

    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    if (strpos($imageBase64, 'data:image') === 0) {

        list($type, $imageBase64) = explode(';', $imageBase64);
        list(, $imageBase64) = explode(',', $imageBase64);

        $imageBase64 = base64_decode($imageBase64);

        $ext = explode('/', $type)[1] ?? 'png';

    } else {

        $imageBase64 = base64_decode($imageBase64);

        $ext = 'png';
    }

    if ($imageBase64 !== false) {

        $imageName = time() . "_" . rand(1000,9999) . "." . $ext;

        file_put_contents(
            $uploadDir . $imageName,
            $imageBase64
        );
    }
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
$companyRes = mysqli_query(
    $conn,
    "SELECT business_type
     FROM companies
     WHERE id='$company_id'
     LIMIT 1"
);

$company = mysqli_fetch_assoc($companyRes);

$business_type = $company['business_type'] ?? 'retail';


if ($business_type == "retail") {

    if ($price <= 0) {
        echo json_encode([
            "status" => false,
            "message" => "Retail price required"
        ]);
        exit;
    }

    $wholesale_price = 0;
    $min_wholesale_qty = 0;
}

if ($business_type == "wholesale") {

    if ($wholesale_price <= 0 || $min_wholesale_qty <= 0) {
        echo json_encode([
            "status" => false,
            "message" => "Wholesale fields required"
        ]);
        exit;
    }

    $price = 0;
}

if ($business_type == "both") {

    if (
        $price <= 0 ||
        $wholesale_price <= 0 ||
        $min_wholesale_qty <= 0
    ) {
        echo json_encode([
            "status" => false,
            "message" => "All pricing fields required"
        ]);
        exit;
    }
}
/* INSERT */

$sql = "
INSERT INTO products (
product_name,
product_code,
category_id,
price,
wholesale_price,
min_wholesale_qty,
product_type,
stock,
barcode,
gst_percentage,
company_id,
image
)
VALUES (
'$name',
'$product_code',
'$category_id',
'$price',
'$wholesale_price',
'$min_wholesale_qty',
'$business_type',
'$stock',
'$barcode',
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