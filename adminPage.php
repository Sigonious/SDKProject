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
					
					<p id="usersName">Name: <text id="fName"></text><text id="lName"></text></p>
					<p id="usersEmail">Email: </p>
					<button id = "editProf">Change Email</button> 
					<button id="editPass">Change Password</button><br><br>
					<a href="orderList.php">View all Orders</a>
					
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
						</form>
					</div>
					<div id="modal2" class="modal2">
						<form class="modalContent" method = "post" action="./php/accountPasswordUpdate.php">
							<span class="close" id="close2">x</span>
							<p>Email Address: </p>
							<input type="text" name="email2" id="email2" maxlength="50"/>
							<p>Current Password: </p>
							<input type="password" name="password" id="password" maxlength="50"/>
							<p>New Password: </p>
							<input type="password" name="newPassword" id="newPassword" maxlength="50"/>
							<p>Confirm Password: </p>
							<input type="password" name="checkNewPassword" id="checkNewPassword" maxlength="50"/><br><br>
							
							<button type='submit'>Confirm</button>
						</form>
					</div>
				</div>
			</div>
		</div>
		
		<script>
			var modal = document.getElementById('modal');
			var modal2 = document.getElementById('modal2');
			var span = document.getElementById("close");
			var span2 = document.getElementById("close2");
			var btn = document.getElementById('editProf');
			var passBtn = document.getElementById("editPass");
			
			btn.onclick=function(){
				modal.style.display="block";
			}
			
			passBtn.onclick = function(){
				modal2.style.display="block";
			}
			
			span.onclick=function(){
				modal.style.display="none";
			}
			
			span2.onclick=function(){
				modal2.style.display="none";
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