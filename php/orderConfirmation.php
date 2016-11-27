<?php
	require("PHPMailer/PHPMailerAutoload.php");
	include("config.php");
	session_start();
	
	$name = test_input($_GET['name']);
	$email = test_input($_GET['email']);
	
	$orderID = $_SESSION['orderID'];
	$message = "Order #" . $orderID . "<br><br>";
	
	$orderSQL = "SELECT * FROM orderitem WHERE orderID=$orderID";
	$result = $conn->query($orderSQL);
	$count = $result->num_rows;
	
	for($i = 1; $i <= $count; $i++)
	{
		$message .= "<b>Item #" . $i . "</b><br>";
		$orderItem = "SELECT * FROM orderitem WHERE orderID=$orderID AND orderIndex=$i";
		$orderItemResult = $conn->query($orderItem);
		$row = $orderItemResult->fetch_array(MYSQLI_ASSOC);
		$message .= "Item: " . $row['itemName'] . "<br>";
		
		if($row['itemName'] != "bobaTea")
		{
			if($row['itemName'] != "Vegetarian plate")
			{
				$orderItemMeat = "SELECT * FROM orderitemmeat WHERE orderID=$orderID AND orderIndex=$i";
				$orderItemMeatResult = $conn->query($orderItemMeat);
				$row2 = $orderItemMeatResult->fetch_array(MYSQLI_ASSOC);
				$message .= "Meat: " . $row2['meat'] . "<br>";
			}
			
			$message .= "Vegetables: ";
			$orderItemVegetables = "SELECT * FROM orderitemvegetables WHERE orderID=$orderID AND orderIndex=$i";
			$orderItemVegetablesResult = $conn->query($orderItemVegetables);
			$vegerows = $orderItemVegetablesResult->fetch_all(MYSQLI_ASSOC);
			
			foreach($vegerows as $vegerow)
			{
				$message .= $vegerow['vegetable'] . " ";
			}
			
			$message .= "<br>Sauce: ";
			$orderItemSauces = "SELECT * FROM orderitemsauce WHERE orderID=$orderID AND orderIndex=$i";
			$orderItemSaucesResult = $conn->query($orderItemSauces);
			$saucerows = $orderItemSaucesResult->fetch_all(MYSQLI_ASSOC);
			
			foreach($saucerows as $saucerow)
			{
				$message .= $saucerow['sauce'] . " ";
			}
			
			$message .= "<br>Extras: ";
			$orderItemExtras = "SELECT * FROM orderitemextras WHERE orderID=$orderID AND orderIndex=$i";
			$orderItemExtrasResult = $conn->query($orderItemExtras);
			$extrasrows = $orderItemExtrasResult->fetch_all(MYSQLI_ASSOC);
			
			foreach($extrasrows as $extrasrow)
			{
				$message .= $extrasrow['extra'] . " (" . $extrasrow['quantity'] . ") ";
			}
			
			$message .= "<br>Requests: " . $row['requests'] . "<br><br>";
		}
		else if($row['itemName'] == "bobaTea")
		{
			//Flavor
			$orderItemBoba = "SELECT * FROM orderitemboba WHERE orderID=$orderID AND orderIndex=$i";
			$orderItemBobaResults = $conn->query($orderItemBoba);
			$flavorrow = $orderItemBobaResults->fetch_array(MYSQLI_ASSOC);
			$message .= "Flavor: " . $flavorrow['flavor'] . "<br>";
			
			//Tapioca Pearls
			$orderItemTapioca = "SELECT * FROM orderitemextras WHERE orderID=$orderID AND orderIndex=$i";
			$orderItemTapiocaResult = $conn->query($orderItemTapioca);
			$tapiocarow = $orderItemTapiocaResult->fetch_array(MYSQLI_ASSOC);
			$message .= "Pearls: " . $tapiocarow['extra'] . "<br>";
			
			//Requests
			$message .= "Requests: " . $row['requests'] . "<br><br>";
		}
		else
		{
			$message .= "Nothing found for item #" . $i . "<br><br>";
		}
	}
	
	$orderInfo = "SELECT * FROM orders WHERE orderID=$orderID";
	$orderInfoResult = $conn->query($orderInfo);
	$orderInfoRow = $orderInfoResult->fetch_array(MYSQLI_ASSOC);
	
	$message .= "Customer name: " . $name . "<br>Customer Email: " . $email;
	$message .= "<br>Pickup Date: " . $orderInfoRow['orderPickupDate'] . "<br>Time: " . $orderInfoRow['orderPickupTime'];
	
	$mail = new PHPMailer();
	
	$mail->IsSMTP();
	$mail->Host = "smtp.gmail.com";
	$mail->SMTPAuth = true;
	$mail->Username = "webmaster.sonsdonerkebab@gmail.com";
	$mail->Password = "Sons*Doner*Kebab";
	$mail->SMTPSecure = "tls";
	$mail->Port = "587";
	
	$mail->setFrom("webmaster.sonsdonerkebab@gmail.com", "New Online Order");
	$mail->AddAddress("adamcmurr@gmail.com", "Adam");
	$mail->isHTML(true);
	
	$mail->Subject = "Order #" . $orderID;
	$mail->Body = $message;
	
	if(!$mail->Send()){
		echo "There was a problem sending this message, please try again later.";
	}
	else {
		echo "Success";
	}
	
		
	function test_input($data){
		$data = trim($data);
		$data = stripslashes($data);
		$data = htmlspecialchars($data);
		return $data;
	}
?>