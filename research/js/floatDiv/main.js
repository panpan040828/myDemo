requirejs(["../base/base","common_floatDiv"], function(GLOBAL,FloatLayer) {
	new FloatLayer({
		popupBtn: GLOBAL.Dom.getElementsByClassName("J_floatBtn"),
		root: GLOBAL.Dom.$("floatDiv"),
		isMove: [true,true],
		isZoom: [true,true],
		floatContent: [{
			title: "这是一个浮出层",
			content: "这是浮出层的内容"
		},{
			title: "这是第二个浮出层",
			content: "这是浮出层的内容"
		}]
	});
});