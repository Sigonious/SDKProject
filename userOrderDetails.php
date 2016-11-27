<!DOCTYPE html>
<html>
	<head>
		<title>Order Details</title>
		<meta charset="utf-8">
		<link rel="stylesheet" type="text/css" href="SDKaccStyle.css">
	</head>
	<body>
		<?php
			session_start();
			include("php/config.php");
			$orderID = mysqli_real_escape_string($conn, $_GET['id']);
		?>
		<div class="container4" style="background:white;">
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
			<div class="topthing" style="padding-top:200px; background-color:white;"></div>
			<div class="accountContainer">
				<h1 id="orderNum">Order #<?php echo $orderID; ?></h1>
				<h3>Status: <?php
					$orderstatusquery = $conn->query("SELECT * FROM orders WHERE orderID=$orderID");
					$orderstatusresult = $orderstatusquery->fetch_array(MYSQLI_ASSOC);
					echo $orderstatusresult['status'];
				?></h3>
				<table>
				<?php
					$index = 1;
					$query = $conn->query("SELECT * FROM orderitem WHERE orderID=$orderID");
					$queryrows = $query->fetch_all(MYSQLI_ASSOC);
					foreach($queryrows as $row)
					{?>
						<h3>Item #<?php echo $index; ?></h3>
						<tr>
							<p><b>Item: </b><?php
								echo $row['itemName'];
							?></p>
						<?php if($row['itemName'] != "bobaTea"){
								if($row['itemName'] != "Vegetarian plate"){?>
							<tr>
								<p><b>Meat: </b><?php 
									$meatQuery = $conn->query("SELECT * FROM orderitemmeat WHERE orderID=$orderID AND orderIndex=$index");
									$meatrow = $meatQuery->fetch_array(MYSQLI_ASSOC);
									echo $meatrow['meat'];
								?></p>
							</tr>
							<?php } ?>
							<tr>
								<p><b>Vegetables: </b><?php 
									$vegequery = $conn->query("SELECT * FROM orderitemvegetables WHERE orderID=$orderID AND orderIndex=$index");
									$vegerows = $vegequery->fetch_all(MYSQLI_ASSOC);
									foreach($vegerows as $vegerow)
									{
										echo $vegerow['vegetable'] . " ";
									}
								?></p>
							</tr>
							<tr>
								<p><b>Sauces: </b><?php 
									$saucequery = $conn->query("SELECT * FROM orderitemsauce WHERE orderID=$orderID AND orderIndex=$index");
									$saucerows = $saucequery->fetch_all(MYSQLI_ASSOC);
									$saucecount = 0;
									$saucelength = count($saucerows);
									foreach($saucerows as $saucerow)
									{
										if($saucecount == $saucelength - 1)
										{
											echo $saucerow['sauce'];
										}
										else{
											echo $saucerow['sauce'] . " -- ";
											$saucecount++;
										}
									}
								?></p>
							</tr>
							<tr>
								<p><b>Extras: </b><?php 
									$extrasquery = $conn->query("SELECT * FROM orderitemextras WHERE orderID=$orderID AND orderIndex=$index");
									$extrasrows = $extrasquery->fetch_all(MYSQLI_ASSOC);
									$extracount = 0;
									$extralength = count($extrasrows);
									foreach($extrasrows as $extrarow)
									{
										if($extracount == $extralength - 1)
										{
											echo $extrarow['extra'] . " (" . $extrarow['quantity'] . ")";
										}
										else{
											echo $extrarow['extra'] . " (" . $extrarow['quantity'] . ") + ";
											$extracount++;
										}
									}
								?></p>
							</tr>
							<tr>
								<p><b>Price: </b><?php 
									$pricequery = $conn->query("SELECT * FROM orderitemprice WHERE orderID=$orderID AND orderIndex=$index");
									$pricerow = $pricequery->fetch_array(MYSQLI_ASSOC);
									echo $pricerow['price'];
								?></p>
							</tr>
							<tr>
								<p><b>Requests: </b><?php
									echo $row['requests'];
								?></p>
							</tr>
							
						<?php } else{ ?>
							<tr>
								<p><b>Flavor: </b><?php
									$flavorquery = $conn->query("SELECT * FROM orderitemboba WHERE orderID=$orderID AND orderIndex=$index");
									$flavorrow = $flavorquery->fetch_array(MYSQLI_ASSOC);
									echo $flavorrow['flavor'];
								?></p>
							</tr>
							<tr>
								<p><b>Tapioca Pearls: </b><?php
									$tapiocaquery = $conn->query("SELECT * FROM orderitemextras WHERE orderID=$orderID AND orderIndex=$index");
									$tapiocarow = $tapiocaquery->fetch_array(MYSQLI_ASSOC);
									echo $tapiocarow['extra'];
								?></p>
							</tr>
							<tr>
								<p><b>Price: </b><?php
									$pricequery = $conn->query("SELECT * FROM orderitemprice WHERE orderID=$orderID AND orderIndex=$index");
									$pricerow = $pricequery->fetch_array(MYSQLI_ASSOC);
									echo $pricerow['price'];
								?></b>
							</tr>
							<tr>
								<p><b>Requests: </b><?php
									echo $row['requests'];
								?></p>
							</tr>
					<?php }
						echo '<br>';
						$index++;
					} ?>
				</table>
			</div>
		</div>
		<script src="scripts/accountScripts.js"></script>
	</body>
</html>