<?php
	session_start();
	
	$find = $_GET['find'];
	$message = "false";
	
	if(isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
		if($find == "fName")
		{
			if(isset($_SESSION['fName']) && $_SESSION['fName'] != "")
			{
				echo $_SESSION['fName'];
			}
			else{
				echo $message;
			}
		}
		else if($find == "lName")
		{
			if(isset($_SESSION['lName']) && $_SESSION['lName'] != "")
			{
				echo $_SESSION['lName'];
			}
			else{
				echo $message;
			}
		}
		else if($find == "email")
		{
			if(isset($_SESSION['email']) && $_SESSION['email'] != "")
			{
				echo $_SESSION['email'];
			}
			else{
				echo $message;
			}
		}
		else
		{
			echo $message;
		}
	}
	else {
		echo $message;
	}
?>