//浮出层的构造函数
function FloatLayer(ele,wrap) {
	this.ele = ele;
	this.wrap = wrap;
}

FloatLayer.prototype = {
	constructor: FloatLayer,
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
	}

}

//获取页面中的DOM节点
var alertDiv = document.getElementById("alertDiv");
var myFloatLayer = alertDiv.parentNode;
console.log(alertDiv);
var btnOpen = document.getElementById("btnDiv");
var btnSure = document.getElementById("btnSure");
var btnCancel = document.getElementById("btnCancel");

var myFloatDiv = new FloatLayer(alertDiv,myFloatLayer);

//绑定事件，兼容w3c和ie
function eventMonitor(myDiv,type,fn) {
	if (myDiv.addEventListener) {
		myDiv.addEventListener(type, fn);
	}else {
		myDiv.attachEvent("on" + type, fn);
	}
}

eventMonitor(btnOpen, "click", function() {
	myFloatDiv.show();
});

eventMonitor(btnSure, "click", function() {
	myFloatDiv.hide();
});

eventMonitor(btnCancel, "click", function() {
	myFloatDiv.hide();
});


