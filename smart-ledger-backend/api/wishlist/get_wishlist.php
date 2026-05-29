<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include __DIR__ . '/../../config/db.php';

$user_id = $_GET['user_id'];

$query = mysqli_query(
    $conn,
    "SELECT
        wishlist.id,
        wishlist.product_id,
        products.product_name,
        products.price,
        products.stock
     FROM wishlist
     JOIN products
     ON wishlist.product_id = products.id
     WHERE wishlist.user_id='$user_id'"
);

$data = [];

while($row = mysqli_fetch_assoc($query)){

    $data[] = $row;
}

echo json_encode([
    "status" => true,
    "data" => $data
]);
?>