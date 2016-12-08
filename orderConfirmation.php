<!DOCTYPE html>

<html>
	<head>
		<meta charset="utf-8">
		<link rel = "stylesheet" type = "text/css" href = "SDKstyle.css">
		<title>Thank you for your order!</title>
	</head>
	<body>
		<div class="headerContainer">
				<div class="logReg">
					<p><a href="loginPage.html" id="toLoginPage">Login</a> | 
					<a href="registerPage.html" id="toRegisterPage">Register</a></p>
				</div>
				<div class ="headerContent">
					<div class="siteName">
						<img src="SDKlogo.jpg" alt="Logo"/>
						<h1>Son's Doner Kebab</h1>
					</div>
					<div class="headerButton">
						<a href="homePage.html">Home</a>
						<a href="menuPage.html">Menu</a>
						<a href="orderPage.html">Order</a>
						<a href="contactPage.html">Contact Us</a>
					</div>
				</div>
			</div>
			<div class="space"></div>
			<div class="orderConfirmation">
				<?php 
					session_start();
					$orderID = $_POST['i'];
					$result = $_POST['r'];
					$name = $_POST['custName'];
					$email;
					if(isset($_POST['custEmail'])){
						$email = $_POST['custEmail'];
					}
					if($result == 1)
					{
						echo "<h1>Thank you!<br>
						Your order was placed successfully!</h1>
						<br>";
						if(isset($email)){
							echo "<h2>A confirmation email has been sent to $email</h2>";
						}
					}
					else{
						echo "<h1>Sorry, your order was not able to be placed at this time.<br>
						Please try again, or call (912) 681 - 7835</h1>";
					} ?>
			</div>
		<script src="scripts/checkLogin.js"></script>
	</body>
</html>