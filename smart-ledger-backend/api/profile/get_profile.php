<?php
header("Content-Type: application/json");
include "../../config/db.php";

// Sanitize user incoming identity strictly as numerical token integer
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id <= 0) {
    echo json_encode([
        "status" => false,
        "message" => "Invalid or missing structural ID sequence identifier"
    ]);
    exit();
}

$result = mysqli_query(
    $conn,
    "SELECT id, name, email, role, company_id FROM users WHERE id='$id'"
);

if ($result && mysqli_num_rows($result) > 0) {
    $user = mysqli_fetch_assoc($result);
    echo json_encode([
        "status" => true,
        "data" => $user
    ]);
} else {
    echo json_encode([
        "status" => false,
        "message" => "User context footprint not located in ledger matrices"
    ]);
}
?>