<?php
	
	include("config.php");
	
	$col =  $conn->real_escape_string($_GET['col']);
	$orderNumber =  $conn->real_escape_string($_GET['orderNum']);
	$response =  $conn->real_escape_string($_GET['response']);
	
	if($col == "itemName")
	{
		$itemIndex = $conn->real_escape_string($_GET['itemIndex']);
		$requests = $conn->real_escape_string($_GET['requests']);
		
		$sql = $conn->prepare("INSERT INTO orderitem (orderID, orderIndex, itemName, requests)
		VALUES (?, ?, ?, ?)");
		$sql->bind_param("iiss", $orderNumber, $itemIndex, $response, $requests);
		
		if($sql->execute() === TRUE)
		{
			echo "Success";
		}
		else{
			echo "Failure for $col";
		}
	}
	else if($col == "meat")
	{
		$itemIndex = $conn->real_escape_string($_GET['itemIndex']);
		
		$sql = $conn->prepare("INSERT INTO orderitemmeat (orderID, orderIndex, meat)
		VALUES (?, ?, ?)");
		$sql->bind_param("iis", $orderNumber, $itemIndex, $response);
		
		if($sql->execute() === TRUE)
		{
			echo "Success";
		}
		else{
			echo "Failure for $col";
		}
	}
	else if($col == "vegetables")
	{
		$itemIndex = $conn->real_escape_string($_GET['itemIndex']);
		
		$sql = $conn->prepare("INSERT INTO orderitemvegetables (orderID, orderIndex, vegetable)
		VALUES (?, ?, ?)");
		$sql->bind_param("iis", $orderNumber, $itemIndex, $response);
		
		if($sql->execute() === TRUE)
		{
			echo "Success";
		}
		else{
			echo "Failure for $col";
		}
	}
	else if($col == "sauce")
	{
		$itemIndex = $conn->real_escape_string($_GET['itemIndex']);
		
		$sql = $conn->prepare("INSERT INTO orderitemsauce (orderID, orderIndex, sauce)
		VALUES (?, ?, ?)");
		$sql->bind_param("iis", $orderNumber, $itemIndex, $response);
		
		if($sql->execute() === true)
		{
			echo "Success";
		}
		else{
			echo "Failure for $col";
		}
	}
	else if($col == "extras")
	{
		$itemIndex = $conn->real_escape_string($_GET['itemIndex']);
		
		$quantity =  $conn->real_escape_string($_GET['quantity']);
		
		$sql = $conn->prepare("INSERT INTO orderitemextras (orderID, orderIndex, extra, quantity)
		VALUES (?, ?, ?, ?)");
		$sql->bind_param("iisi", $orderNumber, $itemIndex, $response, $quantity);
		
		if($sql->execute() === TRUE)
		{
			echo "Success";
		}
		else{
			echo "Failure for $col";
		}
	}
	else if($col == "price")
	{
		$itemIndex = $conn->real_escape_string($_GET['itemIndex']);
		
		$sql = $conn->prepare("INSERT INTO orderitemprice (orderID, orderIndex, price)
		VALUES (?, ?, ?)");
		$sql->bind_param("iii", $orderNumber, $itemIndex, $response);
		
		if($sql->execute() === TRUE)
		{
			echo "Success";
		}
		else{
			echo "Failure for $col";
		}
	}
	else if($col == "flavor")
	{
		$itemIndex = $conn->real_escape_string($_GET['itemIndex']);
		
		$sql = $conn->prepare("INSERT INTO orderitemboba (orderID, orderIndex, flavor)
		VALUES (?, ?, ?)");
		$sql->bind_param("iis", $orderNumber, $itemIndex, $response);
		
		if($sql->execute() === TRUE)
		{
			echo "Success";
		}
		else{
			echo "Failure";
		}
	}
	else if($col == "orders")
	{
		$email = $conn->real_escape_string($_GET['email']);
		$pickupDate = $conn->real_escape_string($_GET['pickupDate']);
		$pickupTime = $conn->real_escape_string($_GET['pickupTime']);
		$total = $conn->real_escape_string($_GET['total']);
		$orderDate = date("Y-m-d");
		
		$sql = $conn->prepare("INSERT INTO orders (orderID, customerName, customerEmail, orderDatePlaced, orderPickupDate, orderPickupTime, total, status)
		VALUES (?, ?, ?, ?, ?, ?, ?, 'incomplete')");
		$sql->bind_param("isssssd", $orderNumber, $response, $email, $orderDate, $pickupDate, $pickupTime, $total);
		
		if($sql->execute() === TRUE)
		{
			echo "Success";
		}
		else{
			echo "Failure in orders";
		}
	}
	else{
		echo "Couldn't fullfil request";
		$conn->close();
		exit;
	}
	$conn->close();
	exit;
?>