<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

/* PREFLIGHT */

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

/* DB */

include __DIR__ . '/../../config/db.php';

/* GET DATA */

$data = json_decode(
    file_get_contents("php://input"),
    true
);

/* VALIDATION */

if(!isset($data['cart_id'])){

    echo json_encode([
        "status" => false,
        "message" => "Cart ID required"
    ]);

    exit();
}

$cart_id = $data['cart_id'];

/* DELETE */

$delete = mysqli_query(
    $conn,
    "DELETE FROM cart
     WHERE id='$cart_id'"
);

/* RESPONSE */

if($delete){

    echo json_encode([
        "status" => true,
        "message" => "Item removed"
    ]);

} else {

    echo json_encode([
        "status" => false,
        "message" => mysqli_error($conn)
    ]);
}