<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../PHPMailer/src/Exception.php';
require __DIR__ . '/../PHPMailer/src/PHPMailer.php';
require __DIR__ . '/../PHPMailer/src/SMTP.php';

function sendMail($to, $subject, $body)
{
    $mail = new PHPMailer(true);

    try {

        // SMTP SETTINGS
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;

        // 🔥 YOUR GMAIL
        $mail->Username = 'majesticjesi@gmail.com';

        // 🔥 APP PASSWORD
        $mail->Password = 'hbld wjzw kbce jqqj';

        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // FROM
        $mail->setFrom('yourgmail@gmail.com', 'Smart Ledger');

        // TO
        $mail->addAddress($to);

        // EMAIL CONTENT
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $body;

        $mail->send();

        return true;

    } catch (Exception $e) {

        return false;
    }
}
?>