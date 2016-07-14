requirejs(["../base/base","../date3/date3"], function(G,calendar) {
	var wrap = document.getElementById("dateWrap");
	console.log(wrap);
	new calendar.DatePicker({
		wrap: wrap,
		startY: 1901,
		endY: 2049,
		min: 3,
		max: 15
	});
});