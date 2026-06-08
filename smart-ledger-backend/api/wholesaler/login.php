
<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "../../config/db.php";

// ✅ GET JSON
$data = json_decode(
    file_get_contents("php://input"),
    true
);

$email    = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

// ✅ VALIDATION
if (!$email || !$password) {

    echo json_encode([
        "status" => false,
        "message" => "Email & Password required"
    ]);

    exit;
}

// ✅ CHECK USER
$query = mysqli_query(
    $conn,
    "SELECT * FROM wholesalers WHERE email='$email'"
);

$user = mysqli_fetch_assoc($query);

if (!$user) {

    echo json_encode([
        "status" => false,
        "message" => "Invalid email"
    ]);

    exit;
}

// ✅ APPROVAL CHECK
if ($user['approval_status'] != 'approved') {

    echo json_encode([
        "status" => false,
        "message" => "Waiting for admin approval"
    ]);

    exit;
}

// ✅ PASSWORD CHECK
if (!password_verify($password, $user['password'])) {

    echo json_encode([
        "status" => false,
        "message" => "Invalid password"
    ]);

    exit;
}

// ✅ LOGIN SUCCESS
echo json_encode([
    "status" => true,
    "role" => "wholesaler",
    "data" => [
    "id" => $user['id'],
    "name" => $user['name'],
    "email" => $user['email'],
    "phone" => $user['phone']
]
]);
?>

–