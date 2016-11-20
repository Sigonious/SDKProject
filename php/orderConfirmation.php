<?php
	require("PHPMailer/PHPMailerAutoload.php");
	include("config.php");
	session_start();
	
	$orderID = $_SESSION['orderID'];
	$message = "Order #" . $orderID . "<br>";
	
	$orderSQL = "SELECT * FROM orderitem WHERE orderID=$orderID";
	$result = $conn->query($orderSQL);
	$count = $result->num_rows;
	
	for($i = 1; $i <= $count; $i++)
	{
		$message .= "<b>Item #" . $i . "</b><br>";
		$orderItem = "SELECT * FROM orderitem WHERE orderID=$orderID AND orderIndex=$i";
		$orderItemResult = $conn->query($orderItem);
		$row = $orderItemResult->fetch_array(MYSQLI_ASSOC);
		$message .= "Item: " . $row['itemName'] . "<br><br>";
		
		if($row['itemName'] != "bobaTea")
		{
			if($row['itemName'] != "Vegetarian plate")
			{
				$orderItemMeat = "SELECT * FROM orderitemmeat WHERE orderID=$orderID AND orderIndex=$i";
				$orderItemMeatResult = $conn->query($orderItemMeat);
				$row2 = $orderItemMeatResult->fetch_array(MYSQLI_ASSOC);
				$message .= "Meat: " . $row2['meat'];
			}
			
		}
	}
	
	
	$name = test_input($_GET['name']);
	$email = test_input($_GET['email']);
	
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
	
	$mail->Subject = "Order #" . $orderID;
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