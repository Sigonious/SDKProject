<?php
	
	session_start();
	
	$message = true;
	
	if(isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
		$_SESSION['loggedin'] = false;
		if(isset($_SESSION['fname']))
		{
			$_SESSION['fname'] = "";
		}
		if(isset($_SESSION['lname']))
		{
			$_SESSION['lname'] = "";
		}
		if(isset($_SESSION['email']))
		{
			$_SESSION['lname'] = "";
		}
		echo $_SESSION['loggedin'];
		header("Location: ../homePage.html");
	}
	else {
		echo "error";
	}
?>