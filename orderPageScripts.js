/***ToDo
	FIX THE SUBMIT FUNCTION SO THE DATABASE IS UPDATED IN ORDER
	*****/

/************Global Variables***************/
var userID; //Retreive user ID if they are logged in
var currentDate = new Date(); //Date object created when page is loaded
var currentHour = currentDate.getHours();
var currentMinute = currentDate.getMinutes();
var currentMonth = currentDate.getMonth();
var currentDay = currentDate.getDate();
var currentYear = currentDate.getFullYear();
var monthList = ["January", "February", "March", "April", "May", "June",
				 "July", "August", "September", "October", "November", "December"];
				 
var itemToAdd; //Used when editing an order item
var orderItemNumber = 1;
var totalItems = 0; //Keeps track of the number of items in order list
var tempPrice = 0;
var totalPrice = 0;
var tax = parseFloat(1.07);
var orderNumber = 15;

/**********End Global Variables*************/

/************Start add item page*************/
var orderPopup = document.getElementById('orderPopup');
var orderItemBtn = document.getElementById("addOrderItemButton");
var span = document.getElementsByClassName("close")[0];
var menuNumbers = document.getElementById("menuNumber");

var menuItems = ["Doner Kebab Box","Doner Kebab Pita","Doner Kebab",
				 "Doner Kebab Wrap","Doner Kebab plate with fries",
				 "Doner Kebab plate with rice","Doner Kebab plate with white bread",
				 "Doner Kebab plate with pita bread","Doner Kebab plate with flat bread",
				 "Vegetarian plate", "Boba Tea"];
				 
var menuNames = ["kebabBox", "kebabPita", "donerKebab", "kebabWrap", 
				 "kebabPlateFries", "kebabPlateRice", "kebabPlateWhiteBread", 
				 "kebabPlatePitaBread", "kebabPlateFlatBread", "kebabVegetarian"];


var bobaTeas = ["Taro", "Honeydew", "Mango", "Coconut", "Strawbery", "Mocha", "Green Tea", "Milk Tea"];
var bobaFlavors = ["taroBoba", "honeydewBoba", "mangoBoba", "coconutBoba", "strawberryBoba", "mochaBoba", "greenTeaBoba", "milkTeaBoba"];

for (var i = 0; i < menuItems.length; i++)
{
		var currentItem = menuItems[i];
		var ele = document.createElement("option");
		ele.textContent = currentItem;
		ele.value = menuNames[i];
		menuNumbers.appendChild(ele);
}

var bobaTeaFlavors = document.getElementById("bobaTeaFlavors");
for (var i = 0; i < bobaTeas.length; i++)
{
    var ele = document.createElement("option");
    ele.textContent = bobaTeas[i];
    ele.value = bobaFlavors[i];
    bobaTeaFlavors.appendChild(ele);
}
bobaTeaFlavors.style.visibility = 'hidden';
var bobaPearls = document.getElementById("bobaPearls");
bobaPearls.hidden = true;

function updateTotal()
{
	var totalCost = document.getElementById("totalCost");
	while(totalCost.firstChild)
	{
		totalCost.removeChild(totalCost.firstChild);
	}
	var costNode = document.createTextNode("Total: $"+(parseFloat(totalPrice)*parseFloat(tax)).toFixed(2));
	totalCost.appendChild(costNode);
}
	 
function createItemList()
{
    if (totalItems > 9)
    {
        window.alert("To order more than 10 items, please call the store.");
        return;
    }
    var editButton = document.getElementById("finishEditBtn");
    var addButton = document.getElementById("addToOrderBtn");
    editButton.style.display = "none";
    addButton.style.display = "block";
    orderPopup.style.display = "block";
    resetItemList();
}

