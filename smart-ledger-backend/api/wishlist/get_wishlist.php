<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include __DIR__ . '/../../config/db.php';

$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;

if ($user_id <= 0) {
    echo json_encode([
        "status" => false,
        "message" => "Invalid user_id",
        "data" => []
    ]);
    exit;
}

$sql = "SELECT
        w.id,
        w.product_id,
        p.product_name,
        p.price,
        p.image,
        p.stock
     FROM wishlist AS w
     INNER JOIN products AS p
     ON w.product_id = p.id
     WHERE w.user_id = ?
     ORDER BY w.id DESC";

$stmt = mysqli_prepare($conn, $sql);
if (!$stmt) {
    echo json_encode([
        "status" => false,
        "message" => "Failed to prepare wishlist query",
        "data" => []
    ]);
    exit;
}

mysqli_stmt_bind_param($stmt, 'i', $user_id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

$data = [];

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

mysqli_stmt_close($stmt);

echo json_encode([
    "status" => true,
    "data" => $data
]);
?>