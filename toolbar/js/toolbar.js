requirejs(["base","common_backTop"], function(GLOBAL, backTop) {
	var topDiv = GLOBAL.Dom.$("backTop");
	console.log(topDiv);
	var top = new backTop.BackTop(topDiv, {
		mode: "move",
		des: 0,
		moveTime: 100
	});
});
