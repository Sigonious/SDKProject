/************Global Variables***************/

var currentDate = new Date();
var currentHour = currentDate.getHours();
var currentMinute = currentDate.getMinutes();
var currentMonth = currentDate.getMonth();
var currentDay = currentDate.getDate();
var currentYear = currentDate.getFullYear();
var monthList = ["January", "February", "March", "April", "May", "June",
				 "July", "August", "September", "October", "November", "December"];

/**********End Global Variables*************/


/**************Start order popup handling*****************/

var orderPopup = document.getElementById('orderPopup');

var orderItemBtn = document.getElementById("addOrderItemButton");

var span = document.getElementsByClassName("close")[0];

orderItemBtn.onclick = function() {
	orderPopup.style.display = "block";
};

span.onclick = function() {
	orderPopup.style.display = "none";
};
/***************End order popup handling**************/

/************Start creating list for items*************/

var menuNumbers = document.getElementById("menuNumber");
var menuItems = ["1 - Doner Kebab Box","2 - Doner Kebab Pita","3 - Doner Kebab",
				 "4 - Doner Kebab Wrap","5 - Doner Kebab plate with friest",
				 "6 - Doner Kebab plate with rice","7 - Doner Kebab plate with white bread",
				 "8 - Doner Kebab plate with pita bread","9 - Doner Kebab plate with flat bread",
				 "10 - Vegetarian plate "];
				 
for(var i = 0; i < menuItems.length; i++) {
	var currentItem = menuItems[i];
	var ele = document.createElement("option");
	ele.textContent = currentItem;
	ele.value = currentItem;
	menuNumbers.appendChild(ele);
}

/*************End creating list for items**************/

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