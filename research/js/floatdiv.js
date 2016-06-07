//浮出层的构造函数
function FloatLayer(wrap,ele,elehead) {
	this.ele = ele;
	this.wrap = wrap;
	this.elehead = elehead;
	this.params = {
		left: 0,
		top: 0,
		currentX: 0,
		currentY: 0,
		flag: false
	};
}

FloatLayer.prototype = {
	constructor: FloatLayer,
	init: function() {
		this.ele.style.left = "50%";
		this.ele.style.right = "50%";
	},

	show: function() {
		this.wrap.style.visibility = "visible";
		var that = this;
		setTimeout(function(){
			that.ele.style.visibility = "visible";
			that.ele.style.transition = "transform 200ms linear";
			that.ele.style.transform = 'translate(-50%, -50%) scale(1,1)';
		}, 200);				
	},

	hide: function() {		
		this.ele.style.transition = "transform 200ms linear";
		this.ele.style.transform = 'translate(-50%, -50%) scale(0,0)';
		this.ele.style.visibility = "hidden";
		var that = this;	
		setTimeout(function(){
			that.wrap.style.visibility = "hidden";
		}, 200);	
	},

	//定义一个方法，实现拖拽功能
	dragDiv: function() {
		var needParams = this.params;
		//首先获取当前的Div的left，right值存放起来
		needParams.left = getCss(this.ele,"left");
		needParams.top = getCss(this.ele,"top");
		//console.info(needParams.left);
		var that = this;

		eventMonitor(this.elehead, "mousedown", function(event) {
			console.log("1");
			if(!event) {
				event = window.event;
				//防止IE文字选中
				thiselehead.onselectstart = function(){
					return false;
				}  
			}
			  			
			var e = event ? event: window.event;
			needParams.flag = true;//鼠标按下，开始计算鼠标移动的路程
			needParams.currentX = e.clientX;
			needParams.currentY = e.clientY;
		});

		eventMonitor(this.elehead, "mouseup", function(event) {
			console.log("2");
			needParams.flag = false;//鼠标按下，开始计算鼠标移动的路程
			needParams.left = getCss(that.ele, "left");
		    needParams.top = getCss(that.ele, "top");
		});

		eventMonitor(this.elehead, "mousemove", function(event) {
			var e = event ? event: window.event;
			if(needParams.flag) {
				//鼠标在移动时，鼠标同时是处于按下的状态
				var now = new Array(2), dis = new Array(2);
				now[0] = e.clientX;
				now[1] = e.clientY;
				dis[0] = now[0] - needParams.currentX;
				dis[1] = now[1] - needParams.currentY;
				//console.log(now);
				//console.log(dis);
				//console.info(that.ele.style.left);
				that.ele.style.left = parseInt(needParams.left) + dis[0] + "px";
				that.ele.style.top = parseInt(needParams.top) + dis[1] + "px";		
			}
		});		
	}
}

//获取页面中的DOM节点
var alertDiv = document.getElementById("alertDiv");
var myFloatLayer = alertDiv.parentNode;
var header = document.getElementById("alertHeader");

var btnOpen = document.getElementById("btnDiv");
var btnSure = document.getElementById("btnSure");
var btnCancel = document.getElementById("btnCancel");

var myFloatDiv = new FloatLayer(myFloatLayer,alertDiv,header);

//绑定事件，兼容w3c和ie
var eventMonitor = function (myDiv,type,fn) {
	if (myDiv.addEventListener) {
		myDiv.addEventListener(type, fn);
	}else {
		myDiv.attachEvent("on" + type, fn);
	}
}

//获取某元素以浏览器左上角为原点的坐标
var getPoint = function (obj) { 
	var top = obj.offsetTop; //获取该元素对应父容器的上边距
	var left = obj.offsetLeft; //对应父容器的上边距
	//判断是否有父容器，如果存在则累加其边距
	while (obj = obj.offsetParent) {//等效 obj = obj.offsetParent;while (obj != undefined)
		top += obj.offsetTop; //叠加父容器的上边距
		left += obj.offsetLeft; //叠加父容器的左边距
	}
	return {
		top: top,
		left: left
	}
}

//定义一个方法，实现当前获取计算后的DOM属性功能
var	getCss = function(obj,key) {
	var attrValue;
	var reg = new RegExp("^[\w\W]*[%]+[\w\W]*$");

	if(obj.currentStyle) {
		if(obj.currentStyle[key].indexOf("%") !== -1) {//主要是为了兼容ie浏览器

			if(key == "left") {
				attrValue = getPoint(obj).left;
				console.info(attrValue+"left");
			}
			
			if(key == "top") {
				attrValue = getPoint(obj).top;
				console.info(attrValue+"top");
			}
		}else {
			attrValue = obj.currentStyle[key];
		}
	}else {
		attrValue = document.defaultView.getComputedStyle(obj, null)[key];
	}

	return attrValue;
}

eventMonitor(btnOpen, "click", function() {
	myFloatDiv.init();
	myFloatDiv.show();	
});

eventMonitor(btnSure, "click", function() {
	myFloatDiv.hide();
});

eventMonitor(btnCancel, "click", function() {
	myFloatDiv.hide();
});

//给alert框绑定一个click事件，阻止冒泡
eventMonitor(alertDiv, "click", function(e) {
	e.stopPropagation();
});

eventMonitor(myFloatLayer, "click", function(e) {
	myFloatDiv.hide();
});

//启用浮出层的拖拽功能
myFloatDiv.dragDiv();


