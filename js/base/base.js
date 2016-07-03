/*base.js*/

/**
 * 声明一个全局变量，用于不同工程师之间的通信
 * @type {Object}
 */
var GLOBAL = {};

/**
 * 添加命名空间
 * @param {string} [str]
 */
GLOBAL.namespace = function(str) {
	var arr = str.split("."), o = GLOBAL;
	for(var i = (arr[0] == "GLOBAL") ? 1 : 0; i < arr.length; i++) {
		o[arr[i]] = o[arr[i]] || {};//||表示或操作，第一个条件为真，则执行o[arr[i]] = o[arr[i]]，否则执行o[arr[i]] = {}
		o = o[arr[i]];
	}

}

//创建一个名为Dom的命名空间
GLOBAL.namespace("Dom");

/**
 * [$ 根据id名获取节点，主要是代替document.getElementById]
 * @param {string or dom} [node] [输入可以是dom节点或者id]
 * @return {dom} [返回该dom节点]
 */
GLOBAL.Dom.$ = function(node) {
	node = typeof node === "string" ? document.getElementById(node) : node;
	return node;
}

/**
 * [getElementsByClassName 通过className获取节点]
 * @param  {string} str  [类名，必须]
 * @param  {string or dom} root [获取节点的父节点或者其id值，可选]
 * @param  {string} tag  [节点的标签名]
 * @return {dom}      [返回一组dom节点]
 */
GLOBAL.Dom.getElementsByClassName = function(str,root,tag) {
	if(root) {
		root = typeof root === "string" ? document.getElementById(root) : root;
	} else {
		root = document.body;
	}

	tag = tag || "*";//默认选取所有标签
	var els = root.getElementsByTagName(tag), arr = [];
	for(var i = 0; i < els.length; i++) {
		var  elsClassName = els[i].className.split(" ");
		for(var j = 0; j < elsClassName.length; j++) {
			if(elsClassName[j] == str) {
	    		arr.push(els[i]);
	    		break;
    		}
		}   		
    }
    return arr;
}

/**
 * [addClass 增加一个类]
 * @param {dom} node [description]
 * @param {string} str  [类名]
 */
GLOBAL.Dom.addClass = function(node,str) {
    var reg = new RegExp("(^|\\s+)" + str);
    if(!reg.test(node.className)) {
    	node.className = node.className + " " + str;
    }
}

/**
 * [removeClass 删除一个类]
 * @param {dom} node [description]
 * @param {string} str  [类名]
 */
GLOBAL.Dom.removeClass = function(node,str) {
    var reg = new RegExp("(^|\\s+)" + str);
    console.info(node.className);
    node.className = node.className.replace(reg,"");
    console.info(node.className);
}

//创建一个名为Eve的命名空间
GLOBAL.namespace("Eve");

/**
 * [addEvent 绑定事件，兼容ie]
 * @param {dom}   node [绑定事件的元素]
 * @param {string}   type [绑定事件的类型]
 * @param {Function} fn   [事件执行后的回调函数]
 */
GLOBAL.Eve.addEvent = function(node,type,fn) {
	if(node.attachEvent) {
		node.attachEvent("on" + type,fn);
	} else {
		node.addEventListener(type,fn,false);
	}
}

/**
 * [removeEvent 移除事件，兼容ie]
 * @param {dom}   node [移除事件的元素]
 * @param {string}   type [移除事件的类型]
 * @param {Function} fn   [移除事件执行后的回调函数]
 */
GLOBAL.Eve.removeEvent = function(node,type,fn) {
	console.log(node.removeEventListener);

	if(node.removeEventListener) {
		node.removeEventListener(type,fn,false);		
	} else {
		node.detachEvent("on" + type, fn);
	}
}

console.log(GLOBAL);