<?php
	$to = "sigoniouss@gmail.com";
	$subject = "Hello";
	$message = "waddup";
	$headers = 'FROM: webmaster@24.54.109.195' . "\r\n" .
		'Reply-To: webmaster@24.54.109.195' . "\r\n" .
		'X-Mailer: PHP/' . phpversion();
		
	date_default_timezone_set("America/Chicago");
	
	$mail = mail($to, $subject, $message, $headers);
	if($mail)
	{
		echo "Yes";
	}
	else
	{
		echo "No";
	}
?>