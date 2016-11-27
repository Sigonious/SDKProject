<?php
	session_start();
	include("config.php");
	
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
		else if($find == "type")
		{
			$email = $conn->real_escape_string($_SESSION['email']);
			$adminStatus = "SELECT * FROM users WHERE email='$email'";
			$adminStatusResult = $conn->query($adminStatus);
			$adminrows = $adminStatusResult->fetch_array(MYSQLI_ASSOC);
			$acctype = $adminrows['type'];
			echo "$acctype";
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