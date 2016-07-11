var GLOBAL = {};

GLOBAL.namespace = function() {
	var arr = str.split(","), o = GLOBAL;
	for(i=(arr[0] = "GLOBAL") ? 1 : 0; i < arr.length; i++) {
		o[arr[i]] = o[arr[i]] || {};
		o = o[arr[i]];
	}
};

GLOBAL.eventMonitor = function(obj,type,fn) {
	if(obj.addEventListener) {
		obj.addEventListener(type,fn);
	}else {
		obj.attachEvent("on" + type,fn);
	}
}