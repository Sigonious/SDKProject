<?php
	
	include("config.php");
	
	$col =  $conn->real_escape_string($_GET['col']);
	$orderNumber =  $conn->real_escape_string($_GET['orderNum']);
	$response =  $conn->real_escape_string($_GET['response']);
	
	if($col == "itemName")
	{
		$itemIndex = $conn->real_escape_string($_GET['itemIndex']);
		$requests = $conn->real_escape_string($_GET['requests']);
		
		$sql = "INSERT INTO orderitem (orderID, orderIndex, itemName, requests)
		VALUES ($orderNumber, $itemIndex, '$response', '$requests')";
		
		if($conn->query($sql) === TRUE)
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
		
		$sql = "INSERT INTO orderitemmeat (orderID, orderIndex, meat)
		VALUES ($orderNumber, $itemIndex, '$response')";
		
		if($conn->query($sql) === TRUE)
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
		
		$sql = "INSERT INTO orderitemvegetables (orderID, orderIndex, vegetable)
		VALUES ($orderNumber, $itemIndex, '$response')";
		
		if($conn->query($sql) === TRUE)
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
		
		$sql = "INSERT INTO orderitemsauce (orderID, orderIndex, sauce)
		VALUES ($orderNumber, $itemIndex, '$response')";
		
		if($conn->query($sql) === TRUE)
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
		
		$sql = "INSERT INTO orderitemextras (orderID, orderIndex, extra, quantity)
		VALUES ($orderNumber, $itemIndex, '$response', $quantity)";
		
		if($conn->query($sql) === TRUE)
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
		
		$sql = "INSERT INTO orderitemprice (orderID, orderIndex, price)
		VALUES ($orderNumber, $itemIndex, $response)";
		
		if($conn->query($sql) === TRUE)
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
		
		$sql = "INSERT INTO orderitemboba (orderID, orderIndex, flavor)
		VALUES ($orderNumber, $itemIndex, '$response')";
		
		if($conn->query($sql) === TRUE)
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
		
		$sql = "INSERT INTO orders (orderID, customerName, customerEmail, orderDatePlaced, orderPickupDate, orderPickupTime, total, status)
		VALUES ($orderNumber, '$response', '$email', '$orderDate', '$pickupDate', '$pickupTime', $total, 'incomplete')";
		
		if($conn->query($sql) === TRUE)
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