function resetItemList()
{
    menuNumber.selectedIndex = 0;
    
    var veggies = document.getElementsByName("vegetables");
    for( var i = 0; i < veggies.length; i++)
    {
        if(!(veggies[i].checked))
        {
            veggies[i].checked = true;
        }
    }

    var sauces = document.getElementsByName("sauce");
    for( var i = 0; i < sauces.length; i++)
    {
        if(sauces[i].checked)
        {
            sauces[i].checked = false;
        }
    }

    var extras = document.getElementsByName("extras");
    for( var i = 0; i < extras.length; i++ )
    {
        if(extras[i].checked)
        {
            extras[i].checked = false;
        }
    }

    var requests = document.getElementById("requests");
    requests.value = "";
}

span.onclick = function() {
	orderPopup.style.display = "none";
};

/****************End add item page*****************/

/***********Handle certain item combinations***********/

menuNumbers.onchange = function () {
	var meatTable = document.getElementById("meatTable");
	var sauceTable = document.getElementById("sauceTable");
	var vegetableTable = document.getElementById("vegetableTable");
	var extrasTable = document.getElementById("extrasTable");
	var bobaTeaList = document.getElementById("bobaTeaFlavors");
 	if(menuNumber.selectedIndex == 10)
	{
 	    meatTable.hidden = true;
 	    sauceTable.hidden = false;
 	    vegetableTable.hidden = false;
 	    extrasTable.hidden = false;
 	    bobaTeaList.style.visibility = 'hidden';
 	    bobaPearls.hidden = true;
	}
 	else if (menuNumber.selectedIndex == 11)
	{
	    meatTable.hidden = true;
	    sauceTable.hidden = true;
	    vegetableTable.hidden = true;
	    extrasTable.hidden = true;
	    bobaTeaList.style.visibility = 'visible';
	    bobaPearls.hidden = false;

	}
	else {
	    meatTable.hidden = false;
	    sauceTable.hidden = false;
	    vegetableTable.hidden = false;
	    extrasTable.hidden = false;
	    bobaTeaList.style.visibility = 'hidden';
	    bobaPearls.hidden = true;
	}
};

