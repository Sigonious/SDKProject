<?php
	session_start();
	
	$type = test_input($_GET['request']);
	
	if($type == "n")
	{
		if(isset($_SESSION['fName']) && isset($_SESSION['lName']))
		{
			echo $_SESSION['fName'] . " " . $_SESSION['lName'];
		}
	}
	else if($type == "e")
	{
		if(isset($_SESSION['email']))
		{
			echo $_SESSION['email'];
		}
	}
	else
	{
		echo ".";
	}
	
	function test_input($data){
		$data = trim($data);
		$data = stripslashes($data);
		$data = htmlspecialchars($data);
		return $data;
	}
?>