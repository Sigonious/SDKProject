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
			if($_SESSION['loggedin'] !== true)
			{
				echo "Access Denied";
				exit;
			}
			include("php/config.php");
			$orderID = $conn->real_escape_string($_GET['id']);
			
			$sql = $conn->prepare("SELECT * FROM orders WHERE customerEmail=? AND orderID=?");
			$sql->bind_param("si", $_SESSION['email'], $orderID);
			$sql->execute();
			$result = $sql->get_result();
			$row = $result->fetch_assoc();
			if($row['customerEmail'] != $_SESSION['email'])
			{
				header('Location: ../index.php');
				exit;
			}
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
			<div class="accountContainer2">
				<h1 id="orderNum">Order #<?php echo $orderID; ?></h1>
				<h3>Status: <?php
					echo $row['status'];
				?></h3>
				<table>
				<?php
					$index = 1;
					$query = $conn->prepare("SELECT * FROM orderitem WHERE orderID=?");
					$query->bind_param("i", $orderID);
					$query->execute();
					$queryresult = $query->get_result();
					$queryrows = $queryresult->fetch_all(MYSQLI_ASSOC);
					foreach($queryrows as $row)
					{?>
						<h3>Item #<?php echo $index; ?></h3>
						<tr>
							<p><b>Item: </b><?php
								echo $row['itemName'];
							?></p>
						<?php if($row['itemName'] != "Boba Tea"){
								if($row['itemName'] != "Vegetarian plate"){?>
							<tr>
								<p><b>Meat: </b><?php 
									$meatQuery = $conn->prepare("SELECT * FROM orderitemmeat WHERE orderID=? AND orderIndex=$index");
									$meatQuery->bind_param("i", $orderID);
									$meatQuery->execute();
									$meatResult = $meatQuery->get_result();
									$meatrow = $meatResult->fetch_array(MYSQLI_ASSOC);
									echo $meatrow['meat'];
								?></p>
							</tr>
							<?php } ?>
							<tr>
								<p><b>Vegetables: </b><?php 
									$vegequery = $conn->prepare("SELECT * FROM orderitemvegetables WHERE orderID=? AND orderIndex=$index");
									$vegequery->bind_param("i", $orderID);
									$vegequery->execute();
									$vegeresult = $vegequery->get_result();
									$vegerows = $vegeresult->fetch_all(MYSQLI_ASSOC);
									foreach($vegerows as $vegerow)
									{
										echo $vegerow['vegetable'] . " ";
									}
								?></p>
							</tr>
							<tr>
								<p><b>Sauces: </b><?php 
									$saucequery = $conn->prepare("SELECT * FROM orderitemsauce WHERE orderID=? AND orderIndex=$index");
									$saucequery->bind_param("i", $orderID);
									$saucequery->execute();
									$sauceresult = $saucequery->get_result();
									$saucerows = $sauceresult->fetch_all(MYSQLI_ASSOC);
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
									$extrasquery = $conn->prepare("SELECT * FROM orderitemextras WHERE orderID=? AND orderIndex=$index");
									$extrasquery->bind_param("i", $orderID);
									$extrasquery->execute();
									$extrasresult = $extrasquery->get_result();
									$extrasrows = $extrasresult->fetch_all(MYSQLI_ASSOC);
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
									$pricequery = $conn->prepare("SELECT * FROM orderitemprice WHERE orderID=? AND orderIndex=$index");
									$pricequery->bind_param("i", $orderID);
									$pricequery->execute();
									$pricequeryresult = $pricequery->get_result();
									$pricerow = $pricequeryresult->fetch_array(MYSQLI_ASSOC);
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
									$flavorquery = $conn->prepare("SELECT * FROM orderitemboba WHERE orderID=? AND orderIndex=$index");
									$flavorquery->bind_param("i", $orderID);
									$flavorquery->execute();
									$flavorqueryresult = $pricequery->get_result();
									$flavorrow = $flavorqueryresult->fetch_array(MYSQLI_ASSOC);
									echo $flavorrow['flavor'];
								?></p>
							</tr>
							<tr>
								<p><b>Tapioca Pearls: </b><?php
									$tapiocaquery = $conn->prepare("SELECT * FROM orderitemextras WHERE orderID=? AND orderIndex=$index");
									$tapiocaquery->bind_param("i", $orderID);
									$tapiocaquery->execute();
									$tapiocaqueryresult = $tapiocaquery->get_result();
									$tapiocarow = $tapiocaquery->fetch_array(MYSQLI_ASSOC);
									echo $tapiocarow['extra'];
								?></p>
							</tr>
							<tr>
								<p><b>Price: </b><?php
									$pricequery = $conn->prepare("SELECT * FROM orderitemprice WHERE orderID=? AND orderIndex=$index");
									$pricequery->bind_param("i", $orderID);
									$pricequery->execute();
									$pricequeryresult = $pricequery->get_result();
									$pricerow = $pricequeryresult->fetch_array(MYSQLI_ASSOC);
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