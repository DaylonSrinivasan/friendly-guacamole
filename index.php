<!DOCTYPE HTML>
<html>
 <body>
  Hello world
 <?php
  $to      = 'daylon.srinivasan@gmail.com';
  $subject = 'the subject';
  $message = 'hello';
  $headers = 'From: no-reply@example.com' . "\r\n" .
    'Reply-To: dont@example.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

  mail($to, $subject, $message, $headers);
 ?>
 </body>
</html>
