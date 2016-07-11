/*base.js*/
define(function() {
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
			//||表示或操作，第一个条件为真，则执行o[arr[i]] = o[arr[i]]，否则执行o[arr[i]] = {}
			o[arr[i]] = o[arr[i]] || {};
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
	 * [在一个节点之后插入一个节点]
	 * @param  {dom} targetNode [目标节点]
	 * @param  {dom} newNode    [需要插入的节点]
	 * @return {[type]}            [description]
	 */
	GLOBAL.Dom.insertAfter = function(targetNode,newNode) {
		var parent = targetNode.parentNode;
		if(parent.lastChild == targetNode) {
			parent.appendChild(newNode);
		} else {
			parent.insertBefore(newNode,targetNode.nextSibling);
		}
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

	/**
	 * [获取某元素以浏览器左上角为原点的坐标]
	 * @param  {dom} node [某一个dom节点]
	 * @return {object}      [description]
	 */
	GLOBAL.Dom.getPoint = function (node) { 
		//获取该元素对应父容器的上边距，左边距
		var top = node.offsetTop; 
		var left = node.offsetLeft; 
		//判断是否有父容器，如果存在则累加其边距，等效 obj = obj.offsetParent;while (obj != undefined)
		while(node = node.offsetParent) {
			//叠加父容器的上边距，左边距
			top += node.offsetTop; 
			left += node.offsetLeft; 
		}
		return {
			top: top,
			left: left
		}
	}

	//定义一个方法，实现当前
	/**
	 * [获取计算后的DOM属性功能]
	 * @param  {[type]} node [description]
	 * @param  {[type]} attr [description]
	 * @return {[type]}     [description]
	 */
	GLOBAL.Dom.getCssAttr = function(node,attr) {
		var attrValue;

		if(node.currentStyle) {
			//主要是为了兼容ie浏览器
			if(node.currentStyle[attr].indexOf("%") !== -1) {
				if(attr == "left") {
					attrValue = GLOBAL.Dom.getPoint(node).left;
				}				
				if(attr == "top") {
					attrValue = GLOBAL.Dom.getPoint(node).top;
				}
			} else {
				attrValue = node.currentStyle[attr];
			}
		} else {
			attrValue = document.defaultView.getComputedStyle(node, null)[attr];
		}
		return attrValue;
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
		if(node.removeEventListener) {
			node.removeEventListener(type,fn,false);		
		} else {
			node.detachEvent("on" + type, fn);
		}
	}
	
	return GLOBAL;
});
