requirejs([
	"base/base",
	"common/questionList"
], function(G,questionList) {
	new questionList.QuesList({
		root:G.Dom.$("quesNaire"),
		num: 3
	});
});