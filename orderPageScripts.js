/************Global Variables***************/

var currentDate = new Date();
var currentHour = currentDate.getHours();
var currentMinute = currentDate.getMinutes();
var currentMonth = currentDate.getMonth();
var currentDay = currentDate.getDate();
var currentYear = currentDate.getFullYear();
var monthList = ["January", "February", "March", "April", "May", "June",
				 "July", "August", "September", "October", "November", "December"];
				 
var itemToAdd;

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
				 "Vegetarian plate"];
var selectedItem;

for(var i = 0; i < menuItems.length; i++) {
		var currentItem = menuItems[i];
		var ele = document.createElement("option");
		ele.textContent = (i+1)+": "+currentItem;
		ele.value = i+1;
		menuNumbers.appendChild(ele);
	}
	 
function createItemList()
{
	orderPopup.style.display = "block";	
}

span.onclick = function() {
	orderPopup.style.display = "none";
	menuNumbers.options.length = 0;
};

/****************End add item page*****************/

/***********Handle certain item combinations***********/

menuNumbers.onchange = function() {
	selectedItem = menuNumber.options[menuNumber.selectedIndex].value;
	var meatTable = document.getElementById("meatTable");
	if(selectedItem == 10)
	{
		meatTable.hidden = true;
	}
	else {
		meatTable.hidden = false;
	}
};

var orderItemNumber = 1;

function addItemToList()
{
	//get menu number
	var selectedMenuItem = document.getElementById("menuNumber");
	var menuItemValue = selectedMenuItem.options[selectedMenuItem.selectedIndex].textContent;
	
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
	for(var i = 0; i < extraList.length; i++)
	{
		if(extraList[i].checked)
		{
			extraCheck.push(" " + (extraList[i].value));
		}
	}
	
	var currentItemDiv = document.getElementById("currentItemsDiv");
	
	var bigText = document.createElement("h2");
	var bigTextHolder = document.createTextNode("Order Item #"+orderItemNumber);
	bigText.appendChild(bigTextHolder);
	currentItemDiv.appendChild(bigText);
	
	var itemTable = document.createElement("table");
	itemTable.setAttribute("id", "orderItem"+orderItemNumber);
	var itemTableBody = document.createElement("tbody");
	
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
	ptext1 = document.createTextNode(menuItemValue);
	para1.appendChild(ptext1);
	tableCol1.appendChild(para1);
	tableRow1.appendChild(tableCol1);
	itemTableBody.appendChild(tableRow1);
	
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
	ptext2 = document.createTextNode(meatType);
	para2.appendChild(ptext2);
	tableCol2.appendChild(para2);
	tableRow2.appendChild(tableCol2);
	itemTableBody.appendChild(tableRow2);
	
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
	if(checkedVeggies.length == 6)
	{
		ptext3 = document.createTextNode("All Vegetables");
	}
	else if(checkedVeggies.length == 0)
	{
		ptext3 = document.createTextNode("No Vegetables");
	}
	else
	{
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
	if(sauceCheck.length == 0)
	{
		ptext4 = document.createTextNode("No Sauce");
	}
	else
	{
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
	ptext5 = document.createTextNode(extraCheck);
	para5.appendChild(ptext5);
	tableCol5.appendChild(para5);
	tableRow5.appendChild(tableCol5);
	itemTableBody.appendChild(tableRow5);
	
	//create table row for additional requests
	
	itemTable.appendChild(itemTableBody);
	currentItemDiv.appendChild(itemTable);
	orderPopup.style.display = "none";
	orderItemNumber++;
}

/************End items combo handling******************/

/***********Start creating list for dates*************/

var pickupDate = document.getElementById("pickupDate");
var tempMonth = currentMonth;
var tempDay = currentDay;
var tempYear = currentYear;

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
	//Added this object after program was running fine
	//Trying to use the object to get values from the pickup date field
	/*var dateObjectToAdd = {
		month: tempMonth,
		day: tempDay,
		year: tempYear
	};*/
	dateToAdd.textContent = monthList[tempMonth] + " " + tempDay + ", " + tempYear;
	dateToAdd.value = tempDay;
	pickupDate.appendChild(dateToAdd);
	tempDay++;
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
				xmphttp = new ActiveXObject("Microsoft.XMLHTTP");
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
			xmlhttp.open("GET", "validation.php?field=" + field + "&value=" + value, false);
			xmlhttp.send();
		}

/***************End Form Validation*******************/