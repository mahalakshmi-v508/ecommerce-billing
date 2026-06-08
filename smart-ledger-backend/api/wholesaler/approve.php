<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

// DB CONNECTION
include __DIR__ . "/../../config/db.php";

// MAIL FUNCTION
include __DIR__ . "/../../utils/sendMail.php";

// CHECK ID
if (!isset($_GET['id'])) {
    echo json_encode([
        "status" => false,
        "message" => "ID required"
    ]);
    exit;
}

$id = $_GET['id'];

// GET WHOLESALER DETAILS
$getQuery = "SELECT * FROM wholesalers WHERE id = '$id'";
$result = $conn->query($getQuery);

if (!$result || $result->num_rows == 0) {

    echo json_encode([
        "status" => false,
        "message" => "Wholesaler not found"
    ]);

    exit;
}

// FETCH DATA
$user = $result->fetch_assoc();

$email = $user['email'];
$name  = $user['name'];

// UPDATE STATUS
$updateQuery = "UPDATE wholesalers 
SET approval_status = 'approved' 
WHERE id = '$id'";

$updated = $conn->query($updateQuery);

if (!$updated) {

    echo json_encode([
        "status" => false,
        "message" => "Failed to approve wholesaler"
    ]);

    exit;
}

// LOGIN URL
$loginUrl = "http://localhost:5173/wholesaler-login";

// EMAIL SUBJECT
$subject = "Wholesaler Account Approved";

// EMAIL BODY
$body = "
<h2>Hello $name,</h2>

<p>Your wholesaler account has been approved successfully.</p>

<p>
You can now login using the link below:
</p>

<p>
<a href='$loginUrl'>
Click Here To Login
</a>
</p>

<br>

<p>Thank you,</p>
<p>Smart Ledger Team</p>
";

// SEND MAIL
$mailSent = sendMail($email, $subject, $body);

// RESPONSE
if ($mailSent) {

    echo json_encode([
        "status" => true,
        "message" => "Wholesaler approved and email sent successfully"
    ]);

} else {

    echo json_encode([
        "status" => true,
        "message" => "Wholesaler approved but email failed"
    ]);
}

?>