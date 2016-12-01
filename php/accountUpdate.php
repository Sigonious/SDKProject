<?php
	session_start();
	if(!isset($_SESSION['email']))
	{
		header("Location: ../index.php");
		exit;
	}
	include("config.php");
	$Err = false;
	$oldEmail = $conn->real_escape_string($_POST['email']);
	$newEmail = $conn->real_escape_string($_POST['newEmail']);
	$checkNewEmail = $conn->real_escape_string($_POST['checkNewEmail']);
	
	if($_SESSION['email'] != $oldEmail)
	{
		header('Location: ' . $_SERVER['HTTP_REFERER']);
		exit;
	}

	$oldEmailErr = $emailErr = $checkEmailErr = "";
	
	if($_SERVER["REQUEST_METHOD"] == "POST"){
	
		if(empty($_POST["email"])){
			$oldEmailErr = "Email is required";
			$Err = true;
		} else {
			$newEmail = test_input($_POST["newEmail"]);
			if (!filter_var($newEmail, FILTER_VALIDATE_EMAIL)) {
				$oldEmailErr = "Invalid Email"; 
				$Err = true;
			}	
		}
	
		if(empty($_POST["newEmail"])){
			$emailErr = "Email is required";
			$Err = true;
		} else {
			$newEmail = test_input($_POST["newEmail"]);
			if (!filter_var($newEmail, FILTER_VALIDATE_EMAIL)) {
				$emailErr = "Invalid Email"; 
				$Err = true;
			}
		}
	

		if(empty($_POST["checkNewEmail"])){
			$checkEmailErr = "Email confirmation is required";
			$Err = true;
			} elseif($_POST["newEmail"] == $_POST["checkNewEmail"]) {
				$checkNewEmail = test_input($_POST["checkNewEmail"]);
			} else {
				$checkEmailErr = "Email does not match";
				$Err = true;
			}
			
		
	}
		
	if($newEmail == $checkNewEmail){
		if($Err != true){
			$sql = $conn->prepare("UPDATE users SET email=? WHERE email=?");
			$sql->bind_param("ss", $newEmail, $oldEmail);
		}
	} else {
		echo "Emails do not match";
	}
	
	if ($sql->execute() == true) {
		echo "Successfully Updated";
		$_SESSION['email'] = $newEmail;
		header('Location: ' . $_SERVER['HTTP_REFERER']);
	} else {
		echo "Error updating record";
	}
		
	function test_input($data){
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
	
	}
	
?>