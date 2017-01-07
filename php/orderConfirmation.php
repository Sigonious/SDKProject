<?php
	require("PHPMailer/PHPMailerAutoload.php");
	include("config.php");
	session_start();
	
	$name = test_input($_GET['name']);
	$email = test_input($_GET['email']);
	
	$orderID = $_SESSION['orderID'];
	$message = "Order #" . $orderID . "<br><br>";
	$message2 = "Thank you for your order!<br><br><h1>Your order details</h1><br>";
	
	$orderSQL = $conn->prepare("SELECT * FROM orderitem WHERE orderID=?");
	$orderSQL->bind_param("i", $orderID);
	$orderSQL->execute();
	$result = $orderSQL->get_result();
	$count = $result->num_rows;
	
	for($i = 1; $i <= $count; $i++)
	{
		$message .= "<b>Item #" . $i . "</b><br>";
		$message2 .= "<b>Item #" . $i . "</b><br>";
		$orderItem = $conn->prepare("SELECT * FROM orderitem WHERE orderID=? AND orderIndex=$i");
		$orderItem->bind_param("i", $orderID);
		$orderItem->execute();
		$orderItemResult = $orderItem->get_result();
		$row = $orderItemResult->fetch_array(MYSQLI_ASSOC);
		$message .= "Item: " . $row['itemName'] . "<br>";
		$message2 .= "Item: " . $row['itemName'] . "<br>";
		
		if($row['itemName'] != "bobaTea")
		{
			if($row['itemName'] != "Vegetarian plate")
			{
				$orderItemMeat = $conn->prepare("SELECT * FROM orderitemmeat WHERE orderID=? AND orderIndex=$i");
				$orderItemMeat->bind_param("i", $orderID);
				$orderItemMeat->execute();
				$orderItemMeatResult = $orderItemMeat->get_result();
				$row2 = $orderItemMeatResult->fetch_array(MYSQLI_ASSOC);
				$message .= "Meat: " . $row2['meat'] . "<br>";
				$message2 .= "Meat: " . $row2['meat'] . "<br>";
			}
			
			$message .= "Vegetables: ";
			$message2 .= "Vegetables: ";
			$orderItemVegetables = $conn->prepare("SELECT * FROM orderitemvegetables WHERE orderID=? AND orderIndex=$i");
			$orderItemVegetables->bind_param("i", $orderID);
			$orderItemVegetables->execute();
			$orderItemVegetablesResult = $orderItemVegetables->get_result();
			$vegerows = $orderItemVegetablesResult->fetch_all(MYSQLI_ASSOC);
			
			foreach($vegerows as $vegerow)
			{
				$message .= $vegerow['vegetable'] . " ";
				$message2 .= $vegerow['vegetable'] . " ";
			}
			
			$message .= "<br>Sauce: ";
			$message2 .= "<br>Sauce: ";
			$orderItemSauces = $conn->prepare("SELECT * FROM orderitemsauce WHERE orderID=? AND orderIndex=$i");
			$orderItemSauces->bind_param("i", $orderID);
			$orderItemSauces->execute();
			$orderItemSaucesResult = $orderItemSauces->get_result();
			$saucerows = $orderItemSaucesResult->fetch_all(MYSQLI_ASSOC);
			
			foreach($saucerows as $saucerow)
			{
				$message .= $saucerow['sauce'] . " ";
				$message2 .= $saucerow['sauce'] . " ";
			}
			
			$message .= "<br>Extras: ";
			$message2 .= "<br>Extras: ";
			$orderItemExtras = $conn->prepare("SELECT * FROM orderitemextras WHERE orderID=? AND orderIndex=$i");
			$orderItemExtras->bind_param("i", $orderID);
			$orderItemExtras->execute();
			$orderItemExtrasResult = $orderItemExtras->get_result();
			$extrasrows = $orderItemExtrasResult->fetch_all(MYSQLI_ASSOC);
			
			foreach($extrasrows as $extrasrow)
			{
				if($extrasrow['extra'] == "No extras")
				{
					$message .= $extrasrow['extra'];
					$message2 .= $extrasrow['extra'];
					break;
				}
				$message .= $extrasrow['extra'] . " (" . $extrasrow['quantity'] . ") ";
				$message2 .= $extrasrow['extra'] . " (" . $extrasrow['quantity'] . ") ";
			}
			
			$message .= "<br>Requests: " . $row['requests'] . "<br><br>";
			$message2 .= "<br>Requests: " . $row['requests'] . "<br><br>";
		}
		else if($row['itemName'] == "bobaTea")
		{
			//Flavor
			$orderItemBoba = $conn->prepare("SELECT * FROM orderitemboba WHERE orderID=? AND orderIndex=$i");
			$orderItemBoba->bind_param("i", $orderID);
			$orderItemBoba->execute();
			$orderItemBobaResults = $orderItemBoba->get_result();
			$flavorrow = $orderItemBobaResults->fetch_array(MYSQLI_ASSOC);
			$message .= "Flavor: " . $flavorrow['flavor'] . "<br>";
			$message2 .= "Flavor: " . $flavorrow['flavor'] . "<br>";
			
			//Tapioca Pearls
			$orderItemTapioca = $conn->prepare("SELECT * FROM orderitemextras WHERE orderID=? AND orderIndex=$i");
			$orderItemTapioca->bind_param("i", $orderItem);
			$orderItemTapioca->execute();
			$orderItemTapiocaResult = $orderItemTapioca->get_result();
			$tapiocarow = $orderItemTapiocaResult->fetch_array(MYSQLI_ASSOC);
			$message .= "Pearls: " . $tapiocarow['extra'] . "<br>";
			$message2 .= "Pearls: " . $tapiocarow['extra'] . "<br>";
			
			//Requests
			$message .= "Requests: " . $row['requests'] . "<br><br>";
			$message2 .= "Requests: " . $row['requests'] . "<br><br>";
		}
		else
		{
			$message .= "Nothing found for item #" . $i . "<br><br>";
			$message2 .= "Nothing found for item #" . $i . "<br><br>";
		}
	}
	
	$orderInfo = $conn->prepare("SELECT * FROM orders WHERE orderID=?");
	$orderInfo->bind_param("i", $orderID);
	$orderInfo->execute();
	$orderInfoResult = $orderInfo->get_result();
	$orderInfoRow = $orderInfoResult->fetch_array(MYSQLI_ASSOC);
	
	$message .= "Customer name: " . $name . "<br>Customer Email: " . $email;
	$message .= "<br>Pickup Date: " . $orderInfoRow['orderPickupDate'] . "<br>Time: " . $orderInfoRow['orderPickupTime'];
	$message2 .= "<br>Pickup Date: " . $orderInfoRow['orderPickupDate'] . "<br>Time: " . $orderInfoRow['orderPickupTime'];
	
	$mail = new PHPMailer();
	
	$mail->IsSMTP();
	$mail->Host = "smtp.gmail.com";
	$mail->SMTPAuth = true;
	$mail->Username = "ENTER EMAIL HERE";
	$mail->Password = "ENTER PASSWORD HERE";
	$mail->SMTPSecure = "tls";
	$mail->Port = "587";
	
	$mail->setFrom("SENDER EMAIL", "SENDER NAME");
	$mail->AddAddress("RECEIVER EMAIL", "RECEIVER NAME");
	$mail->isHTML(true);
	
	$mail->Subject = "Order #" . $orderID;
	$mail->Body = $message;
	
	if(!$mail->Send()){
		echo "There was a problem sending this message, please try again later.";
	}
	else {
		echo "Success";
	}
	
	$message3 = "A new order has been placed.";
	
	$mail2 = new PHPMailer();
	
	$mail2->IsSMTP();
	$mail2->Host = "smtp.gmail.com";
	$mail2->SMTPAuth = true;
	$mail2->Username = "SENDER EMAIL";
	$mail2->Password = "SENDER PASSWORD";
	$mail2->SMTPSecure = "tls";
	$mail2->Port = "587";
	
	$mail2->setFrom("SENDER EMAIL", "SENDER NAME");
	$mail2->AddAddress("**********@txt.att.net", "RECEIVER NAME");
	$mail2->isHTML(true);
	
	$mail2->Subject = "Order #" . $orderID;
	$mail2->Body = $message3;
	
	if(!$mail2->Send()){
		echo "There was a problem sending this message, please try again later.";
	}
	else {
		echo "Success";
	}
	
	
	if(isset($email))
	{
		$mail3 = new PHPMailer();
		
		$mail3->IsSMTP();
		$mail3->Host = "smtp.gmail.com";
		$mail3->SMTPAuth = true;
		$mail3->Username = "SENDER EMAIL";
		$mail3->Password = "SENDER PASSWORD";
		$mail3->SMTPSecure = "tls";
		$mail3->Port = "587";
		
		$mail3->setFrom("SENDER EMAIL", "SENDER PASSWORD");
		$mail3->AddAddress($email, $name);
		$mail3->isHTML(true);
		
		$mail3->Subject = "Order Confirmation from Sons Doner Kebab";
		$mail3->Body = $message2;
		
		if(!$mail3->Send()){
			echo "There was a problem sending this message, please try again later.";
		}
		else {
			echo "Success";
		}
	}
	
	
	function test_input($data){
		$data = trim($data);
		$data = stripslashes($data);
		$data = htmlspecialchars($data);
		return $data;
	}
?>
