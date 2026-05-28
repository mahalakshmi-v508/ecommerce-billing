<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "../../config/db.php";

// ✅ GET JSON INPUT
$data = json_decode(file_get_contents("php://input"), true);

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

// ✅ USERS LOGIN
$user_q = mysqli_query(
    $conn,
    "SELECT * FROM users WHERE email='$email'"
);

$user = mysqli_fetch_assoc($user_q);

if ($user && password_verify($password, $user['password'])) {

    $userRole = !empty($user['role']) ? $user['role'] : 'user';

    echo json_encode([
        "status" => true,
        "role" => $userRole,
        "data" => [
            "id" => $user['id'],
            "name" => $user['name'],
            "email" => $user['email'],
            "company_id" => $user['company_id']
        ]
    ]);

    exit;
}

// ✅ COMPANY LOGIN
$comp_q = mysqli_query(
    $conn,
    "SELECT * FROM companies WHERE owner_email='$email'"
);

$company = mysqli_fetch_assoc($comp_q);

if ($company && password_verify($password, $company['owner_password'])) {

    echo json_encode([
        "status" => true,
        "role" => "admin",
        "data" => [
            "id" => $company['id'],
            "name" => $company['company_name'],
            "email" => $company['owner_email'],
            "company_id" => $company['id']
        ]
    ]);

    exit;
}

// ❌ INVALID LOGIN
echo json_encode([
    "status" => false,
    "message" => "Invalid credentials"
]);

?>