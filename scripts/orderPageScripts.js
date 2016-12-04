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
var orderItemNumber2 = 1;
var totalItems = 0; //Keeps track of the number of items in order list
var tempPrice = 0;
var totalPrice = 0;
var tax = parseFloat(1.07);
var orderNumber;
var orderItemsProcessed = 3;
var totalOrderItems = 0;

/**********End Global Variables*************/

/************Start add item page*************/
var orderPopup = document.getElementById('orderPopup');
var orderItemBtn = document.getElementById("addOrderItemButton");
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
	orderPopup.style.display = "none";
};

var menuNumbers = document.getElementById("menuNumber");

menuNumbers.onchange = function () {
	var meatTable = document.getElementById("meatTable");
	var sauceTable = document.getElementById("sauceTable");
	var vegetableTable = document.getElementById("vegetableTable");
	var extrasTable = document.getElementById("extrasTable");
	var bobaTeaList = document.getElementById("bobaTeaFlavors");
	var boxSides = document.getElementById("boxSides");
 	if(menuNumber.selectedIndex == 10)
	{
		boxSides.style.visibility = 'hidden';
 	    meatTable.hidden = true;
 	    sauceTable.hidden = false;
 	    vegetableTable.hidden = false;
 	    extrasTable.hidden = false;
 	    bobaTeaList.style.visibility = 'hidden';
 	    bobaPearls.hidden = true;
	}
 	else if (menuNumber.selectedIndex == 11)
	{
		boxSides.style.visibility = 'hidden';
	    meatTable.hidden = true;
	    sauceTable.hidden = true;
	    vegetableTable.hidden = true;
	    extrasTable.hidden = true;
	    bobaTeaList.style.visibility = 'visible';
	    bobaPearls.hidden = false;

	}
	else if(menuNumber.selectedIndex == 1)
	{
		boxSides.style.visibility = 'visible';
	    meatTable.hidden = false;
	    sauceTable.hidden = false;
	    vegetableTable.hidden = false;
	    extrasTable.hidden = false;
	    bobaTeaList.style.visibility = 'hidden';
	    bobaPearls.hidden = true;
	}
	else
	{
		boxSides.style.visibility = 'hidden';
	    meatTable.hidden = false;
	    sauceTable.hidden = false;
	    vegetableTable.hidden = false;
	    extrasTable.hidden = false;
	    bobaTeaList.style.visibility = 'hidden';
	    bobaPearls.hidden = true;
	}
};


var menuItems = ["Doner Kebab Box","Doner Kebab Pita","Doner Kebab",
				 "Doner Kebab Wrap","Doner Kebab plate with fries",
				 "Doner Kebab plate with rice","Doner Kebab plate with white bread",
				 "Doner Kebab plate with pita bread","Doner Kebab plate with flat bread",
				 "Vegetarian plate", "Boba Tea"];
				 
var menuNames = ["kebabBox", "kebabPita", "donerKebab", "kebabWrap", 
				 "kebabPlateFries", "kebabPlateRice", "kebabPlateWhiteBread", 
				 "kebabPlatePitaBread", "kebabPlateFlatBread", "kebabVegetarian",
				 "bobaTea"];


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

var boxSides = document.getElementById("boxSides");
boxSides.style.visibility = 'hidden';

function updateTotal(priceIndex, amount)
{
	var exists = document.getElementById("price"+priceIndex);
	if(exists)
	{
		exists.removeChild(exists.childNodes[0]);
		var tempText = document.createTextNode(tempPrice.toFixed(2));
		exists.appendChild(tempText);
	}
	var totalCost = document.getElementById("totalCost");
	var oldItemPrice;
	totalPrice = tempPrice;
	
	var costNode;
	if(totalCost.firstChild)
	{
		
		oldItemPrice = parseFloat(totalCost.innerHTML.replace("Total: $",""));
		oldItemPrice = oldItemPrice/tax;
		if(amount.includes("-"))
		{
			var newAmount = amount.replace("-", "");
			oldItemPrice -= (parseFloat(newAmount));
			costNode = document.createTextNode("Total: $"+(parseFloat(oldItemPrice)*parseFloat(tax)).toFixed(2));
		}
		else
		{
			var newAmount = parseFloat(amount);
			oldItemPrice += newAmount;
			costNode = document.createTextNode("Total: $"+(parseFloat(oldItemPrice)*parseFloat(tax)).toFixed(2));
		}
		totalCost.removeChild(totalCost.firstChild);
	}
	else
	{
		costNode = document.createTextNode("Total: $"+(parseFloat(totalPrice)*parseFloat(tax)).toFixed(2));
	}
	
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
	document.getElementById("boxSides").style.visibility = "hidden";
    
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
	
	var friesQuantity = document.getElementById("friesQuantity");
	friesQuantity.value = 0;
	var drinkQuantity = document.getElementById("drinkQuantity");
	drinkQuantity.value = 0;
	var riceQuantity = document.getElementById("riceQuantity");
	riceQuantity.value = 0;
	
    var requests = document.getElementById("requests");
    requests.value = "";
}