function addItemToList()
{
	//reset tempPrice
	tempPrice = 0;
	
	//get menu number
	var selectedMenuItem = document.getElementById("menuNumber");
	var menuItemValue = selectedMenuItem.options[selectedMenuItem.selectedIndex].textContent;
	var menuNumberText = document.getElementById("menuNumberText");
	
	if (selectedMenuItem.selectedIndex == 0)
	{
	    menuNumberText.innerHTML = "Please select a menu item.";
	    return;
	}
	else if(selectedMenuItem.selectedIndex != 11)
	{
		priceCheck(selectedMenuItem.options[selectedMenuItem.selectedIndex].value, 1, "food");
	    menuNumberText.innerHTML = "";
	
	
	//get type of meat selected
	var meatType = document.querySelector('input[name="meat"]:checked').value;
	
	//get list of vegetables
	var vegeCheck = document.getElementsByName("vegetables");
	var checkedVeggies = [];
	for(var i = 0; i < vegeCheck.length; i++)
	{
		if(vegeCheck[i].checked)
		{
			checkedVeggies.push(" " + (vegeCheck[i].value));
		}
	}
	
	//Get sauces
	var sauceList = document.getElementsByName("sauce");
	var sauceCheck = [];
	for(var i = 0; i < sauceList.length; i++)
	{
		if(sauceList[i].checked)
		{
			sauceCheck.push(" " + (sauceList[i].value));
		}
	}
	
	//Get extras
	var extraList = document.getElementsByName("extras");
	var extraCheck = [];
	var friesQuantity = document.getElementById("friesQuantity");
	var riceQuantity = document.getElementById("riceQuantity");
	var drinkQuantity = document.getElementById("drinkQuantity");

	for(var i = 0; i < extraList.length; i++)
	{
		if(extraList[i].checked)
		{
		    if(extraList[i].value == "Fries")
		    {
		        priceCheck("fries", friesQuantity.value, "extras");
		        extraCheck.push(" " + (extraList[i].value)+"("+friesQuantity.value+")");
		    }
		    else if (extraList[i].value == "Rice")
		    {
		        priceCheck("rice", riceQuantity.value, "extras");
		        extraCheck.push(" " + (extraList[i].value) + "(" + riceQuantity.value + ")");
		    }
		    else if (extraList[i].value == "Drink")
		    {
		        priceCheck("drink", drunkQuantity.value, "extras");
		        extraCheck.push(" " + (extraList[i].value) + "(" + drinkQuantity.value + ")");
		    }
		    else if(extraList[i].value == "Extra Meat")
		    {
		       priceCheck("extraMeat", 1, "extras");
		        extraCheck.push(" " + (extraList[i].value));
		    }
		    else {
		        priceCheck("feta", 1, "extras");
		        extraCheck.push(" " + (extraList[i].value));
		    }
		}
	}
	
	}//end else if statement
	
	//Get boba flavor
	var bobaFlavor = document.getElementById("bobaTeaFlavors");
	var bobaFlavorValue = bobaFlavor.options[bobaFlavor.selectedIndex].textContent;
	var bobaFlavorName = bobaFlavor.options[bobaFlavor.selectedIndex].value;

    //Print everything to order list
	var currentItemDiv = document.getElementById("currentItemsDiv");

	var itemTable = document.createElement("table");
	itemTable.setAttribute("id", "orderItem" + orderItemNumber);
	itemTable.setAttribute("value", tempPrice);
	var itemTableBody = document.createElement("tbody");

	var itemButton = document.createElement("input");
	itemButton.setAttribute("name", "editButton");
	itemButton.setAttribute("type", "button");
	itemButton.setAttribute("value", "Order Item #"+orderItemNumber);
	itemButton.setAttribute("id", "itemButton" + orderItemNumber);
    itemButton.setAttribute("style", "width:100%")
	itemButton.setAttribute("onclick", "editItem(this)");
	var tableRow0 = document.createElement("tr");
	var tableCol0 = document.createElement("td");
	tableCol0.setAttribute("colspan", 3);
	tableCol0.appendChild(itemButton);
	tableRow0.appendChild(tableCol0);
	itemTableBody.appendChild(tableRow0);

	
	//create table row for Menu Item type
	var tableRow1 = document.createElement("tr");
	var tableCol1 = document.createElement("td");
	var para1 = document.createElement("P");
	var ptext1 = document.createTextNode("Menu Item: ");
	para1.appendChild(ptext1);
	tableCol1.appendChild(para1);
	tableRow1.appendChild(tableCol1);
	tableCol1 = document.createElement("td");
	para1 = document.createElement("P");
	para1.setAttribute("value", selectedMenuItem.selectedIndex);
	para1.setAttribute("id", "menuItem" + orderItemNumber);
	ptext1 = document.createTextNode(menuItemValue);
	para1.appendChild(ptext1);
	tableCol1.appendChild(para1);
	tableRow1.appendChild(tableCol1);
	itemTableBody.appendChild(tableRow1);
	
	if (selectedMenuItem.selectedIndex != 11 && selectedMenuItem.selectedIndex != 10) {
	    //create table row for meat type
	    var tableRow2 = document.createElement("tr");
	    var tableCol2 = document.createElement("td");
	    var para2 = document.createElement("P");
	    var ptext2 = document.createTextNode("Meat Type: ");
	    para2.appendChild(ptext2);
	    tableCol2.appendChild(para2);
	    tableRow2.appendChild(tableCol2);
	    tableCol2 = document.createElement("td");
	    para2 = document.createElement("P");
	    para2.setAttribute("id", "meat" + orderItemNumber);
	    ptext2 = document.createTextNode(meatType);
	    para2.appendChild(ptext2);
	    tableCol2.appendChild(para2);
	    tableRow2.appendChild(tableCol2);
	    itemTableBody.appendChild(tableRow2);
	}
	
	if (selectedMenuItem.selectedIndex != 11) {
	    //create table row for vegetables
	    var tableRow3 = document.createElement("tr");
	    var tableCol3 = document.createElement("td");
	    var para3 = document.createElement("P");
	    var ptext3 = document.createTextNode("Vegetables: ");
	    para3.appendChild(ptext3);
	    tableCol3.appendChild(para3);
	    tableRow3.appendChild(tableCol3);
	    tableCol3 = document.createElement("td");
	    para3 = document.createElement("P");
	    para3.setAttribute("id", "vegetables" + orderItemNumber);
	    if (checkedVeggies.length == 6) {
	        ptext3 = document.createTextNode("All Vegetables");
	    }
	    else if (checkedVeggies.length == 0) {
	        ptext3 = document.createTextNode("No Vegetables");
	    }
	    else {
	        ptext3 = document.createTextNode(checkedVeggies);
	    }
	    para3.appendChild(ptext3);
	    tableCol3.appendChild(para3);
	    tableRow3.appendChild(tableCol3);
	    itemTableBody.appendChild(tableRow3);

	    //create table row for sauces
	    var tableRow4 = document.createElement("tr");
	    var tableCol4 = document.createElement("td");
	    var para4 = document.createElement("P");
	    var ptext4 = document.createTextNode("Sauces: ");
	    para4.appendChild(ptext4);
	    tableCol4.appendChild(para4);
	    tableRow4.appendChild(tableCol4);
	    tableCol4 = document.createElement("td");
	    para4 = document.createElement("P");
	    para4.setAttribute("id", "sauces" + orderItemNumber);
	    if (sauceCheck.length == 0) {
	        ptext4 = document.createTextNode("No Sauce");
	    }
	    else {
	        ptext4 = document.createTextNode(sauceCheck);
	    }
	    para4.appendChild(ptext4);
	    tableCol4.appendChild(para4);
	    tableRow4.appendChild(tableCol4)
	    itemTableBody.appendChild(tableRow4);

	    //create table row for extras
	    var tableRow5 = document.createElement("tr");
	    var tableCol5 = document.createElement("td");
	    var para5 = document.createElement("P");
	    var ptext5 = document.createTextNode("Extras: ");
	    para5.appendChild(ptext5);
	    tableCol5.appendChild(para5);
	    tableRow5.appendChild(tableCol5);
	    tableCol5 = document.createElement("td");
	    para5 = document.createElement("P");
	    para5.setAttribute("id", "extras" + orderItemNumber);
	    if (extraCheck.length == 0) {
	        ptext5 = document.createTextNode("No extras");
	    }
	    else {
	        ptext5 = document.createTextNode(extraCheck);
	    }
	    para5.appendChild(ptext5);
	    tableCol5.appendChild(para5);
	    tableRow5.appendChild(tableCol5);
	    itemTableBody.appendChild(tableRow5);
	}

	if (selectedMenuItem.selectedIndex == 11)
	{
		//Get price for boba tea
		priceCheck(bobaFlavorName, 1, "bobatea");
		
		//Get tapioca pearl value
		var tPearls = document.querySelector('input[name="pearls"]:checked').value;
		if(tPearls == "Yes")
		{
			priceCheck("tapiocaPearls", 1, "bobatea");
		}
		
		//Create Row for boba tea flavor
	    var bobaFlavorRow = document.createElement("tr");
	    var bobaFlavorCol = document.createElement("td");
	    var bobaFlavorPara = document.createElement("P");
	    var bobaFlavorText = document.createTextNode("Flavor: ");
	    bobaFlavorPara.appendChild(bobaFlavorText);
	    bobaFlavorCol.appendChild(bobaFlavorPara);
	    bobaFlavorRow.appendChild(bobaFlavorCol);
	    bobaFlavorCol = document.createElement("td");
	    bobaFlavorPara = document.createElement("P");
	    bobaFlavorText = document.createTextNode(bobaFlavorValue);
	    bobaFlavorPara.appendChild(bobaFlavorText);
	    bobaFlavorCol.appendChild(bobaFlavorPara);
	    bobaFlavorRow.appendChild(bobaFlavorCol);
	    itemTableBody.appendChild(bobaFlavorRow);
		
		//Create Row for tapioca pearls
		bobaFlavorRow = document.createElement("tr");
	    bobaFlavorCol = document.createElement("td");
	    bobaFlavorPara = document.createElement("P");
	    bobaFlavorText = document.createTextNode("Tapioca Pearls: ");
	    bobaFlavorPara.appendChild(bobaFlavorText);
	    bobaFlavorCol.appendChild(bobaFlavorPara);
	    bobaFlavorRow.appendChild(bobaFlavorCol);
	    bobaFlavorCol = document.createElement("td");
	    bobaFlavorPara = document.createElement("P");
	    bobaFlavorText = document.createTextNode(tPearls);
	    bobaFlavorPara.appendChild(bobaFlavorText);
	    bobaFlavorCol.appendChild(bobaFlavorPara);
	    bobaFlavorRow.appendChild(bobaFlavorCol);
	    itemTableBody.appendChild(bobaFlavorRow);
	}

    //create table row for item price
	var priceRow = document.createElement("tr");
	var priceCol = document.createElement("td");
	var pricePara = document.createElement("P");
	var priceText = document.createTextNode("Price:");
	pricePara.appendChild(priceText);
	priceCol.appendChild(pricePara);
	priceRow.appendChild(priceCol);
	priceCol = document.createElement("td");
	pricePara = document.createElement("P");
	priceText = document.createTextNode(tempPrice);
	pricePara.appendChild(priceText);
	priceCol.appendChild(pricePara);
	priceRow.appendChild(priceCol);
	itemTableBody.appendChild(priceRow);

    //create table row for remove item button
	var tableRow6 = document.createElement("tr");
	var tableCol6 = document.createElement("td");
	tableCol6.setAttribute("colspan", 2);
	var removeButton = document.createElement("input");
	removeButton.setAttribute("type", "button");
	removeButton.setAttribute("value", "Remove Item");
	removeButton.setAttribute("style", "width:100%");
	removeButton.setAttribute("onclick", "deleteTable(this)");
	tableCol6.appendChild(removeButton);
	tableRow6.appendChild(tableCol6);
	itemTableBody.appendChild(tableRow6);
	
	itemTable.appendChild(itemTableBody);
	currentItemDiv.appendChild(itemTable);
	orderPopup.style.display = "none";
	orderItemNumber++;
	totalItems++;
	totalPrice += tempPrice;
	updateTotal();
}

