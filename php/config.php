<?php
	define('dbserver','localhost');
	define('dbusername','root');
	define('dbpassword','root');
	define('dbdatabase','test');
	
	//connect to DB
	$conn = new mysqli(dbserver, dbusername, dbpassword, dbdatabase);
?>