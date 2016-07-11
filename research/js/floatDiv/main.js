requirejs(["../base/base","common_floatDiv"], function(GLOBAL,FloatLayer) {
	var popupBtn = GLOBAL.Dom.getElementsByClassName("J_floatBtn");
	console.log(popupBtn.length);
	for(var i = 0; i < popupBtn.length; i++) {
		(function(_i) {
			GLOBAL.Eve.addEvent(popupBtn[_i],"click",function() {
				var floatLayer = new FloatLayer({		
					root: GLOBAL.Dom.$("floatDiv"),
					isMove: true,
					isZoom: true,
					floatContent: {
						title: "这是一个浮出层",
						content: "这是浮出层的内容"
					}					
				});

				//初始化，生成浮出层				
				floatLayer.show();
			});
		})(i);
	}
});