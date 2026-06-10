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

$data = json_decode(file_get_contents("php://input"), true);

// user_id அல்லது wholesaler_id எது வருகிறதோ அதை எடுக்கிறோம்
$user_id = isset($data['user_id']) ? $data['user_id'] : (isset($data['wholesaler_id']) ? $data['wholesaler_id'] : null);
$product_id = $data['product_id'];
$quantity = $data['quantity'];
$user_type = isset($data['user_type']) ? $data['user_type'] : 'user'; // 'user' அல்லது 'wholesaler'

if (!$user_id) {
    echo json_encode([
        "status" => false,
        "message" => "User ID is required"
    ]);
    exit();
}

// ஒரே பொருளை அதே பயனர் (வகை) ஏற்கனவே சேர்த்துள்ளாரா என்று பார்க்கிறோம்
$check = mysqli_query(
    $conn,
    "SELECT * FROM cart 
     WHERE user_id='$user_id' 
     AND product_id='$product_id'
     AND user_type='$user_type'"
);

if (mysqli_num_rows($check) > 0) {
    mysqli_query(
        $conn,
        "UPDATE cart 
         SET quantity = quantity + $quantity
         WHERE user_id='$user_id'
         AND product_id='$product_id'
         AND user_type='$user_type'"
    );
} else {
    mysqli_query(
        $conn,
        "INSERT INTO cart (
            user_id,
            product_id,
            quantity,
            user_type
        )
        VALUES (
            '$user_id',
            '$product_id',
            '$quantity',
            '$user_type'
        )"
    );
}

echo json_encode([
    "status" => true,
    "message" => "Added to cart"
]);

?>