/************End items combo handling******************/

/***********Start creating list for dates*************/

var pickupDate = document.getElementById("pickupDate");
var tempMonth = currentMonth;
var tempDay = currentDay;
var tempYear = currentYear;
var dayIterator = 0;

for(var i = 0; i < 7; i++)
{
	if(currentMonth === 8 || currentMonth === 3 || currentMonth === 5 || currentMonth === 10)
	{
		if(tempDay > 30)
		{
			tempDay = tempDay%30;
			tempMonth++;
		}
	}
	else if(currentMonth === 1)
	{
		if(tempDay > 28 && currentYear%4 !== 0)
		{
			tempDay = tempDay%28;
			tempMonth++;
		}
		else if(tempDay > 29 && currentYear%4 !== 0)
		{
			tempDay = tempDay%29;
			tempMonth++;
		}
	}
	else
	{
		if(tempDay > 31)
		{
			tempDay = tempDay%31;
			tempMonth++;
		}
	}
	
	if(tempMonth > 11)
	{
		tempMonth = tempMonth%12;
		tempYear++;
	}
	
	var dateToAdd = document.createElement("option");
	dateToAdd.textContent = monthList[tempMonth] + " " + tempDay + ", " + tempYear;
	dateToAdd.value = tempDay;
	if ((currentDate.getDay() + dayIterator)%6 == 0)
	{
	    dateToAdd.name = "sunday";
	}
	pickupDate.appendChild(dateToAdd);
	tempDay++;
	dayIterator++;
}

