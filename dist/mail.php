<?php

$admin_email = "dessid@yandex.ru";
$project_name  = "Путешествия и жизнь";
$form_subject   = "Сообщение с сайта \"$project_name\"";

$guest_name = trim($_POST["guest-name"]);
$guest_email= trim($_POST["guest-email"]);
$guest_message = trim($_POST["guest-message"]);
$form_name = trim($_POST["form-name"]);

$message = "Форма: $form_name <br>";
if($guest_name) {$message.="Имя: $guest_name <br>";}
if($guest_email) {$message.="E-mail: $guest_email <br>";}
if($guest_message) {$message.="Сообщение: $guest_message <br>";}

function adopt($text) {
	return '=?UTF-8?B?'.Base64_encode($text).'?=';
}

$headers = "MIME-Version: 1.0" . PHP_EOL .
"Content-Type: text/html; charset=utf-8" . PHP_EOL .
'From: '.adopt($project_name).' <'.$admin_email.'>' . PHP_EOL .
'Reply-To: '.$admin_email.'' . PHP_EOL;

mail($admin_email, adopt($form_subject), $message, $headers);

?>
