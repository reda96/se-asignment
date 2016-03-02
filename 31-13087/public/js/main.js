$("body").click(function () { $.get("/api/quote", function (data, status) 
	{
	 var rndclr = Math.random() * 360;
	 var clrstr = "hsl(" + rndclr + ", 55%, 80%)";
	 $("body").css("background", clrstr);
	 document.getElementById("quote").innerText=data.text; 
	document.getElementById("author").innerText = data.author; }) });