<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
include __DIR__ . '/../../config/db.php';

$data = json_decode(
    file_get_contents("php://input"),
    true
);

/* CHECK DATA */

if(
    !isset($data['cart_id']) ||
    !isset($data['quantity'])
){
    echo json_encode([
        "status" => false,
        "message" => "Missing data"
    ]);
    exit();
}

$cart_id = $data['cart_id'];
$quantity = $data['quantity'];

/* REMOVE IF 0 */

if($quantity <= 0){

    $delete = mysqli_query(
        $conn,
        "DELETE FROM cart
         WHERE id='$cart_id'"
    );

    echo json_encode([
        "status" => true,
        "message" => "Item removed"
    ]);

    exit();
}

/* UPDATE */

$update = mysqli_query(
    $conn,
    "UPDATE cart
     SET quantity='$quantity'
     WHERE id='$cart_id'"
);

/* CHECK QUERY */

if($update){

    echo json_encode([
        "status" => true,
        "message" => "Quantity updated"
    ]);

} else {

    echo json_encode([
        "status" => false,
        "message" => mysqli_error($conn)
    ]);
}

?>