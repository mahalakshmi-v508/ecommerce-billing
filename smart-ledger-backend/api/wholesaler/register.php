
<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include "../../config/db.php";

// ✅ FORM DATA
$name     = trim($_POST['name'] ?? '');
$email    = trim($_POST['email'] ?? '');
$phone    = trim($_POST['phone'] ?? '');
$password = trim($_POST['password'] ?? '');

// ✅ VALIDATION
if (
    !$name ||
    !$email ||
    !$phone ||
    !$password
) {

    echo json_encode([
        "status" => false,
        "message" => "All fields required"
    ]);

    exit;
}

// ✅ EMAIL CHECK
$check = mysqli_query(
    $conn,
    "SELECT id FROM wholesalers WHERE email='$email'"
);

if (mysqli_num_rows($check) > 0) {

    echo json_encode([
        "status" => false,
        "message" => "Email already exists"
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

    move_uploaded_file(
        $_FILES['proof']['tmp_name'],
        $target
    );

    $proofPath = $target;
}

// ✅ PASSWORD HASH
$hashed = password_hash($password, PASSWORD_DEFAULT);

// ✅ INSERT
$sql = "
INSERT INTO wholesalers
(
    name,
    email,
    phone,
    password,
    id_proof
)
VALUES
(
    '$name',
    '$email',
    '$phone',
    '$hashed',
    '$proofPath'
)
";

if (mysqli_query($conn, $sql)) {

    echo json_encode([
        "status" => true,
        "message" => "Request sent to admin"
    ]);

} else {

    echo json_encode([
        "status" => false,
        "message" => mysqli_error($conn)
    ]);
}
?>