/************End creating list for dates**************/

/************Start creating list for time*************/

var pickupTime = document.getElementById("pickupTime");
var selectedDate;
var timeToAdd = document.createElement("option");

pickupDate.onchange = function() {
	var iChanged = 0;
	selectedDate = pickupDate.options[pickupDate.selectedIndex].value;
	while(pickupTime.firstChild) {
		pickupTime.removeChild(pickupTime.firstChild);
	}
    for(var i = 11; i < 21; i++)
    {
	    if( i < 11 ) { continue; } //Checks that the time is after the store is open 
	    if( currentDay == selectedDate && iChanged === 0)
	    {
    		i = currentHour - 1;
		    iChanged = 1;
		    if( i >= 21 )
		    {
    			timeToAdd.textContent = "Closed";
			    pickupTime.appendChild(timeToAdd);
			    break;
		    }
		    else
		    {
			    continue;
		    }
	    }
	    if (pickupDate.options[pickupDate.selectedIndex].name == "sunday")
	    {
	        timeToAdd.textContent = "Closed";
	        pickupTime.appendChild(timeToAdd);
	        break;
	    }
	    for(var j = 0; j <= 59; j++)
	    {
    		if( i == currentHour && j == 0 && currentDay == selectedDate) {
			    j = currentMinute;
			    continue;
		    }
		    if(j%15 === 0)
		    {
    			if( i > 11 )
			    {
    				timeToAdd = document.createElement("option");
				    if( j < 10 )
				    {
    					if( i === 12 )
					    {
    						timeToAdd.textContent = i + ":0" + j + " p.m.";
						    timeToAdd.value = i + ":0" + j + " p.m.";
					    }
					    else
					    {
    						timeToAdd.textContent = i%12 + ":0" + j + " p.m.";
						    timeToAdd.value = i%12 + ":0" + j + " p.m.";
					    }
					    pickupTime.appendChild(timeToAdd);
				    }
				    else
				    {
    					if( i === 12)
					    {
    						timeToAdd.textContent = i + ":" + j + " p.m.";
						    timeToAdd.value = i + ":" + j + " p.m.";
					    }
					    else
					    {
    						timeToAdd.textContent = i%12 + ":" + j + " p.m.";
						    timeToAdd.value = i%12 + ":" + j + " p.m.";
					    }
					    pickupTime.appendChild(timeToAdd);
				    }
			    }
			    else {
    				timeToAdd = document.createElement("option");
				    if( j < 10 )
				    {
    					timeToAdd.textContent = i + ":0" + j + " a.m.";
					    timeToAdd.value = i + ":0" + j + " a.m.";
					    pickupTime.appendChild(timeToAdd);
				    }
				    else
				    {
    					timeToAdd.textContent = i + ":" + j + " a.m.";
					    timeToAdd.value = i + ":" + j + " a.m.";
					    pickupTime.appendChild(timeToAdd);
				    }
			    }
		    }
	    }
    }
};