/****************End add item page*****************/

function checkQuantity()
{
	if(parseInt(document.getElementById("friesQuantity").value) < 1 && document.getElementById("fries").checked == true)
	{
		document.getElementById("friesQuantity").value = 1;
	}
	if(parseInt(document.getElementById("riceQuantity").value) < 1 && document.getElementById("rice").checked == true)
	{
		document.getElementById("riceQuantity").value = 1;
	}
	if(parseInt(document.getElementById("drinkQuantity").value) < 1 && document.getElementById("drink").checked == true)
	{
		document.getElementById("drinkQuantity").value = 1;
	}
	
}

/***********Handle certain item combinations***********/


function addItemToList()
{
	//reset tempPrice
	tempPrice = 0;
	document.getElementById("boxSidesText").innerHTML = "";
	
	//get menu number
	var selectedMenuItem = document.getElementById("menuNumber");
	var menuItemValue = selectedMenuItem.options[selectedMenuItem.selectedIndex].textContent;
	var menuNumberText = document.getElementById("menuNumberText");
	
	if(selectedMenuItem.selectedIndex == 1)
	{
		if(boxSides.selectedIndex == 0)
		{
			document.getElementById("boxSidesText").innerHTML = "Please select a valid side.";
			return;
		}
		else
		{
			menuItemValue += " w/ " + boxSides.options[boxSides.selectedIndex].innerHTML;
		}
	}
	
	if (selectedMenuItem.selectedIndex == 0)
	{
	    menuNumberText.innerHTML = "Please select a menu item.";
	    return;
	}
	else if(selectedMenuItem.selectedIndex != 11)
	{
		priceCheck(orderItemNumber2, selectedMenuItem.options[selectedMenuItem.selectedIndex].value, 1, "food");
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
					if(friesQuantity.value > 4)
					{
						friesQuantity.value = 4;
					}
					priceCheck(orderItemNumber2, "fries", friesQuantity.value, "extras");
					extraCheck.push(" " + (extraList[i].value)+"("+friesQuantity.value+")");
				}
				else if (extraList[i].value == "Rice")
				{
					if(riceQuantity.value > 4)
					{
						riceQuantity.value = 4;
					}
					priceCheck(orderItemNumber2, "rice", riceQuantity.value, "extras");
					extraCheck.push(" " + (extraList[i].value) + "(" + riceQuantity.value + ")");
				}
				else if (extraList[i].value == "Drink")
				{
					if(drinkQuantity.value > 4)
					{
						drinkQuantity.value = 4;
					}
					priceCheck(orderItemNumber2, "drink", drinkQuantity.value, "extras");
					extraCheck.push(" " + (extraList[i].value) + "(" + drinkQuantity.value + ")");
				}
				else if(extraList[i].value == "Extra Meat")
				{
				   priceCheck(orderItemNumber2, "extraMeat", 1, "extras");
					extraCheck.push(" " + (extraList[i].value));
				}
				else
				{
					priceCheck(orderItemNumber2, "feta", 1, "extras");
					extraCheck.push(" " + (extraList[i].value));
				}
			}
		}
	}//end else if statement
	else if(selectedMenuItem.selectedIndex == 11)
	{
	    menuNumberText.innerHTML = "";
		//Get boba flavor
		var bobaFlavor = document.getElementById("bobaTeaFlavors");
		var bobaFlavorValue = bobaFlavor.options[bobaFlavor.selectedIndex].textContent;
		var bobaFlavorName = bobaFlavor.options[bobaFlavor.selectedIndex].value;
		
		//Get tapioca pearl value
		var tPearls = document.querySelector('input[name="pearls"]:checked').value;
		if(tPearls == "Yes")
		{
			priceCheck(orderItemNumber2, "tapiocaPearls", 1, "bobatea");
		}
		
		//Get price for boba tea
		priceCheck(orderItemNumber2, bobaFlavorName, 1, "bobatea");
		
	}
	else
	{
		menuNumberText.innerHTML = "Unknown menu item.";
	    return;
	}
	

    //Print everything to order list
	var currentItemDiv = document.getElementById("currentItemsDiv");

	var itemTable = document.createElement("table");
	itemTable.setAttribute("id", "orderItem" + orderItemNumber2);
	itemTable.setAttribute("value", tempPrice);
	var itemTableBody = document.createElement("tbody");

	var itemButton = document.createElement("input");
	itemButton.setAttribute("name", "editButton");
	itemButton.setAttribute("type", "button");
	itemButton.setAttribute("value", "Order Item #"+orderItemNumber);
	itemButton.setAttribute("id", "itemButton" + orderItemNumber2);
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
	para1.setAttribute("id", "menuItem" + orderItemNumber2);
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
	    para2.setAttribute("id", "meat" + orderItemNumber2);
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
	    para3.setAttribute("id", "vegetables" + orderItemNumber2);
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
	    para4.setAttribute("id", "sauces" + orderItemNumber2);
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
	    para5.setAttribute("id", "extras" + orderItemNumber2);
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
	pricePara.setAttribute("id", "price"+orderItemNumber2);
	priceText = document.createTextNode(tempPrice);
	pricePara.appendChild(priceText);
	priceCol.appendChild(pricePara);
	priceRow.appendChild(priceCol);
	itemTableBody.appendChild(priceRow);
	
	//create table row for requests
	var tempReq = document.getElementById("requests");
	var reqRow = document.createElement("tr");
	var reqCol = document.createElement("td");
	var reqPara = document.createElement("P");
	var reqText = document.createTextNode("Requests: ");
	reqPara.appendChild(reqText);
	reqCol.appendChild(reqPara);
	reqRow.appendChild(reqCol);
	reqCol = document.createElement("td");
	reqPara = document.createElement("P");
	reqPara.setAttribute("id", "request"+orderItemNumber2);
	reqText = document.createTextNode(tempReq.value);
	reqPara.appendChild(reqText);
	reqCol.appendChild(reqPara);
	reqRow.appendChild(reqCol);
	itemTableBody.appendChild(reqRow);

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
	orderItemNumber2++;
	orderItemNumber++;
	totalItems++;
	updateTotal(orderItemNumber2, "0");
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
	if ((currentDate.getDay() + dayIterator)%7 == 0)
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
	}
	xmlhttp.open("GET", "./php/validation.php?field=" + field + "&value=" + value, true);
	xmlhttp.send();
}

