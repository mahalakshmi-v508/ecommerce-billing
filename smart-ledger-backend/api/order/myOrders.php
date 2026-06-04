<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "../../config/db.php";

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$customer_id = intval(
    $data['customer_id'] ?? 0
);

if (!$customer_id) {

    echo json_encode([
        "status" => false,
        "message" => "customer_id required"
    ]);

    exit;
}

$result = $conn->query("

SELECT

    i.id,
    i.invoice_no,
    i.customer_name,
    i.customer_phone,
    i.products,
    i.sub_total,
    i.gst_total,
    i.total_amount,
    i.paid_amount,
    i.balance_amount,
    i.payment_method,
    i.payment_status,
    i.created_at

FROM invoices i

WHERE i.customer_id = '$customer_id'

ORDER BY i.id DESC

");

$orders = [];

while ($row = $result->fetch_assoc()) {

    $products = json_decode(
        $row['products'],
        true
    );

    if (is_array($products)) {

        foreach ($products as &$product) {

            $product_id = intval(
                $product['product_id'] ?? 0
            );

            if ($product_id > 0) {

                $productQuery = $conn->query("
                    SELECT
                        product_name,
                        price
                    FROM products
                    WHERE id='$product_id'
                    LIMIT 1
                ");

                if (
                    $productQuery &&
                    $productQuery->num_rows > 0
                ) {

                    $productData =
                        $productQuery->fetch_assoc();

                    $product['product_name'] =
                        $productData['product_name'];

                    $product['price'] =
                        $productData['price'];

                } else {

                    $product['product_name'] =
                        'Product Not Found';

                    $product['price'] = 0;
                }
            }
        }
    }

    $row['products'] = $products;

    $orders[] = $row;
}

echo json_encode([
    "status" => true,
    "orders" => $orders
]);