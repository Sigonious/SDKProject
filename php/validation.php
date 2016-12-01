<?php
	$value = $_GET['value'];
	$formfield = $_GET['field'];
	
	if($formfield == "name")
	{
		if(strlen($value) < 1)
		{
			echo "Please enter a name";
			exit;
		}
		if(!preg_match("/[a-zA-Z'-]+$/",$value))
		{
			echo "Invalid name";
			exit;
		}
    else
    {
		echo "✔";
		exit;
    }
	}
  
  if($formfield == "menuItem")
  {
    if($value == 0)
    {
      echo "Select an item";
    }
    else
    {
		echo "✔";
		exit;
    }
  }
?>