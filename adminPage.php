<!DOCTYPE html>
<html>
	<head>
		<title>Admin Page</title>
		<meta charset="utf-8">
		<link rel="stylesheet" type="text/css" href="SDKaccStyle.css">
	</head>
	<body>
		<div class="container4">
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
			
			<div class="accountContainer">
				<div class="welcomeForm" style = "padding-top: 200px; padding-left: 30px;">
					<h1>Welcome</h1>
				</div>
				<div class="viewProfile" style="padding-top: 50px; padding-left: 30px;">
					<h2>Your Information</h2>
					
					<p id="usersName">Name: </p>
					<p id="usersEmail">Email: </p>
					
					<button id = "editProf">Edit Profile</button>
					
					<div id="modal" class="modal">
						<form class="modalContent" method = "post" action="./php/accountUpdate.php">
							<span class="close" id="close">x</span>
							<p>Current Email: </p>
							<input type="text" name="email" id="email" maxlength="50"/>
							<p>New Email: </p>
							<input type="text" name="newEmail" id="newEmail" maxlength="50"/>
							<p>Confirm Email: </p>
							<input type="text" name="checkNewEmail" id="checkNewEmail" maxlength="50"/><br><br>
							
							<button type='submit'>Confirm</button>
					</div>
				</div>
			<div class="allOrders">
				<table>
					<tr>
						<td>
							<p>Order Number</p>
						</td>
						<td>
							<p>Customer Name</p>
						</td>
						<td>
							<p>Customer Email</p>
						</td>
						<td>
							<p>Date</p>
						</td>
						<td>
							<p>Pickup Date</p>
						</td>
						<td>
							<p>Pickup Time</p>
						</td>
						<td>
							<p>Total</p>
						</td>
						<?php
							include 'php/config.php';
							
							$allorders = 'SELECT * FROM orders';
							$allordersresult = mysqli_query($conn, $allorders);
							$orderrow = mysqli_fetch_all($allordersresult, MYSQLI_ASSOC);
							
							foreach($orderrow as $order)
							{?>
								<tr>
									<td>
										<?php echo $order['orderID']; ?>
									</td>
									<td>
										<?php echo $order['customerName']; ?>
									</td>
									<td>
										<?php echo $order['customerEmail']; ?>
									</td>
									<td>
										<?php echo $order['orderDatePlaced']; ?>
									</td>
									<td>
										<?php echo $order['orderPickupDate']; ?>
									</td>
									<td>
										<?php echo $order['orderPickupTime']; ?>
									</td>
									<td>
										<?php echo $order['total']; ?>
									</td>
								</tr>
							<?php } ?>
				</table>
			</div>
		</div>
		
		<script>
		var modal = document.getElementById('modal');
		var span = document.getElementById("close");
		var btn = document.getElementById('editProf');
		
		btn.onclick=function(){
			modal.style.display="block";
		}
		
		span.onclick=function(){
			modal.style.display="none";
		}
		window.onclick=function(event){
			if(event.target == modal){
				modal.style.display="none";
				}
		}
		</script>
		<script src="scripts/adminScripts.js"></script>
	</body>
</html>