/***************End Form Validation*******************/

function priceCheck(passedIndex, item, quantity, place)
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
			updateTotal(passedIndex, xmlhttp.responseText);
        }
        else {
            return ":/";
        }
    }
    xmlhttp.open("GET", "./php/priceCheck.php?item=" + item + "&quantity=" + quantity + "&place=" + place, true);
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
	var editTable = document.getElementById("orderItem"+itemToAdd);
	var numberOfRows = editTable.firstChild.childNodes.length - 5;
	for(var i = 0; i < numberOfRows; i++)
	{
		editTable.deleteRow(2);
	}
	
	//reset tempPrice
	tempPrice = 0;
	var priceToRemove = document.getElementById("price"+itemToAdd).innerHTML;
	updateTotal(0, "-"+priceToRemove);
	document.getElementById("boxSidesText").innerHTML = "";
	
    //get menu number
    var selectedMenuItem = document.getElementById("menuNumber");
    var menuItemValue = selectedMenuItem.options[selectedMenuItem.selectedIndex].textContent;
	var menuNumberText = document.getElementById("menuNumberText");
	
	if(selectedMenuItem.selectedIndex == 1)
	{
		if(boxSides.selectedIndex == 0)
		{
			document.getElementById("boxSidesText").innerHTML = "Please select a valid side.";
			return;
		}
		else
		{
			menuItemValue += " w/ " + boxSides.options[boxSides.selectedIndex].innerHTML;
		}
	}
	
	if (selectedMenuItem.selectedIndex == 0)
	{
	    menuNumberText.innerHTML = "Please select a menu item.";
	    return;
	}
	else if(selectedMenuItem.selectedIndex != 11)
	{
		priceCheck(itemToAdd, selectedMenuItem.options[selectedMenuItem.selectedIndex].value, 1, "food");
	    menuNumberText.innerHTML = "";
	}

	var meatType;
	if(document.getElementsByName("meat"))
	{
		//get type of meat selected
		meatType = document.getElementsByName("meat");
	}
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

	if(selectedMenuItem.selectedIndex != 11)
	{
		for (var i = 0; i < extraList.length; i++)
		{
			if (extraList[i].checked)
			{
				if(extraList[i].value == "Fries")
				{
					priceCheck(itemToAdd, "fries", friesQuantity.value, "extras");
					extraCheck.push(" " + (extraList[i].value)+"("+friesQuantity.value+")");
				}
				else if (extraList[i].value == "Rice")
				{
					priceCheck(itemToAdd, "rice", riceQuantity.value, "extras");
					extraCheck.push(" " + (extraList[i].value) + "(" + riceQuantity.value + ")");
				}
				else if (extraList[i].value == "Drink")
				{
					priceCheck(itemToAdd, "drink", drinkQuantity.value, "extras");
					extraCheck.push(" " + (extraList[i].value) + "(" + drinkQuantity.value + ")");
				}
				else if(extraList[i].value == "Extra Meat")
				{
				   priceCheck(itemToAdd, "extraMeat", 1, "extras");
					extraCheck.push(" " + (extraList[i].value));
				}
				else {
					priceCheck(itemToAdd, "feta", 1, "extras");
					extraCheck.push(" " + (extraList[i].value));
				}
			}
		}
	}
	
	if(selectedMenuItem.selectedIndex == 11)
	{
		//Get boba flavor
		var bobaFlavor = document.getElementById("bobaTeaFlavors");
		var bobaFlavorValue = bobaFlavor.options[bobaFlavor.selectedIndex].textContent;
		var bobaFlavorName = bobaFlavor.options[bobaFlavor.selectedIndex].value;
		
		//Get tapioca pearl value
		var tPearls = document.querySelector('input[name="pearls"]:checked').value;
		if(tPearls == "Yes")
		{
			priceCheck(itemToAdd, "tapiocaPearls", 1, "bobatea");
		}
		
		//Get price for boba tea
		priceCheck(itemToAdd, bobaFlavorName, 1, "bobatea");
		
	}

    var addNode = document.createTextNode(menuItemValue);
	var editedRow = document.createElement("tr");
	var editedCol = document.createElement("td");
	var editedPara = document.createElement("P");

    //Update Table
    //Menu item
    var updateMenuItem = document.getElementById("menuItem" + itemToAdd);
    updateMenuItem.removeChild(updateMenuItem.childNodes[0]);
    updateMenuItem.appendChild(addNode);
	
	if(selectedMenuItem.selectedIndex != 11)
	{
		if(selectedMenuItem.selectedIndex != 10)
		{
			//Meat
			addNode = document.createTextNode("Meat: ");
			editedPara.appendChild(addNode);
			editedCol.appendChild(editedPara);
			editedRow.appendChild(editedCol);
			editedPara = document.createElement("P");
			editedPara.setAttribute("id", "meat"+itemToAdd);
			editedCol = document.createElement("td");
			addNode = document.createTextNode(checkedMeatType);
			editedPara.appendChild(addNode);
			editedCol.appendChild(addNode);
			editedRow.appendChild(editedCol);
			editTable.firstChild.insertBefore(editedRow, editTable.firstChild.childNodes[2]);
		}

		//Vegetables
		editedRow = document.createElement("tr");
		editedCol = document.createElement("td");
		editedPara = document.createElement("P");
		addNode = document.createTextNode("Vegetables: ");
		editedPara.appendChild(addNode);
		editedCol.appendChild(editedPara);
		editedRow.appendChild(editedCol);
		editedPara = document.createElement("P");
		editedPara.setAttribute("id", "vegetables"+itemToAdd);
		editedCol = document.createElement("td");
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
		editedPara.appendChild(addNode);
		editedCol.appendChild(addNode);
		editedRow.appendChild(editedCol);
		if(selectedMenuItem.selectedIndex == 10)
		{
			editTable.firstChild.insertBefore(editedRow, editTable.firstChild.childNodes[2]);
		}
		else
		{
			editTable.firstChild.insertBefore(editedRow, editTable.firstChild.childNodes[3]);
		}

		//Sauces
		editedRow = document.createElement("tr");
		editedCol = document.createElement("td");
		editedPara = document.createElement("P");
		addNode = document.createTextNode("Sauces: ");
		editedPara.appendChild(addNode);
		editedCol.appendChild(editedPara);
		editedRow.appendChild(editedCol);
		editedPara = document.createElement("P");
		editedPara.setAttribute("id", "sauces"+itemToAdd);
		editedCol = document.createElement("td");
		if (sauceCheck.length == 0)
		{
			addNode = document.createTextNode("No sauce");
		}
		else
		{
			addNode = document.createTextNode(sauceCheck);
		}
		editedPara.appendChild(addNode);
		editedCol.appendChild(addNode);
		editedRow.appendChild(editedCol);
		if(selectedMenuItem.selectedIndex == 10)
		{
			editTable.firstChild.insertBefore(editedRow, editTable.firstChild.childNodes[3]);
		}
		else
		{
			editTable.firstChild.insertBefore(editedRow, editTable.firstChild.childNodes[4]);
		}

		//Extras
		editedRow = document.createElement("tr");
		editedCol = document.createElement("td");
		editedPara = document.createElement("P");
		addNode = document.createTextNode("Extras: ");
		editedPara.appendChild(addNode);
		editedCol.appendChild(editedPara);
		editedRow.appendChild(editedCol);
		editedPara = document.createElement("P");
		editedPara.setAttribute("id", "extras"+itemToAdd);
		editedCol = document.createElement("td");
		if (extraCheck.length == 0)
		{
			addNode = document.createTextNode("No Extras");
		}
		else
		{
			addNode = document.createTextNode(extraCheck);
		}
		editedPara.appendChild(addNode);
		editedCol.appendChild(addNode);
		editedRow.appendChild(editedCol);
		if(selectedMenuItem.selectedIndex == 10)
		{
			editTable.firstChild.insertBefore(editedRow, editTable.firstChild.childNodes[4]);
		}
		else
		{
			editTable.firstChild.insertBefore(editedRow, editTable.firstChild.childNodes[5]);
		}
	}
	else if(selectedMenuItem.selectedIndex == 11)
	{
		//boba tea flavor
		editedRow = document.createElement("tr");
		editedCol = document.createElement("td");
		editedPara = document.createElement("P");
	    addNode = document.createTextNode("Flavor: ");
	    editedPara.appendChild(addNode);
	    editedCol.appendChild(editedPara);
	    editedRow.appendChild(editedCol);
		editedCol = document.createElement("td");
		editedPara = document.createElement("P");
		editedPara.setAttribute("id", "flavor"+itemToAdd);
	    addNode = document.createTextNode(bobaFlavorValue);
	    editedPara.appendChild(addNode);
	    editedCol.appendChild(editedPara);
	    editedRow.appendChild(editedCol);
	    editTable.firstChild.insertBefore(editedRow, editTable.firstChild.childNodes[2]);
		
		//tapioca pearls
		editedRow = document.createElement("tr");
		editedCol = document.createElement("td");
		editedPara = document.createElement("P");
	    addNode = document.createTextNode("Tapioca Pearls: ");
	    editedPara.appendChild(addNode);
	    editedCol.appendChild(editedPara);
	    editedRow.appendChild(editedCol);
	    editedCol = document.createElement("td");
	    editedPara = document.createElement("P");
		editedPara.setAttribute("id", "tapioca"+itemToAdd);
	    addNode = document.createTextNode(tPearls);
	    editedPara.appendChild(addNode);
		editedCol.appendChild(editedPara);
	    editedRow.appendChild(editedCol);
	    editTable.firstChild.insertBefore(editedRow, editTable.firstChild.childNodes[3]);
	}
	
	//Price
	var updatePrice = document.getElementById("price"+itemToAdd);
	var currentPrice = updatePrice.innerHTML;
	updatePrice.removeChild(updatePrice.childNodes[0]);
	addNode = document.createTextNode(tempPrice);
	updatePrice.appendChild(addNode);

	totalPrice -= currentPrice;
	updateTotal(itemToAdd, "0");
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

	//If item is food and not a boba tea
	if(tableBody.childNodes.length > 7)
	{
		var removePrice = tableBody.childNodes[6].childNodes[1].firstChild.innerHTML;
		totalPrice -= parseFloat(removePrice);
		updateTotal(0, "-"+removePrice);
	}
	//if item is a boba tea
	else
	{
		var removePrice = tableBody.childNodes[4].childNodes[1].firstChild.innerHTML;
		totalPrice -= parseFloat(removePrice);
		updateTotal(0, "-"+removePrice);
	}
	
    parentDiv.removeChild(table);
    totalItems--;
    var cNodes = document.getElementById("currentItemsDiv").childNodes;
	if(cNodes.length > 3)
	{
		for(var i = 3; i < cNodes.length; i++)
		{
			table = cNodes[i];
			var button = table.firstChild.firstChild.firstChild.firstChild; //Find the order item button.
			button.setAttribute("value", "Order Item #" + (i - 2));
		}	
	}
    orderItemNumber--;
}

