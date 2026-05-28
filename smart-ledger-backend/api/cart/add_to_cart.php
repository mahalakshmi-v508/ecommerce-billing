<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

/* HANDLE PREFLIGHT */

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
include __DIR__ . '/../../config/db.php';

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$user_id = $data['user_id'];
$product_id = $data['product_id'];
$quantity = $data['quantity'];

$check = mysqli_query(
    $conn,
    "SELECT * FROM cart 
     WHERE user_id='$user_id' 
     AND product_id='$product_id'"
);

if(mysqli_num_rows($check) > 0){

    mysqli_query(
        $conn,
        "UPDATE cart 
         SET quantity = quantity + $quantity
         WHERE user_id='$user_id'
         AND product_id='$product_id'"
    );

} else {

    mysqli_query(
        $conn,
        "INSERT INTO cart(
            user_id,
            product_id,
            quantity
        )
        VALUES(
            '$user_id',
            '$product_id',
            '$quantity'
        )"
    );
}

echo json_encode([
    "status" => true,
    "message" => "Added to cart"
]);

?>