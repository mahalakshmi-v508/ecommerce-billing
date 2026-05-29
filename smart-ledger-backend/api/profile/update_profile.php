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

/* GET JSON DATA */

$data = json_decode(
    file_get_contents("php://input"),
    true
);

/* VALUES */

$id       = intval($data['id'] ?? 0);
$name     = trim($data['name'] ?? '');
$email    = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

/* VALIDATION */

if (!$id) {

    echo json_encode([
        "status" => false,
        "message" => "User ID missing",
        "received" => $data
    ]);

    exit();
}

if (!$name || !$email) {

    echo json_encode([
        "status" => false,
        "message" => "Name and Email required",
        "received" => $data
    ]);

    exit();
}

/* CHECK USER EXISTS */

$check = mysqli_query(
    $conn,
    "SELECT * FROM users WHERE id='$id'"
);

if (mysqli_num_rows($check) == 0) {

    echo json_encode([
        "status" => false,
        "message" => "User not found"
    ]);

    exit();
}

/* UPDATE */

if (!empty($password)) {

    $hashed =
        password_hash(
            $password,
            PASSWORD_DEFAULT
        );

    $sql = "
        UPDATE users
        SET
            name='$name',
            email='$email',
            password='$hashed'
        WHERE id='$id'
    ";

} else {

    $sql = "
        UPDATE users
        SET
            name='$name',
            email='$email'
        WHERE id='$id'
    ";
}

$update = mysqli_query(
    $conn,
    $sql
);

/* RESPONSE */

if ($update) {

    echo json_encode([
        "status" => true,
        "message" => "Profile updated successfully",
        "affected_rows" =>
            mysqli_affected_rows($conn),
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