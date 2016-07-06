/*common_tab.js*/
/**
 * [setTab 实现tab页切换]
 * @param {[Object]} config [传入的参数是一个hash对象]
 */
var SetTab = function(config) {
	this._root = config.root;
	this._curClass = config.currentClass;
	var trigger = config.trigger || "click";
	this._handler = config.handler;
	var autoPlay = config.autoPlay;
	var playTime = config.playTime || 3000;
	//这里使用"J_tab-menu"这种形式作为className是有用途的，表明这个class与js有关
	this._tabMenus = GLOBAL.Dom.getElementsByClassName("J_tab-menu"),
	this._tabContents  = GLOBAL.Dom.getElementsByClassName("J_tab-con");
	this.curIndex = 0;

	var that = this;

	if(autoPlay) {
		setInterval(function() { that.autoHandler() },playTime);
	}

	for(var i = 0; i < this._tabMenus.length; i++) {
		(function(_i) {
			GLOBAL.Eve.addEvent(that._tabMenus[_i],"click",function() {
				that.showItem(_i);
			});
		})(i);
	}
}

SetTab.prototype = {
	constructor: SetTab,

	/**
	 * [showItem 显示第n个tab页]
	 * @param  {number} n 
	 */
	showItem: function(n) {
		for(var i = 0; i < this._tabContents.length; i++) {
			this._tabContents[i].style.display = "none";
		}
		//对应的tab内容显示
		this._tabContents[n].style.display = "block";

		if(this._curClass) {

			var curMenu = GLOBAL.Dom.getElementsByClassName(this._curClass,this._root)[0];
			if(curMenu) {
				GLOBAL.Dom.removeClass(curMenu,this._curClass);
			}
			//对应的tab菜单显示
			GLOBAL.Dom.addClass(this._tabMenus[n],this._curClass);
		}

		if(this._handler) {
			//回调函数
			this._handler(n);
		}
	},

	/**
	 * [autoHandler 自动播放功能]
	 */
	autoHandler: function() {
		this.curIndex++;
		if(this.curIndex >= this.tabMenus.length) {
			this.curIndex = 0;
		}
		showItem(this.curIndex);
	}
}

var tab = GLOBAL.Dom.$("tab");
new SetTab({
	root: tab, 
	currentClass: "tab-curMenu",
	trigger: "click",
	handler: function(index) {
		alert("您点击的是第" + (index + 1) + "个标签");
	}
});