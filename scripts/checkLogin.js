function check(){
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	}
	else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			if(xmlhttp.responseText != "false")
			{
				changeHTML(xmlhttp.responseText);
			}
		}
	}
	xmlhttp.open("GET", "./php/checkLogin.php", true);
	xmlhttp.send();
}

function changeHTML(user){
	var toLoginPage = document.getElementById("toLoginPage");
	var toRegisterPage = document.getElementById("toRegisterPage");

	toLoginPage.innerHTML = "Hello " + user + "!";
	toLoginPage.setAttribute("href","./userAccountPage.html");
	toRegisterPage.innerHTML = "Log Out";
	toRegisterPage.setAttribute("href","./php/logout.php");
}
window.onload = check();