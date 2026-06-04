<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "../../config/db.php";

/* COMPANY ID */

$company_id = 0;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $company_id = intval($_GET['company_id'] ?? 0);
} else {
    $data = json_decode(file_get_contents("php://input"), true);
    $company_id = intval($data['company_id'] ?? 0);
}

if (!$company_id) {
    echo json_encode([
        "status" => false,
        "message" => "Company ID required"
    ]);
    exit;
}

/* GET NOTIFICATIONS */

$sql = "
SELECT
    n.id,
    n.company_id,
    n.product_id,
    n.title,
    n.message,
    n.level,
    n.is_read,
    n.created_at,
    p.product_name
FROM notifications n
LEFT JOIN products p
    ON p.id = n.product_id
WHERE n.company_id = '$company_id'
ORDER BY n.id DESC
";

$result = mysqli_query($conn, $sql);

$notifications = [];

while ($row = mysqli_fetch_assoc($result)) {
    $notifications[] = $row;
}

echo json_encode([
    "status" => true,
    "count" => count($notifications),
    "data" => $notifications
]);