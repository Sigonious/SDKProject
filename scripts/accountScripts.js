var usersName = document.getElementById("usersName");
var usersEmail = document.getElementById("usersEmail");

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
			result(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", "./php/checkLogin.php", true);
	xmlhttp.send();
}

function result(user){
	if(user != "false")
	{
		var toLoginPage = document.getElementById("toLoginPage");
		var toRegisterPage = document.getElementById("toRegisterPage");

		toLoginPage.innerHTML = "Hello " + user + "!";
		toLoginPage.setAttribute("href","./userAccountPage.html");
		toRegisterPage.innerHTML = "Log Out";
		toRegisterPage.setAttribute("href","./php/logout.php");
		
		session("fName");
		session("lName");
		session("email");
		session("type");
	}
	else
	{
		document.location.href = "index.php";
	}
}

function session(find)
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
			if(find == "fName")
			{
				document.getElementById("fName").innerHTML += xmlhttp.responseText;
			}
			else if(find == "lName")
			{
				document.getElementById("lName").innerHTML += " "+xmlhttp.responseText;
			}
			else if(find == "email")
			{
				usersEmail.innerHTML += xmlhttp.responseText;
			}
			else if(find == "type")
			{
				if(xmlhttp.responseText == "admin")
				{
					document.location.href = "./adminPage.php";
				}
			}
		}
	}
	xmlhttp.open("GET", "./php/sessionVariable.php?find="+find, true);
	xmlhttp.send();
}

window.onload = check();