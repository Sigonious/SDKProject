<!DOCTYPE html>

<!--
Add password strengths
Check if email is in database before insertion
!-->
<!html>
	<head>
		<title>Register</title>
		<meta charset="utf-8">
		<link rel = "stylesheet" type = "text/css" href = "SDKstyle.css">
		<script src="accountValidate.js"></script>
	</head>
	
	<body>
	
	
	<?php echo "ayy lmao";
	
	$user = 'root';
	$pass = '';
	$db = 'testdb';

	$db = new mysqli('localhost',$user,$pass,$db) or die("Unable to connect");

	
	
	$firstNameErr = $lastNameErr = $emailErr = $checkEmailErr = $pwd1Err = $pwd2Err ="";

	$firstName = $lastName = $email = $checkEmail = $pwd1 = $pwd2 ="";
	
	if($_SERVER["REQUEST_METHOD"] == "POST"){
	
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
	
	if(empty($_POST["checkEmail"])){
		$checkEmailErr = "Email confirmation is required";
		$Err = true;
	} elseif($_POST["email"] == $_POST["checkEmail"]) {
	$checkEmail = test_input($_POST["checkEmail"]);
	} else {
		$checkEmailErr = "Email does not match";
	$Err = true;}
	
	if(empty($_POST["pwd1"])){
		$pwd1Err = "Password is required";
		$Err = true;
	} else {
	$pwd1 = test_input($_POST["pwd1"]);
	}
	
	if(empty($_POST["pwd2"])){
		$pwd2 = "Password confirmation is required";
		$Err = true;
	} elseif($_POST["pwd1"] == $_POST["pwd2"]){
		$pwd2 = test_input($_POST["pwd2"]);
	} else {$pwd2Err = "Password does not match";
	$Err = true;}
	
	}
	$firstName = mysql_real_escape_string($firstName);
	$lastName = mysql_real_escape_string($lastName);
	$email = mysql_real_escape_string($email);
	$pwd1 = mysql_real_escape_string($pwd1);
	
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
	
		<div class="container">
			<div class="headerContainer">
				<div class ="headerContent">
					<div class="siteName">
						<img src="SDKlogo.jpg" alt="Logo"/>
						<h1>Son's Doner Kebab</h1>
					</div>
						<div class="headerButton">
							<a href="">Home</a>
							<a href="">Menu</a>
							<a href="">Order</a>
							<a href="">Contact Us</a>
						</div>
				</div>
			</div>
			<div class="space"></div>
			<form id="register" method="post" action='<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>'>
				<div class = "reg">
				<h1 style="text-align:center; font-family:arial;">Register</h1>
					<div class = "same">
					
						<input type='hidden' name='submitted' id='submitted' value='1'/>
						<label for='firstName'>*First Name: </label>
						<input type='text' name='firstName' id='firstName' maxlength ="20"/><?php echo $firstNameErr;?><br>
						<label for='lastName'>*Last Name: </label>
						<input type='text' name='lastName' id='lastName' maxlength ="20"/><?php echo $lastNameErr;?><br>
						<label for='email'>*Email Address: </label>
						<input type='text' name='email' id='email' maxlength ="50" /><?php echo $emailErr;?><br>
						<label for='checkEmail'>*Confirm Email Address: </label>
						<input type='text' name='checkEmail' id='checkEmail' maxlength ="50"/><?php echo $checkEmailErr;?><br>
						<label for='pwd1'>*Password: </label>
						<input type='password' name='pwd1' id='pwd1' maxlength ="20"/><?php echo $pwd1Err;?><br>
						<label for='pwd2'>*Confirm Password: </label>
						<input type='password' name='pwd2' id='pwd2' maxlength ="20"/><?php echo $pwd2Err;?><br>
						
						<input type='submit' name='submit' value='Create'/>
						
				</div>
				</div>
			</form>


		</div>
	<body>
<html>