/*************End creating list for time**************/

/***************Form Validation**********************/

function validate(field, value)
{
	var xmlhttp;
	if(window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	}
	else{
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState != 4 && xmlhttp.status == 200) {
			document.getElementById(field).innerHTML = "Validating..";
		}
		else if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			document.getElementById(field).innerHTML = xmlhttp.responseText;
		}
		else {
			//document.getElementById(field).innerHTML = "Error Occurred. <a href='validation.php'>Reload Or Try Again</a> the page.";
		}
	}
	xmlhttp.open("GET", "validation.php?field=" + field + "&value=" + value, true);
	xmlhttp.send();
}

/***************End Form Validation*******************/

function priceCheck(item, quantity, place)
{
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState != 4 && xmlhttp.status == 200) {

        }
        else if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			tempPrice += parseFloat(xmlhttp.responseText);
        }
        else {
            return ":/";
        }
    }
    xmlhttp.open("GET", "priceCheck.php?item=" + item + "&quantity=" + quantity + "&place=" + place, false);
	xmlhttp.send();
}

function editItem(itemInList)
{

    var tableCol = itemInList.parentNode;
    var tableRow = tableCol.parentNode;
    var tableBody = tableRow.parentNode;
    var table = tableBody.parentNode;
    var tableID = table.getAttribute("id").toString();
    itemToAdd = tableID.substring(tableID.length - 1, tableID.length);

    var editButton = document.getElementById("finishEditBtn");
    var addButton = document.getElementById("addToOrderBtn");
    editButton.style.display = "block";
    addButton.style.display = "none";

    orderPopup.style.display = "block";
}

