<?php
	$servername = "localhost";
	$username = "root";
	$pass = "";
	$dbname = "test";
	
	//connect to DB
	$conn = new mysqli($servername, $username, $pass, $dbname);
	
	//check for successful connection
	if($conn->connect_error)
	{
		echo "Error has occured";
		exit;
	}
	
	$request = mysql_real_escape_string($_GET['request']);
	$itemIndex = mysql_real_escape_string($_GET['itemIndex']);
	$col = mysql_real_escape_string($_GET['col']);
	$orderNumber = mysql_real_escape_string($_GET['orderNum']);
	$response = mysql_real_escape_string($_GET['response']);
	
	if($request == "add")
	{
		$sql = "INSERT INTO orderitems (orderNumber, orderIndex, itemName)
		VALUES ($orderNumber, $itemIndex, '$response')";
		
		if($conn->query($sql) === TRUE)
		{
			echo "Success";
		}
		else{
			echo "Failure";
		}
	}
	else if($request == "update" && $col != "price")
	{
		$sql = "UPDATE orderitems SET $col='$response' WHERE orderNumber=$orderNumber AND orderIndex=$itemIndex";
		
		if($conn->query($sql) === TRUE)
		{
			echo "Success";
		}
		else{
			echo "Failure";
		}
	}
	else if($col == "price")
	{
		$sql = "UPDATE orderitems SET $col = $response WHERE orderNumber=$orderNumber AND orderIndex=$itemIndex";
		
		if($conn->query($sql) === TRUE)
		{
			echo "Success";
		}
		else{
			echo "Failure";
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