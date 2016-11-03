<?php
	$menuItem = $_GET['text'];
	$xml = new DOMDocument();
	$xml->load("menu.xml");
	
	$food = $xml->getElementsByTagName("food");
	foreach($food as $item)
	{
		$itemNames = $item->getElementsByTagName("name");
		$itemName = $itemNames->item(0)->nodeValue;
		
		$itemDescriptions = $item->getElementsByTagName("description");
		$itemDescription = $itemDescriptions->item(0)->nodeValue;
		
		if($itemName == $menuItem)
		{
			echo "$itemDescription";
			exit;
		}
	}
	echo "Not Found";
	exit;
?>