function finishEditingItem()
{
	//reset tempPrice
	tempPrice = 0;
	
    //get menu number
    var selectedMenuItem = document.getElementById("menuNumber");
    var menuItemValue = selectedMenuItem.options[selectedMenuItem.selectedIndex].textContent;
	var menuNumberText = document.getElementById("menuNumberText");
	
	if (selectedMenuItem.selectedIndex == 0)
	{
	    menuNumberText.innerHTML = "Please select a menu item.";
	    return;
	}
	else
	{
		priceCheck(selectedMenuItem.options[selectedMenuItem.selectedIndex].value, 1, "food");
	    menuNumberText.innerHTML = "";
	}

    //get type of meat selected
    var meatType = document.getElementsByName("meat");
    var checkedMeatType;

    for (var i = 0; i < meatType.length; i++)
    {
        if(meatType[i].checked)
        {
            checkedMeatType = meatType[i].value;
        }
    }

    //get list of vegetables
    var vegeCheck = document.getElementsByName("vegetables");
    var checkedVeggies = [];
    for (var i = 0; i < vegeCheck.length; i++) {
        if (vegeCheck[i].checked) {
            checkedVeggies.push(" " + (vegeCheck[i].value));
        }
    }

    //Get sauces
    var sauceList = document.getElementsByName("sauce");
    var sauceCheck = [];
    for (var i = 0; i < sauceList.length; i++) {
        if (sauceList[i].checked) {
            sauceCheck.push(" " + (sauceList[i].value));
        }
    }

    //Get extras
    var extraList = document.getElementsByName("extras");
    var extraCheck = [];
    var friesQuantity = document.getElementById("friesQuantity");
    var riceQuantity = document.getElementById("riceQuantity");
    var drinkQuantity = document.getElementById("drinkQuantity");

    for (var i = 0; i < extraList.length; i++)
    {
        if (extraList[i].checked)
        {
		    if(extraList[i].value == "Fries")
		    {
		        priceCheck("fries", friesQuantity.value, "extras");
		        extraCheck.push(" " + (extraList[i].value)+"("+friesQuantity.value+")");
		    }
		    else if (extraList[i].value == "Rice")
		    {
		        priceCheck("rice", riceQuantity.value, "extras");
		        extraCheck.push(" " + (extraList[i].value) + "(" + riceQuantity.value + ")");
		    }
		    else if (extraList[i].value == "Drink")
		    {
		        priceCheck("drink", drunkQuantity.value, "extras");
		        extraCheck.push(" " + (extraList[i].value) + "(" + drinkQuantity.value + ")");
		    }
		    else if(extraList[i].value == "Extra Meat")
		    {
		       priceCheck("extraMeat", 1, "extras");
		        extraCheck.push(" " + (extraList[i].value));
		    }
		    else {
		        priceCheck("feta", 1, "extras");
		        extraCheck.push(" " + (extraList[i].value));
		    }
        }
    }

    var addNode = document.createTextNode(menuItemValue);

    //Update Table
    //Menu item
    var updateMenuItem = document.getElementById("menuItem" + itemToAdd);
    updateMenuItem.removeChild(updateMenuItem.childNodes[0]);
    updateMenuItem.appendChild(addNode);

    //Meat
    var updateMeat = document.getElementById("meat" + itemToAdd);
    updateMeat.removeChild(updateMeat.childNodes[0]);
    addNode = document.createTextNode(checkedMeatType);
    updateMeat.appendChild(addNode);

    //Vegetables
    var updateVegetables = document.getElementById("vegetables" + itemToAdd);
    updateVegetables.removeChild(updateVegetables.childNodes[0]);
    if (checkedVeggies.length == 0)
    {
        addNode = document.createTextNode("No vegetables");
    }
    else if (checkedVeggies.length == 6)
    {
        addNode = document.createTextNode("All vegetables");
    }
    else
    {
        addNode = document.createTextNode(checkedVeggies);
    }
    updateVegetables.appendChild(addNode);

    //Sauces
    var updateSauces = document.getElementById("sauces" + itemToAdd);
    updateSauces.removeChild(updateSauces.childNodes[0]);
    if (sauceCheck.length == 0)
    {
        addNode = document.createTextNode("No sauce");
    }
    else
    {
        addNode = document.createTextNode(sauceCheck);
    }
    updateSauces.appendChild(addNode);

    //Extras
    var updateExtras = document.getElementById("extras" + itemToAdd);
    updateExtras.removeChild(updateExtras.childNodes[0]);
    if (extraCheck.length == 0)
    {
        addNode = document.createTextNode("No Extras");
    }
    else
    {
        addNode = document.createTextNode(extraCheck);
    }
    updateExtras.appendChild(addNode);

    orderPopup.style.display = "none";
}

