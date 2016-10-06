setTimeout(function(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear()
	var div = document.getElementsByTagName("span");
	var events = document.getElementsByTagName("li");
	todays = []
	for (i = 0; i < div.length; i++) {
		var date = div[i].textContent;
		var datesplit = date.split("/");
		if (datesplit[1] == dd && datesplit[0] == mm) {
			events[i].style.backgroundColor = "green";
		}
	}
},2001);