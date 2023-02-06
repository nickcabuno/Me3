<?php
$errors = [];
$errorMessage = '';
$successMessage = '';

if (!empty($_POST)) {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['message'];


  if (empty($name)) {
    $errors[] = 'Name is empty';
  }
  if (empty($email)) {
    $errors[] = 'Email is empty';
  }
  if (empty($message)) {
    $errors[] = 'Message is empty';
  }

  if (!empty($errors)) {
    $allErrors = join('<br/>', $errors);
    $errorMessage = "<p style='color: red;'>{$allErrors}</p>";
  } else {
    $toEmail = 'nickcabuno17@gmail.com';
    $emailSubject = 'Contact Form';
    $headers = ['From' => $email, 'Reply-To' => $email, 'Content-type' => 'text/html; charset=iso-8859-1'];
    $bodyParagraphs = ["Name: {$name}", "Email: {$email}", "Message:", $message];
    $body = join(PHP_EOL, $bodyParagraphs);
    if (mail($toEmail, $emailSubject, $body, $headers)) {
      $successMessage = "<p style='color: green;'>Thank you for contacting us :)</p>";
    }
    else {
      $errorMessage = "<p style='color: red;'>Oops, something went wrong. Please try again later</p>";
    }
  }
}
?>