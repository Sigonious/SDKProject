<?php
	$value = $_GET['value'];
	$formfield = $_GET['field'];
	
	if($formfield == "name")
	{
		if(strlen($value) < 1)
		{
			echo "Please enter a name";
		}
    else
    {
      echo "✔";
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
    }
  }
?>