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

// ✅ GET JSON DATA
$data = json_decode(file_get_contents("php://input"), true);

$name         = trim($data['name'] ?? '');
$email        = trim($data['email'] ?? '');
$password     = trim($data['password'] ?? '');
$role         = trim($data['role'] ?? '');
$company_id   = intval($data['company_id'] ?? 0);
$requested_by = intval($data['requested_by'] ?? 0);

// ✅ VALIDATION
if (!$name || !$email || !$password || !$role) {

    echo json_encode([
        "status" => false,
        "message" => "All fields required"
    ]);

    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

    echo json_encode([
        "status" => false,
        "message" => "Invalid email format"
    ]);

    exit;
}

if (!in_array($role, ['superadmin', 'cashier', 'admin', 'user'])) {

    echo json_encode([
        "status" => false,
        "message" => "Invalid role"
    ]);

    exit;
}

if (($role == 'cashier' || $role == 'admin') && !$company_id) {

    echo json_encode([
        "status" => false,
        "message" => "Company ID required"
    ]);

    exit;
}

// ✅ CHECK EMAIL EXISTS
$check = mysqli_query(
    $conn,
    "SELECT id FROM users WHERE email='$email'"
);

if (mysqli_num_rows($check) > 0) {

    echo json_encode([
        "status" => false,
        "message" => "Email already exists"
    ]);

    exit;
}

// ✅ HASH PASSWORD
$hashed = password_hash($password, PASSWORD_DEFAULT);

// ✅ CASHIER LIMIT CHECK
if ($role == 'cashier') {

    $countRes = mysqli_query(
        $conn,
        "SELECT COUNT(*) as total
         FROM users
         WHERE company_id='$company_id'
         AND role='cashier'"
    );

    $countRow = mysqli_fetch_assoc($countRes);

    // ✅ LIMIT = 3
    if ($countRow['total'] >= 3) {

        mysqli_query(
            $conn,
            "INSERT INTO cashier_requests
            (
                company_id,
                requested_by,
                name,
                email,
                password
            )
            VALUES
            (
                '$company_id',
                '$requested_by',
                '$name',
                '$email',
                '$hashed'
            )"
        );

        echo json_encode([
            "status" => false,
            "request_sent" => true,
            "message" => "Cashier limit reached. Request sent to Super Admin."
        ]);

        exit;
    }
}

// ✅ START TRANSACTION
mysqli_begin_transaction($conn);

try {

    // ✅ INSERT USER
    $sql = "
        INSERT INTO users
        (
            name,
            email,
            password,
            role,
            company_id
        )
        VALUES
        (
            '$name',
            '$email',
            '$hashed',
            '$role',
            '$company_id'
        )
    ";

    if (!mysqli_query($conn, $sql)) {
        throw new Exception("User insert failed");
    }

    // ✅ UPDATE COMPANY IF ADMIN
    if ($role == 'admin') {

        $update = "
            UPDATE companies SET
            owner_name='$name',
            owner_email='$email',
            owner_password='$hashed'
            WHERE id='$company_id'
        ";

        if (!mysqli_query($conn, $update)) {
            throw new Exception("Company update failed");
        }
    }

    // ✅ COMMIT
    mysqli_commit($conn);

    echo json_encode([
        "status" => true,
        "message" => "User registered successfully"
    ]);

} catch (Exception $e) {

    mysqli_rollback($conn);

    echo json_encode([
        "status" => false,
        "message" => $e->getMessage()
    ]);
}

?>