<?php
	
	include("config.php");
	session_start();

	
	//Checks if forms are empty and meets requirements
	
	$firstNameErr = $lastNameErr = $emailErr = $checkEmailErr = $pwd1Err = $pwd2Err ="";

	$firstName = $lastName = $email = $checkEmail = $pwd1 = $pwd2 ="";
	
	if($_SERVER["REQUEST_METHOD"] == "POST"){
	
		//First Name
		if(empty($_POST["firstName"])){
			$firstNameErr = "First Name is required";
			$Err = true;
		} else {
			$firstName = test_input($_POST["firstName"]);
			if (!preg_match("/^[a-zA-Z ]*$/",$firstName)) {
				$firstNameErr = "Invalid Name"; 
				$Err = true;
			}
		}
	
		//Last Name
		if(empty($_POST["lastName"])){
			$lastNameErr = "Last Name is required";
			$Err = true;
		} else {
			$lastName = test_input($_POST["lastName"]);
			if (!preg_match("/^[a-zA-Z ]*$/",$lastName)) {
				$lastNameErr = "Invalid Name"; 
				$Err = true;
			}
		}
	
		//Email
		if(empty($_POST["email"])){
			$emailErr = "Email is required";
			$Err = true;
		} else {
			$email = test_input($_POST["email"]);
			if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
				$emailErr = "Invalid Email"; 
				$Err = true;
		}
	}
	
		//Email Check
		if(empty($_POST["checkEmail"])){
			$checkEmailErr = "Email confirmation is required";
			$Err = true;
			} elseif($_POST["email"] == $_POST["checkEmail"]) {
				$checkEmail = test_input($_POST["checkEmail"]);
			} else {
				$checkEmailErr = "Email does not match";
				$Err = true;
			}
	
		//Password
		//at least 8 characters and contains a letter
		if(empty($_POST["pwd1"])){
			$pwd1Err = "Password is required";
			$Err = true;
		} elseif (!preg_match('/^(?=[a-z])[a-zA-Z]{8,}$/', $pwd1)){
			$pwd1Err = "Password must be 8 characters and contain a letter"
			$Err = true;
		} else {
			$pwd1 = test_input($_POST["pwd1"]);
		}
	
		//Password Check
		if(empty($_POST["pwd2"])){
			$pwd2 = "Password confirmation is required";
			$Err = true;
		} elseif($_POST["pwd1"] == $_POST["pwd2"]){
			$pwd2 = test_input($_POST["pwd2"]);
		} else {
			$pwd2Err = "Password does not match";
			$Err = true;
		}
	
	}
	$firstName = mysql_real_escape_string($firstName);
	$lastName = mysql_real_escape_string($lastName);
	$email = mysql_real_escape_string($email);
	$pwd1 = mysql_real_escape_string($pwd1);
	
	//Inserts values from form into database if there are no errors; Err=true
	if($Err != true){
	$sql = "INSERT INTO users (firstName, lastName, email, password)
	VALUES('$firstName','$lastName','$email','$pwd1' )";

	$db->query($sql);
	}
	
	function test_input($data){
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
	
	}
	
	mysqli_close($db);
	
	?>