function startSubmitOrder()
{
	if(document.getElementById("name").innerHTML != "✔")
	{
		document.getElementById("name").innerHTML = "Enter a valid name.";
		return;
	}
	else if(pickupDate.selectedIndex == 0)
	{
		document.getElementById("name").innerHTML = "";
		document.getElementById("dateErr").innerHTML = "Please select a valid date";
		return;
	}
	else if(pickupTime.options[pickupTime.selectedIndex].innerHTML == "Closed")
	{
		document.getElementById("name").innerHTML = "";
		document.getElementById("dateErr").innerHTML = "";
		document.getElementById("timeErr").innerHTML = "Please select a valid time.";
		return;
	}
	else if(document.getElementById("currentItemsDiv").childNodes.length < 4)
	{
		document.getElementById("itemErr").innerHTML = "Please add items to order.";
		return;
	}
	document.getElementById("name").innerHTML = "";
	document.getElementById("dateErr").innerHTML = "";
	document.getElementById("timeErr").innerHTML = "";
	document.getElementById("itemErr").innerHTML = "";
	document.getElementById("submitButton").setAttribute("style", "display:none");
	
	//Get the orderNumber and begin adding the items to the database
	findOrderNumber();
}

function submitOrder()
{
    //Get the div where items are
    var orderItemDiv = document.getElementById("currentItemsDiv");

    //Get item list from div
    var orderItems = orderItemDiv.childNodes; //This puts the tables with order items into an array, the first 3 are related to total price

	var getLastTotal = document.getElementById("totalCost").innerHTML;
	var lastTotal = parseFloat(getLastTotal.replace("Total: $", ""));
	
	var custName = document.getElementById("customerName").value;
	var custEmail = document.getElementById("customerEmail").value;
	var pickupDateDom = document.getElementById("pickupDate");
	var pickupDate = pickupDateDom.options[pickupDateDom.selectedIndex].text;
	var pickupTimeDom = document.getElementById("pickupTime");
	var pickupTime = pickupTimeDom.options[pickupTimeDom.selectedIndex].text;
	addOrder("orders", custName, custEmail, pickupDate, pickupTime, lastTotal);
	
	totalOrderItems = orderItems.length;
	
	//Get information from tables
    for (var i = 3; i < orderItems.length; i++)
    {
        var numOfNodes = orderItems[i].firstChild.childNodes.length;
        if (numOfNodes > 8)
        {
			
			var requests = orderItems[i].firstChild.childNodes[7].childNodes[1].firstChild.innerHTML;
            var menuItem = orderItems[i].firstChild.childNodes[1].childNodes[1].firstChild; //This is the "p" object in the table for the menu item
			var meatType = orderItems[i].firstChild.childNodes[2].childNodes[1].firstChild; //Meat type selected for the table
			var vegetables = orderItems[i].firstChild.childNodes[3].childNodes[1].firstChild; //Vegetables for the item
			var sauces = orderItems[i].firstChild.childNodes[4].childNodes[1].firstChild; //Sauces for the item
			var extras = orderItems[i].firstChild.childNodes[5].childNodes[1].firstChild; //extras for the item
			var price = orderItems[i].firstChild.childNodes[6].childNodes[1].firstChild; //price for the item
			
			addOrderItem(menuItem.innerHTML, (i-2), "itemName", 1, requests);
			
			addOrderItem(meatType.innerHTML, (i-2), "meat", 1, "");
            
			if(vegetables.innerHTML.includes(","))
			{
				var vegetableArray = vegetables.innerHTML.split(", ");
				for(var j = 0; j < vegetableArray.length; j++)
				{
					addOrderItem(vegetableArray[j], (i-2), "vegetables", 1, "");
				}
			}
			else
			{
				addOrderItem(vegetables.innerHTML, (i-2), "vegetables", 1, "");
			}
			
			if(sauces.innerHTML.includes(","))
			{
				var saucesAsArray = sauces.innerHTML.split(", "); //splits sauces into an array delimited by commas
				
				//for loop to add all sauces to DB
				for(var j = 0; j < saucesAsArray.length; j++)
				{
					addOrderItem(saucesAsArray[j], (i-2), "sauce", 1, "");
				}
			}
			else
			{
				addOrderItem(sauces.innerHTML, (i-2), "sauce", 1, "");
			}
            
			if(extras.innerHTML.includes(","))
			{
				var extrasAsArray = extras.innerHTML.split(", "); //Splits extra items into an array delimited by commas
			
				//For loop to iterate through extra items
				for(var j = 0; j < extrasAsArray.length; j++)
				{
					var extraQuantity = 1;
					var extraSubstring = extrasAsArray[j];
					if(extraSubstring.includes("("))
					{
						//for loop to iterate through each extra item and check for quantity
						for(var k = 0; k < extrasAsArray[j].length; k++)
						{
							if(extrasAsArray[j].substr(k,1) == "(")
							{
								extraQuantity = extrasAsArray[j].substr(k+1, 1);
								extraSubstring = extrasAsArray[j].substr(0,k);
							}
						}
					}
					addOrderItem(extraSubstring, (i-2), "extras", extraQuantity, "");
				}
			}
			else
			{
				if(extras.innerHTML.includes("("))
				{
					var extrasQuantity = 1;
					var extrasSubstring = extras.innerHTML;
					for(var j = 0; j < extras.innerHTML.length; j++)
					{
						if(extras.innerHTML.substr(j,1) == "(")
						{
							extrasQuantity = extras.innerHTML.substr(j+1,1);
							extrasSubstring = extras.innerHTML.substr(0,j);
						}
					}
					addOrderItem(extrasSubstring, (i-2), "extras", extrasQuantity, "");
				}
				else
				{
					addOrderItem(extras.innerHTML, (i-2), "extras", 1, "");
				}
			}
			
			addOrderItem(parseFloat(price.innerHTML), (i-2), "price", 1, "");
        }
		else if(numOfNodes > 7)
		{
			
            var menuItem = orderItems[i].firstChild.childNodes[1].childNodes[1].firstChild; //This is the "p" object in the table for the menu item
			var vegetables = orderItems[i].firstChild.childNodes[2].childNodes[1].firstChild; //Vegetables for the item
			var sauces = orderItems[i].firstChild.childNodes[3].childNodes[1].firstChild; //Sauces for the item
			var extras = orderItems[i].firstChild.childNodes[4].childNodes[1].firstChild; //extras for the item
			var price = orderItems[i].firstChild.childNodes[5].childNodes[1].firstChild; //price for the item
			var requests = orderItems[i].firstChild.childNodes[6].childNodes[1].firstChild.innerHTML; //Requests for the item
			
			addOrderItem(menuItem.innerHTML, (i-2), "itemName", 1, requests);
            
			if(vegetables.innerHTML.includes(","))
			{
				var vegetableArray = vegetables.innerHTML.split(", ");
				for(var j = 0; j < vegetableArray.length; j++)
				{
					addOrderItem(vegetableArray[j], (i-2), "vegetables", 1, "");
				}
			}
			else
			{
				addOrderItem(vegetables.innerHTML, (i-2), "vegetables", 1, "");
			}
			
			if(sauces.innerHTML.includes(","))
			{
				var saucesAsArray = sauces.innerHTML.split(", "); //splits sauces into an array delimited by commas
				
				//for loop to add all sauces to DB
				for(var j = 0; j < saucesAsArray.length; j++)
				{
					addOrderItem(saucesAsArray[j], (i-2), "sauce", 1, "");
				}
			}
			else
			{
				addOrderItem(sauces.innerHTML, (i-2), "sauce", 1, "");
			}
            
			if(extras.innerHTML.includes(","))
			{
				var extrasAsArray = extras.innerHTML.split(", "); //Splits extra items into an array delimited by commas
			
				//For loop to iterate through extra items
				for(var j = 0; j < extrasAsArray.length; j++)
				{
					var extraQuantity = 1;
					var extraSubstring = extrasAsArray[j];
					if(extraSubstring.includes("("))
					{
						//for loop to iterate through each extra item and check for quantity
						for(var k = 0; k < extrasAsArray[j].length; k++)
						{
							if(extrasAsArray[j].substr(k,1) == "(")
							{
								extraQuantity = extrasAsArray[j].substr(k+1, 1);
								extraSubstring = extrasAsArray[j].substr(0,k);
							}
						}
					}
					addOrderItem(extraSubstring, (i-2), "extras", extraQuantity, "");
				}
			}
			else
			{
				if(extras.innerHTML.includes("("))
				{
					var extrasQuantity = 1;
					var extrasSubstring = extras.innerHTML;
					for(var j = 0; j < extras.innerHTML.length; j++)
					{
						if(extras.innerHTML.substr(j,1) == "(")
						{
							extrasQuantity = extras.innerHTML.substr(j+1,1);
							extrasSubstring = extras.innerHTML.substr(0,j);
						}
					}
					addOrderItem(extrasSubstring, (i-2), "extras", extrasQuantity, "");
				}
				else
				{
					addOrderItem(extras.innerHTML, (i-2), "extras", 1, "");
				}
			}
			
			addOrderItem(parseFloat(price.innerHTML), (i-2), "price", 1, "");
		}
        else
        {
			var menuItem = orderItems[i].firstChild.childNodes[1].childNodes[1].firstChild.innerHTML;
			var requests = orderItems[i].firstChild.childNodes[5].childNodes[1].firstChild.innerHTML;
			addOrderItem(menuItem, (i-2), "itemName", 1, requests);
			
			var bobaFlavorType = orderItems[i].firstChild.childNodes[2].childNodes[1].firstChild.innerHTML;
			addOrderItem(bobaFlavorType, (i-2), "flavor", 1, "");
			
			var tapiocaPearlsValue = orderItems[i].firstChild.childNodes[3].childNodes[1].firstChild.innerHTML;
			addOrderItem(tapiocaPearlsValue, (i-2), "extras", 1, "");
			
			var price = orderItems[i].firstChild.childNodes[4].childNodes[1].firstChild.innerHTML;
			addOrderItem(parseFloat(price), (i-2), "price", 1, "");
        }
    }
	
}

