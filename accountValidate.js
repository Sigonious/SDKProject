function validateForm(){
	
	var x1 = document.forms["register"]["firstName"].value;
	var x2 = document.forms["register"]["lastName"].value;
	var x3 = document.forms["register"]["email"].value;
	var x4 = document.forms["register"]["checkEmail"].value;
	var x5 = document.forms["register"]["pwd1"].value;
	var x6 = document.forms["register"]["pwd2"].value;

	
	document.getElementById("banana").innerHTML = x1;
	
	var atpos = x3.indexOf("@");
    var dotpos = x3.lastIndexOf(".");
	
	if(x1 == null || x == ""){
		alert("Name field is required");
		return false;
	}
	if(x2 == null || x == ""){
		alert("Last Name field is required");
		return false;
	}
	
	if(x3 != ""){
		if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x3.length) {
        alert("Not a valid e-mail address");
		form.email.focus();
        return false;
		}
		
		if(x4 != x3){
		alert("Email does not match");
		return false;
		}
	}
	
	
	if(x5 != ""){
		if(x5.length < 6){
			alert("Password must be at least six characters!");
			form.pwd.focus();
			return false;
		}
		if(![0-9](x5)){
			alert("Password must contain at least one number!");
			form.pwd.focus();
			return false;
		}
		if(x6 != x5){
			alert("Passwords do not match");
			form.pwd.focus();
			return false;
		}
	}
	return true;
	
	
}