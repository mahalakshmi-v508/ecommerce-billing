<?php

header("Content-Type: application/json");
include "../../config/db.php";

$id = intval($_GET['id'] ?? 0);

$result = mysqli_query(
    $conn,
    "SELECT id,name,email,role,company_id
     FROM users
     WHERE id='$id'"
);

$user = mysqli_fetch_assoc($result);

echo json_encode([
    "status" => true,
    "data" => $user
]);