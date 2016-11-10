<?php
	include("config.php");
	
	$sql = "SELECT orderID FROM orders";
	
	if($result = $conn->query($sql))
	{
		$count = $result->num_rows;
		$count = $count + 1;
		echo "$count";
	}
	else
	{
		echo "Failure";
	}
?>