function addOrderItem(response, itemIndex, col, quantity, requests)
{
	if(col == "price"){ orderItemsProcessed++; }
	var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			console.log(xmlhttp.responseText);
			if(orderItemsProcessed = totalOrderItems && col == "price") {
				orderConfirmation(document.getElementById("customerName").value, document.getElementById("customerEmail").value);
			}
        }
    }
	if(col == "itemName")
	{
		xmlhttp.open("GET", "./php/addToDB.php?response="+response+"&itemIndex="+itemIndex+"&col="+col+"&orderNum="+orderNumber+"&requests="+requests, true);
	}
	else{
		xmlhttp.open("GET", "./php/addToDB.php?response="+response+"&itemIndex="+itemIndex+"&col="+col+"&orderNum="+orderNumber+"&quantity="+quantity, true);
	}
	xmlhttp.send();
}

function addOrder(col, name, email, pickupDate, pickupTime, lastTotal)
{
	var xmlhttp;
	if(window.XMLHttpRequest)
	{
		xmlhttp = new XMLHttpRequest();
	}
	else
	{
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		}
	}
	xmlhttp.open("GET", "./php/addToDB.php?response="+name+"&col="+col+"&orderNum="+orderNumber+"&email="+email+"&pickupDate="+pickupDate+"&pickupTime="+pickupTime+"&total="+lastTotal, true);
	xmlhttp.send();
}

function findOrderNumber()
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
			orderNumber = parseInt(xmlhttp.responseText);
			submitOrder();
        }
    }
    xmlhttp.open("GET", "./php/findOrderNumbers.php", true);
	xmlhttp.send();
}

function orderConfirmation(name, email)
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
			document.getElementById("i").value = orderNumber;
			document.getElementById("r").value = "1";
			document.getElementById("submitForm").submit();
        }
    }
    xmlhttp.open("GET", "./php/orderConfirmation.php?name="+name+"&email="+email, true);
	xmlhttp.send();
}

function session(request)
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
			if(xmlhttp.responseText != ".")
			{
				if(request == "n")
				{
					document.getElementById("customerName").value = xmlhttp.responseText;
					session("e");
				}
				else if(request == "e")
				{
					document.getElementById("customerEmail").value = xmlhttp.responseText;
					validate("name", document.getElementById("customerName").value);
				}
			}
        }
    }
    xmlhttp.open("GET", "./php/getSession.php?request="+request, true);
	xmlhttp.send();
}
window.onload = session("n");