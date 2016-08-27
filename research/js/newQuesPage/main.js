requirejs(["../base/base","../date3/date3","newQuestion"], function(G,calendar,newQuestion) {
	var wrap = document.getElementById("dateWrap");
	console.log(wrap);
	new calendar.DatePicker({
		wrap: wrap,
		startY: 1901,
		endY: 2049,
		min: 3,
		max: 15
	});

	var quesBody = G.Dom.$("newQues");
	new newQuestion({
		wrap: quesBody
	});
});