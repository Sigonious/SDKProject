<?php
	
	include("config.php");
	session_start();
	
	$email = $conn->real_escape_string($_POST['loginEmail']);
	$pass = $conn->real_escape_string($_POST['loginPassword']);
	
	$pass = hash('sha256',$pass);
	
	
	$sql = $conn->prepare("SELECT * FROM users WHERE email=?");
	$sql->bind_param("s", $email);
	$sql->execute();
	$result = $sql->get_result();
	
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
		echo "Incorrect credentials.   ";
	}
?>