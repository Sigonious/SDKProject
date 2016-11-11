/************Global Variables***************/

var currentDate = new Date();
var currentHour = currentDate.getHours();
var currentMinute = currentDate.getMinutes();
var currentMonth = currentDate.getMonth();
var currentDay = currentDate.getDate();

/**********End Global Variables*************/


/**************Start order popup handling*****************/

var orderPopup = document.getElementById('orderPopup');

var orderItemBtn = document.getElementById("addOrderItemButton");

var span = document.getElementsByClassName("close")[0];

orderItemBtn.onclick = function() {
	orderPopup.style.display = "block";
}

span.onclick = function() {
	orderPopup.style.display = "none";
}
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



/************End creating list for dates**************/

/************Start creating list for time*************/

var pickupTime = document.getElementById("pickupTime");

for(var i = currentHour; i < 21; i++)
{
	if( i < 11 ) { continue; }
	for(var j = 0; j <= 59; j++)
	{
		if( i === currentHour && j === 0) {
			j = currentMinute;
		}
		if(j%15 === 0)
		{
			if( i > 11 )
			{
				var timeToAdd = document.createElement("option");
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
				var timeToAdd = document.createElement("option");
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

/*************End creating list for time**************/

window.addEventListener("load", start, false);