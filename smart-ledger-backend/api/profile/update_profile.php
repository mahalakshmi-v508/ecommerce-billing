<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "../../config/db.php";

/* GET JSON DATA STREAM */
$data = json_decode(file_get_contents("php://input"), true);

/* REAL-TIME VALUES & SANITIZATION */
$id       = isset($data['id']) ? intval($data['id']) : 0;
$name     = isset($data['name']) ? mysqli_real_escape_string($conn, trim($data['name'])) : '';
$email    = isset($data['email']) ? mysqli_real_escape_string($conn, trim($data['email'])) : '';
$password = isset($data['password']) ? trim($data['password']) : '';

/* STRICT ATTRIBUTE VALIDATION */
if (!$id) {
    echo json_encode([
        "status" => false,
        "message" => "User execution validation failed: ID target context sequence missing",
        "received" => $data
    ]);
    exit();
}

if (!$name || !$email) {
    echo json_encode([
        "status" => false,
        "message" => "Core validation failed: Profile Name and Email endpoint requirements missing",
        "received" => $data
    ]);
    exit();
}

/* CHECK DATA EXISTENCE PRE-FLIGHT */
$check = mysqli_query($conn, "SELECT id FROM users WHERE id='$id'");
if (mysqli_num_rows($check) == 0) {
    echo json_encode([
        "status" => false,
        "message" => "Target profile identity context not recognized within ledger footprint"
    ]);
    exit();
}

/* COMPILE EXECUTION PLAN */
if (!empty($password)) {
    // Encrypted hash block parsing layer 
    $hashed = password_hash($password, PASSWORD_DEFAULT);
    $sql = "UPDATE users SET name='$name', email='$email', password='$hashed' WHERE id='$id'";
} else {
    $sql = "UPDATE users SET name='$name', email='$email' WHERE id='$id'";
}

$update = mysqli_query($conn, $sql);

/* SYSTEM DISPATCH RESPONSE */
if ($update) {
    echo json_encode([
        "status" => true,
        "message" => "Profile updated successfully inside engine data repositories",
        "affected_rows" => mysqli_affected_rows($conn),
        "user_id" => $id,
        "name" => $name,
        "email" => $email
    ]);
} else {
    echo json_encode([
        "status" => false,
        "message" => mysqli_error($conn),
        "query" => $sql
    ]);
}
?>