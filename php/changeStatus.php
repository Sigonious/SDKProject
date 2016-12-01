<?php
	session_start();
	include("config.php");
	if(!isset($_SESSION['email']))
	{
		header("Location: ../index.php");
		exit;
	}
	else
	{
		$email = $_SESSION['email'];
		$result = $conn->query("SELECT * FROM users WHERE email='$email'");
		$row = $result->fetch_array(MYSQLI_ASSOC);
		if($row['type'] != "admin")
		{
			header("Location: " . $_SERVER['HTTP_REFERER']);
			exit;
		}
	}
	
	$orderID = $conn->real_escape_string($_GET['orderID']);
	$orderstatusquery = $conn->prepare("SELECT * FROM orders WHERE orderID=?");
	$orderstatusquery->bind_param("i", $orderID);
	$orderstatusquery->execute();
	$result = $orderstatusquery->get_result();
	$orderstatusresult = $result->fetch_array(MYSQLI_ASSOC);
	
	if($orderstatusresult['status'] == "incomplete")
	{
		$statuschange = $conn->query("UPDATE orders SET status='complete' WHERE orderID=$orderID");
	}
	else{
		$statuschange = $conn->query("UPDATE orders SET status='incomplete' WHERE orderID=$orderID");
	}
?>