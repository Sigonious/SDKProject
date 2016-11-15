<?php
	
	include("config.php");
	session_start();
	
	$email = $conn->real_escape_string($_POST['loginEmail']);
	$pass = $conn->real_escape_string($_POST['loginPassword']);
	
	//$pass = hash('sha256',$pass);
	
	$sql = "SELECT * FROM users WHERE email='$email'";
	
	$result = $conn->query($sql);
	
	$row = $result->fetch_array(MYSQLI_ASSOC);
	
	$count = $result->num_rows;
	
	if($count == 1 && $row['password'] == $pass)
	{
		$_SESSION['email'] = $email;
		$_SESSION['loggedin'] = true;
		$_SESSION['fName'] = $row['firstName'];
		$_SESSION['lName'] = $row['lastName'];
		header("Location: ../homePage.html");
	}
	
	else
	{
		echo "Incorrect credentials.";
	}
?>