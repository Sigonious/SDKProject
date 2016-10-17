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

/************Start creating list for time*************/

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

/*************End creating list for time**************/

window.addEventListener("load", start, false);