<?php
	session_start();
	if(!isset($_SESSION['email']))
	{
		header("Location: ../index.php");
		exit;
	}
	else
	{
		$result = $conn->query("SELECT * FROM users WHERE email=$_SESSION['email']");
		$row = $result->fetch_array(MYSQLI_ASSOC);
		if($row['type'] != "admin")
		{
			header("Location: " . $_SERVER['HTTP_REFERER']);
			exit;
		}
	}
	include("config.php");
	$orderID = $conn->real_escape_string($_GET['orderID']);
	$orderstatusquery = $conn->query("SELECT * FROM orders WHERE orderID=$orderID");
	$orderstatusresult = $orderstatusquery->fetch_array(MYSQLI_ASSOC);
	
	if($orderstatusresult['status'] == "incomplete")
	{
		$statuschange = $conn->query("UPDATE orders SET status='complete' WHERE orderID=$orderID");
	}
	else{
		$statuschange = $conn->query("UPDATE orders SET status='incomplete' WHERE orderID=$orderID");
	}
?>