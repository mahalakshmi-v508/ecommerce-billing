<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include "../../config/db.php";

// ✅ FORM DATA
$name       = trim($_POST['name'] ?? '');
$email      = trim($_POST['email'] ?? '');
$phone      = trim($_POST['phone'] ?? '');
$phone2     = trim($_POST['phone2'] ?? '');
$address    = trim($_POST['address'] ?? '');
$password   = trim($_POST['password'] ?? '');

// ✅ VALIDATION - Both phone numbers are required
if (!$name || !$email || !$phone || !$phone2 || !$password || !$address) {
    echo json_encode([
        "status" => false,
        "message" => "All fields including both contact numbers are required"
    ]);
    exit;
}

// ✅ EMAIL CHECK
$check = mysqli_query($conn, "SELECT id FROM wholesalers WHERE email='$email'");

if (mysqli_num_rows($check) > 0) {
    echo json_encode([
        "status" => false,
        "message" => "Email already exists"
    ]);
    exit;
}

// ✅ PHONE NUMBER CHECK (optional - check if phone already exists)
$phoneCheck = mysqli_query($conn, "SELECT id FROM wholesalers WHERE phone='$phone' OR phone2='$phone'");

if (mysqli_num_rows($phoneCheck) > 0) {
    echo json_encode([
        "status" => false,
        "message" => "Phone number already registered"
    ]);
    exit;
}

// ✅ FILE UPLOAD
$proofPath = '';

if (isset($_FILES['proof'])) {
    $folder = "../../uploads/wholesalers/";
    
    if (!file_exists($folder)) {
        mkdir($folder, 0777, true);
    }
    
    $fileName = time() . "_" . $_FILES['proof']['name'];
    $target = $folder . $fileName;
    
    if (move_uploaded_file($_FILES['proof']['tmp_name'], $target)) {
        $proofPath = $target;
    } else {
        echo json_encode([
            "status" => false,
            "message" => "Failed to upload proof document"
        ]);
        exit;
    }
} else {
    echo json_encode([
        "status" => false,
        "message" => "Proof document is required"
    ]);
    exit;
}

// ✅ PASSWORD HASH
$hashed = password_hash($password, PASSWORD_DEFAULT);

// ✅ INSERT
$sql = "INSERT INTO wholesalers (
    name, 
    email, 
    phone, 
    phone2, 
    address, 
    password, 
    id_proof,
    approval_status,
    status
) VALUES (
    '$name',
    '$email',
    '$phone',
    '$phone2',
    '$address',
    '$hashed',
    '$proofPath',
    'pending',
    'pending'
)";

if (mysqli_query($conn, $sql)) {
    echo json_encode([
        "status" => true,
        "message" => "Registration request sent to admin for approval"
    ]);
} else {
    echo json_encode([
        "status" => false,
        "message" => mysqli_error($conn)
    ]);
}
?>