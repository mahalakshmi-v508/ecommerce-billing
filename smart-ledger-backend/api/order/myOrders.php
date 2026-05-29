
<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

include "../../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

$customer_id = intval($data['customer_id'] ?? 0);

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

while($row = $result->fetch_assoc()){

    $row['products'] = json_decode($row['products']);

    $orders[] = $row;
}

echo json_encode([
    "status" => true,
    "orders" => $orders
]);
?>
