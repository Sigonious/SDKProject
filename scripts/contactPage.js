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
				}
			}
        }
    }
    xmlhttp.open("GET", "./php/getSession.php?request="+request, true);
	xmlhttp.send();
}
window.onload = session("n");