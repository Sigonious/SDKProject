<?php
	
	include("config.php");
	session_start();
	
	//Checks if forms are empty and meets requirements
	
	$firstNameErr = $lastNameErr = $emailErr = $checkEmailErr = $pwd1Err = $pwd2Err ="";

	$firstName = $lastName = $email = $checkEmail = $pwd1 = $pwd2 ="";
	
	if($_SERVER["REQUEST_METHOD"] == "POST"){
		$Err = false;
		//First Name
		if(empty($_POST["firstName"])){
			$firstNameErr = "First Name is required";
			echo "$firstNameErr";
			$Err = true;
		} else {
			$firstName = test_input($_POST["firstName"]);
			if (!preg_match("/^[a-zA-Z ]*$/",$firstName)) {
				$firstNameErr = "Invalid Name"; 
				echo "$firstNameErr";
				$Err = true;
			}
		}
	
		//Last Name
		if(empty($_POST["lastName"])){
			$lastNameErr = "Last Name is required";
			echo "$lastNameErr";
			$Err = true;
		} else {
			$lastName = test_input($_POST["lastName"]);
			if (!preg_match("/^[a-zA-Z ]*$/",$lastName)) {
				$lastNameErr = "Invalid Name"; 
				echo "$lastNameErr";
				$Err = true;
			}
		}
	
		//Email
		if(empty($_POST["email"])){
			$emailErr = "Email is required";
			echo "$emailErr";
			$Err = true;
		} else {
			$email = test_input($_POST["email"]);
			if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
				$emailErr = "Invalid Email"; 
				echo "$emailErr";
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
			echo "$checkEmailErr";
			$Err = true;
		}
		
		//Check if email is already in database
		$usersEmail = $conn->real_escape_string($_POST["email"]);
		$emailquery = $conn->prepare("SELECT * FROM users WHERE email=?");
		$emailquery->bind_param("s", $usersEmail);
		$emailquery->execute();
		$emailcheckresult = $emailquery->get_result();
		$emailrows = $emailCheckResult->num_rows;
		if($emailrows > 0)
		{
			$emailErr = "Email is already in use.";
			echo "$emailErr";
			$Err = true;
		}
	
		//Password
		//at least 8 characters and contains a letter
		if(empty($_POST["pwd1"])){
			$pwd1Err = "Password is required";
			echo "$pwd1Err";
			$Err = true;
		}
		else {
			$pwd1 = test_input($_POST["pwd1"]);
		}
	
		//Password Check
		if(empty($_POST["pwd2"])){
			$pwd2 = "Password confirmation is required";
			echo "$pwd2";
			$Err = true;
		} elseif($_POST["pwd1"] == $_POST["pwd2"]){
			$pwd2 = test_input($_POST["pwd2"]);
		} else {
			$pwd2Err = "Password does not match";
			echo "$pwd2Err";
			$Err = true;
		}
	
		$firstName = $conn->real_escape_string($firstName);
		$lastName = $conn->real_escape_string($lastName);
		$email = $conn->real_escape_string($email);
		$pwd1 = $conn->real_escape_string($pwd1);
		
		//Inserts values from form into database if there are no errors; Err=true
		if(isset($Err) && $Err != true){
			
			$pwd1 = hash('sha256',$pwd1);
			
			$sql = $conn->prepare("INSERT INTO users (firstName, lastName, email, password, type)
			VALUES(?, ?, ?, ?, 'user')");
			$sql->bind_param("ssss", $firstName, $lastName, $email, $pwd1);

			if($sql->execute()){
				echo "Success";
				header("Location: ../regConf.html");
			}
			else{
				echo "Couldn't submit.";
				header("Location: ../registerPage.html");
			}
		}
		else if(isset($Err) && $Err == true)
		{
			echo "$Err";
			header("Location: ../registerPage.html");
		}
	}
	else{
		echo "Not a valid method";
		header("Location: ../registerPage.html");
	}
	
	$conn->close();
	
	function test_input($data){
		$data = trim($data);
		$data = stripslashes($data);
		$data = htmlspecialchars($data);
		return $data;
	}
	
?>