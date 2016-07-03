/*common_backTop.js*/
/**
 * [实现返回顶部的功能，该功能模块依赖于模块base]
 * @param {dom} ele    [返回顶部按钮]
 * @param {object} config [配置的参数对象]
 * [config]{	mode: move/go [模式 缓慢移动/立即到顶部]
 * 				des: number	  [到达的位置]
 *   	 		moveTime: number	[到达所用的时间]
 *         }
 */
define(["base"], function(GLOBAL){
	var BackTop = function(ele, config) {
		this.ele = ele;
		this.config = config;
		var that = this;
		if(this.config.mode == "move") {
			GLOBAL.Eve.addEvent(this.ele, "click", function() {
				that.move();
			});
		} else {
			GLOBAL.Eve.addEvent(this.ele, "click", function() {
				that.go();
			});
		}
		
		this.checkPos();
	}

	BackTop.prototype = {
		constructor: BackTop,

		move: function() {	
			var that = this.config;	
			function scroll(){
				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				if(scrollTop > that.des) {
					scrollTop -= 100;
					if(document.documentElement.scrollTop) {
						document.documentElement.scrollTop = scrollTop;
					} else {
						document.body.scrollTop = scrollTop;			
					}
					setTimeout(scroll, that.moveTime);
				} else if(scrollTop < that.des) {
					scrollTop += 100;
					if(document.documentElement.scrollTop) {
						document.documentElement.scrollTop = scrollTop;
					} else {
						document.body.scrollTop = scrollTop;			
					}
					setTimeout(scroll, that.moveTime);
				} else {
					return;
				}				
			}
			scroll();
		},

		go: function() {
			if(document.documentElement.scrollTop) {
				document.documentElement.scrollTop = this.config.des;
			} else {
				console.log(this.config);
				document.body.scrollTop = this.config.des;			
			}
		},

		checkPos: function() {
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			if(scrollTop < document.body.clientHeight) {
				this.ele.style.display = "block";
			} else {
				this.ele.style.display = "none";
			}
		},
	}

	return {
		BackTop: BackTop
	}
});
