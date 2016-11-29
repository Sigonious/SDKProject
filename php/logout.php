<?php
	
	session_start();
	
	$message = true;
	
	if(isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
		$_SESSION['loggedin'] = false;
		$_SESSION['fName'] = "";
		$_SESSION['lName'] = "";
		$_SESSION['email'] = "";
		echo $_SESSION['loggedin'];
		header("Location: ../homePage.html");
	}
	else {
		echo "error";
	}
?>