/*common_tab.js*/
/**
 * [setTab 实现tab页切换]
 * @param {[Object]} config [传入的参数是一个hash对象]
 */
function setTab(config) {
	console.log(config);
	var root = config.root;
	var curClass = config.currentClass;
	var trigger = config.trigger || "click";
	var handler = config.handler;
	var autoPlay = config.autoPlay;
	var playTime = config.playTime || 3000;
	console.log(curClass);
	var tabMenus = GLOBAL.Dom.getElementsByClassName("J_tab-menu"),
	tabContents  = GLOBAL.Dom.getElementsByClassName("J_tab-con");//这里使用"J_tab-menu"这种形式作为className是有用途的，表明这个class与js有关
	var curIndex = 0;

	/**
	 * [showItem 显示第n个tab页]
	 * @param  {number} n 
	 */
	function showItem(n) {
		for(var i = 0; i < tabContents.length; i++) {
			tabContents[i].style.display = "none";
		}
		tabContents[n].style.display = "block";//对应的tab内容显示
		console.log(curClass);
		if(curClass) {

			var curMenu = GLOBAL.Dom.getElementsByClassName(curClass,root)[0];
			if(curMenu) {
				console.log("1");
				console.log(curMenu.className);
				GLOBAL.Dom.removeClass(curMenu,curClass);
				console.log(curMenu.className);
			}
			GLOBAL.Dom.addClass(tabMenus[n],curClass);//对应的tab菜单显示
		}

		if(handler) {
			handler(n);//回调函数
		}
	}

	/**
	 * [autoHandler 自动播放功能]
	 */
	function autoHandler() {
		curIndex++;
		if(curIndex >= tabMenus.length) {
			curIndex = 0;
		}
		showItem(curIndex);
	}

	if(autoPlay) {
		setInterval(autoHandler,playTime);
	}

	for(var i = 0; i < tabMenus.length; i++) {
		(function(_i) {
			GLOBAL.Eve.addEvent(tabMenus[_i],"click",function() {
				showItem(_i);
			});
		})(i);
	}
}

var tab = GLOBAL.Dom.$("tab");
setTab({
	root: tab, 
	currentClass: "tab-curMenu",
	trigger: "click",
	handler: function(index) {
		alert("您点击的是第" + (index + 1) + "个标签");
	}
});
