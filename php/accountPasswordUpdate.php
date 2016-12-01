<?php
	session_start();
	if($_SESSION['loggedin'] != true)
	{
		header("Location: " . $_SERVER['DOCUMENT_ROOT'] . "index.php");
		exit;
	}
	
	include("config.php");
	
	$email = "";
	$oldPassword = "a";
	$newPassword = "b";
	$checkNewPassword = "c";
	$Err = false;
	$oldPasswordErr = $passwordErr = $checkpasswordErr = "";
	echo "Working on it.";
	if($_SERVER["REQUEST_METHOD"] == "POST"){
	
		if(empty($_POST['email2']))
		{
			$emailErr = "Email is required.";
			echo $emailErr;
			$Err = true;
		}
		else
		{
			$email = $conn->real_escape_string($_POST['email2']);
		}
	
		if(empty($_POST['password'])){
			$oldPasswordErr = "Password is required";
			echo $oldPasswordErr;
			$Err = true;
		} else {
			$oldPassword = test_input($_POST["password"]);
		}
	
		if(empty($_POST["newPassword"])){
			$passwordErr = "Password is required";
			echo $passwordErr;
			$Err = true;
		} else {
			$newPassword = test_input($_POST["newPassword"]);
		}
	

		if(empty($_POST["checkNewPassword"])){
			$checkpasswordErr = "Password confirmation is required";
			$Err = true;
		} elseif($_POST["newPassword"] == $_POST["checkNewPassword"]) {
				$checknewPassword = test_input($_POST["checkNewPassword"]);
		} else {
				$checkpasswordErr = "Password does not match";
				echo $checkpasswordErr;
				$Err = true;
		}
	}
	else
	{
		header("Location: " . $_SERVER['DOCUMENT_ROOT'] . "index.php");
		echo "Not a valid method.";
		exit;
	}

	if($_SESSION['email'] != $email)
	{
		header("Location: " . $_SERVER['HTTP_REFERER']);
		exit;
	}
	
	if($newPassword == $checkNewPassword){
		if($Err != true){
			$oldPassword = hash('sha256', $oldPassword);
			$newPassword = hash('sha256', $newPassword);
			
			$sql = $conn->prepare("UPDATE users SET password=? WHERE email=?");
			$sql->bind_param("ss", $newPassword, $email);
			
	
			if ($sql->execute() == true) {
				echo "Successfully Updated";
				header("Location: " . $_SERVER['HTTP_REFERER']);
				exit;
			} else {
				echo "Error updating record";
			}
		}
	} else {
		echo "Passwords do not match";
	}
		
	function test_input($data){
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
	
	}
	
?>