function deleteTable(source)
{
    var parentDiv = document.getElementById("currentItemsDiv");

    //Get the parent table to remove
    var tableCol = source.parentNode;
    var tableRow = tableCol.parentNode;
    var tableBody = tableRow.parentNode;
    var table = tableBody.parentNode;

    parentDiv.removeChild(table);
    totalItems--;
    var cNodes = document.getElementById("currentItemsDiv").childNodes;
    for(var i = 0; i < cNodes.length; i++)
    {
        table = cNodes[i];
        var button = table.firstChild.firstChild.firstChild.firstChild; //Find the order item button.
        button.setAttribute("value", "Order Item #" + (i + 1));
    }
    orderItemNumber = cNodes.length + 1;
}

function submitOrder()
{
    //Get the div where items are
    var orderItemDiv = document.getElementById("currentItemsDiv");

    //Get item list from div
    var orderItems = orderItemDiv.childNodes; //This puts the tables with order items into an array, the first 3 are related to total price

	//Get information from tables
    for (var i = 3; i < orderItems.length; i++)
    {
        var numOfNodes = orderItems[i].firstChild.childNodes.length;
        if (numOfNodes > 5)
        {
            var menuItem = orderItems[i].firstChild.childNodes[1].childNodes[1].firstChild; //This is the "p" object in the table for the menu item
			stringConverter(menuItem.innerHTML, addOrderItem, (i-2), "itemName");
            
			var meatType = orderItems[i].firstChild.childNodes[2].childNodes[1].firstChild; //Meat type selected for the table
			updateOrderItems(meatType.innerHTML, (i-2), "meat");
            
			var vegetables = orderItems[i].firstChild.childNodes[3].childNodes[1].firstChild; //Vegetables for the item
			updateOrderItems(vegetables.innerHTML, (i-2), "vegetables");
            
			var sauces = orderItems[i].firstChild.childNodes[4].childNodes[1].firstChild; //Sauces for the item
			updateOrderItems(sauces.innerHTML, (i-2), "sauce");
            
			var extras = orderItems[i].firstChild.childNodes[5].childNodes[1].firstChild; //extras for the item
			updateOrderItems(extras.innerHTML, (i-2), "extras");
			
			var price = orderItems[i].firstChild.childNodes[6].childNodes[1].firstChild; //price for the item
			updateOrderItems(parseFloat(price.innerHTML), (i-2), "price");
        }
        else
        {
			
        }
    }
}

function stringConverter(stringToConvert, callback, itemIndex, col)
{
	if(stringToConvert == "Nothing")
	{
		return;
	}
	var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			callback(xmlhttp.responseText, itemIndex, col);
        }
    }
    xmlhttp.open("GET", "menuReader.php?text="+stringToConvert, true);
	xmlhttp.send();
}

function addOrderItem(response, itemIndex, col)
{
	var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			
        }
    }
    xmlhttp.open("GET", "addToDB.php?response="+response+"&itemIndex="+itemIndex+"&col="+col+"&request=add&orderNum="+orderNumber, true);
	xmlhttp.send();
}

function updateOrderItems(response, itemIndex, col)
{
	var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			
        }
    }
    xmlhttp.open("GET", "addToDB.php?response="+response+"&itemIndex="+itemIndex+"&col="+col+"&request=update&orderNum="+orderNumber, true);
	xmlhttp.send();
}