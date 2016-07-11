requirejs(["../base/base","questionList"], function(G,questionList) {
	new questionList.QuesList({
		root:G.Dom.$("quesNaire"),
		num: 3
	});
});