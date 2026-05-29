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

$wishlist_id = $data['wishlist_id'];

$delete = mysqli_query(
    $conn,
    "DELETE FROM wishlist
     WHERE id='$wishlist_id'"
);

if($delete){

    echo json_encode([
        "status" => true,
        "message" => "Removed from wishlist"
    ]);

} else {

    echo json_encode([
        "status" => false,
        "message" => mysqli_error($conn)
    ]);
}