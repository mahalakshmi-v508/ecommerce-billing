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

$user_id = $data['user_id'];
$product_id = $data['product_id'];

/* CHECK EXISTS */

$check = mysqli_query(
    $conn,
    "SELECT * FROM wishlist
     WHERE user_id='$user_id'
     AND product_id='$product_id'"
);

if(mysqli_num_rows($check) > 0){

    echo json_encode([
        "status" => false,
        "message" => "Already in wishlist"
    ]);

    exit();
}

/* INSERT */

$insert = mysqli_query(
    $conn,
    "INSERT INTO wishlist(
        user_id,
        product_id
    )
    VALUES(
        '$user_id',
        '$product_id'
    )"
);

if($insert){

    echo json_encode([
        "status" => true,
        "message" => "Added to wishlist"
    ]);

} else {

    echo json_encode([
        "status" => false,
        "message" => mysqli_error($conn)
    ]);
}