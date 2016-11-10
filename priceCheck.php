<?php

	include("config.php");
	session_start();
	
	$item = $conn->real_escape_string($_GET['item']);
	$place = $conn->real_escape_string($_GET['place']);
	$quantity = $conn->real_escape_string($_GET['quantity']);
	
	$sql = "SELECT price FROM " . $place . " WHERE itemName='" . $item . "'";
	$result = $conn->query($sql);
	
	if($result->num_rows === 0)
	{
		echo "Couldn't find anything.";
		exit;
	}
	
	while($row = $result->fetch_assoc())
	{
		if($quantity > 1)
		{
			echo (float) $row["price"] * (float) $quantity;
		}
		else
		{
			echo (float) $row["price"];
		}
	}
	exit;
	
?>