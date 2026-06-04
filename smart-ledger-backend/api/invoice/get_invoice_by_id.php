<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");

include __DIR__ . '/../../config/db.php';

$invoice_no = $_GET['id'];

// 🔥 JOIN COMPANY TABLE
$result = $conn->query("
SELECT i.*, 
       c.company_name,
       c.company_address,
       c.phone,
       c.gstin,
       c.logo,
        c.gst_type 
FROM invoices i
LEFT JOIN companies c ON i.company_id = c.id
WHERE i.invoice_no='$invoice_no'
");

if($result->num_rows > 0){
    $row = $result->fetch_assoc();

$products = json_decode($row['products'], true);

foreach ($products as &$item) {

    $pid = intval($item['product_id']);

    $productQuery = $conn->query("
        SELECT
            product_name,
            price,
            gst_percentage
        FROM products
        WHERE id = '$pid'
        LIMIT 1
    ");

    if ($productQuery && $productQuery->num_rows > 0) {

        $product = $productQuery->fetch_assoc();

        $item['name'] = $product['product_name'];
        $item['price'] = $product['price'];
        $item['gst'] = $product['gst_percentage'];
    }
}

$row['products'] = $products;    

    echo json_encode([
        "status"=>true,
        "data"=>$row
    ]);
}else{
    echo json_encode([
        "status"=>false,
        "message"=>"Invoice not found"
    ]);
}
?>