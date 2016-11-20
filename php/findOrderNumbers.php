<?php
	include("config.php");
	session_start();
	
	$sql = "SELECT orderID FROM orders";
	
	if($result = $conn->query($sql))
	{
		$count = $result->num_rows;
		$count = $count + 1;
		$_SESSION['orderID'] = $count;
		echo "$count";
	}
	else
	{
		echo "Failure";
	}
	$conn->close();
?>