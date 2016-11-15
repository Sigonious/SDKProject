<?php
	session_start();
	
	$message = "false";
	
	if(isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
		if(isset($_SESSION['fName']) && $_SESSION['fName'] != "")
		{
			echo $_SESSION['fName'];
		}
		else{
			echo $message;
		}
	}
	else {
		echo $message;
	}
?>