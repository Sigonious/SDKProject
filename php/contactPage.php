<?php
	require("PHPMailer/PHPMailerAutoload.php");
	
	$name = test_input($_POST['name']);
	$email = test_input($_POST['email']);
	$message = test_input($_POST['message']);
	$message .= "<br><br>Name: " . $name . "<br>Email: " . $email;
	
	$mail = new PHPMailer();
	
	$mail->IsSMTP();
	$mail->Host = "smtp.gmail.com";
	$mail->SMTPAuth = true;
	$mail->Username = "webmaster.sonsdonerkebab@gmail.com";
	$mail->Password = "Sons*Doner*Kebab";
	$mail->SMTPSecure = "tls";
	$mail->Port = "587";
	
	$mail->setFrom("webmaster.sonsdonerkebab@gmail.com", $name);
	$mail->AddAddress("adamcmurr@gmail.com", "Adam");
	$mail->isHTML(true);
	
	$mail->Subject = "Contact Us Message, reply to " . $email;
	$mail->Body = $message;
	
	if(!$mail->Send()){
		echo "There was a problem sending this message, please try again later.";
		
	}
	else {
		header("Location: ../homepage.html");
	}
	
		
	function test_input($data){
		$data = trim($data);
		$data = stripslashes($data);
		$data = htmlspecialchars($data);
		return $data;
	}
?>