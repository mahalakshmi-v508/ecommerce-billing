<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

include __DIR__ . "/../../config/db.php";

try {
    // Example: fetch pending wholesaler requests
    $query = "SELECT * FROM wholesalers ORDER BY id DESC";
    $result = $conn->query($query);

    $requests = [];

    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $requests[] = $row;
        }
    }

    echo json_encode([
        "status" => true,
        "data" => $requests
    ]);

} catch (Exception $e) {
    echo json_encode([
        "status" => false,
        "message" => $e->getMessage()
    ]);
}
?>