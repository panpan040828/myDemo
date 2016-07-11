requirejs([
	"base/base",
	"common/common_floatDiv"
], function(GLOBAL,FloatLayer) {
	new FloatLayer({
		popupBtn: GLOBAL.Dom.getElementsByClassName("J_floatBtn"),
		root: GLOBAL.Dom.$("floatDiv"),
		isMove: [true,true],
		isZoom: [true,true],
		floatContent: [{
			title: "提示",
			content: "确认要删除此卷？"
		}]
	});
});