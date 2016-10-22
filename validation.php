<?php
	$value = $_GET['value'];
	$formfield = $_GET['field'];
	
	if($formfield == "name")
	{
		if(strlen($value) < 1)
		{
			echo "Please enter a name";
		}
	}
?>