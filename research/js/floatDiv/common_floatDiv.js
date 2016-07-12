/**
 * [浮出层的构造函数]
 * @param {object} config [description]
 * 
 */
define(["../base/base"], function(GLOBAL) {
	var FloatLayer = function(config) {
		this.popupBtn = config.popupBtn;
		this.root = config.root;
		this.isMove = config.isMove || true;
		this.isZoom = config.isZoom || true;	
		this._handler = config._handler;
		this.floatContent = config.floatContent;
		this._alertDiv = {};
		this.params = {
			left: 0,
			top: 0,
			width: 0,
			height: 0,
			currentX: 0,
			currentY: 0,
			flag: false
		};
		
		this.init();

		this.btnEvent();				
			

		if(this.isMove == true) {
			this.dragDiv();
		};

		if(this.isZoom == true) {
			this.resizeDiv();
		}
							
			
	}
	

	FloatLayer.prototype = {
		constructor: FloatLayer,
		//初始化
		init: function() {
			
			var alertDiv = document.createElement("div");
			alertDiv.className = "alert";
			alertDiv.id = "alertDiv";
			alertDiv.style.visibility = "hidden";

			alertDiv.innerHTML = "<div id='alertHeader' class='alert-header'>" 
								+ "</div>"
								+ "<div id='alertBody' class='alert-body'>"
								+ "</div>"
								+ "<div class='alert-footer'>"
								+ "<input id='btnSure' class='alert-button' type='submit' value='确认' />"
								+ "<input id='btnCancel' class='alert-button' type='submit' value='取消' />"
								+ "</div>"
								+ "<div id='resizeRig' class='resize-right'></div>"
								+ "<div id='resizeBot' class='resize-bottom'></div>"
								+ "<div id='resizeDiv' class='resize-div'></div>";
			this.root.appendChild(alertDiv);

			var elehead = GLOBAL.Dom.$("alertHeader");
			var elebody = GLOBAL.Dom.$("alertBody");
			var resizeRig = GLOBAL.Dom.$("resizeRig");
			var resizeBot = GLOBAL.Dom.$("resizeBot");
			var resizeDiv = GLOBAL.Dom.$("resizeDiv");
			var btnSure = GLOBAL.Dom.$("btnSure");
			var btnCancel = GLOBAL.Dom.$("btnCancel");
			this._alertDiv = {
				wrap: alertDiv,
				head: elehead,
				body: elebody,
				resizeRig: resizeRig,
				resizeBot: resizeBot,
				resizeDiv: resizeDiv,
				btnSure: btnSure,
				btnCancel: btnCancel
			};	
			console.log("1");		
		},

		//初始化弹出框的内容
		initContent: function() {
			var alertDiv = this._alertDiv;
			var title = this.floatContent.title;
			var content = this.floatContent.content;			
			alertDiv.head.innerHTML = title;
			alertDiv.body.innerHTML = content;	
			console.log("init");	
		},

		//初始化弹出框的位置和长宽
		initSize: function() {
			var alertWrap = this._alertDiv.wrap;
			alertWrap.style.left = "";
			alertWrap.style.top = "";
			alertWrap.style.width = "";
			alertWrap.style.height = "";
		},

		//弹出框出现
		show: function() {	
			this.initContent();
			this.initSize();
			var that = this.root;		
			var alert = this._alertDiv.wrap;
			that.style.visibility = "visible";
			setTimeout(function(){
				alert.style.visibility = "visible";
				alert.style.transition = "transform 200ms linear";
				alert.style.transform = 'translate(-50%, -50%) scale(1,1)';
			}, 200);				
		},

		//弹出框隐藏
		hide: function() {
			var that = this.root;
			console.info(this);
			var alert = this._alertDiv.wrap;	
			alert.style.transition = "transform 200ms linear";
			alert.style.transform = 'translate(-50%, -50%) scale(0,0)';
			alert.style.visibility = "hidden";				
			setTimeout(function(){
				that.style.visibility = "hidden";
			}, 200);
			//console.log(that);
			that.removeChild(alert);
			//console.log(that);
		},

		//定义一个方法，实现拖拽功能
		dragDiv: function() {
			var needParams = this.params;
			var alert = this._alertDiv.wrap;
			var eleHead = this._alertDiv.head;			
			this.dynamic(eleHead,alert,"left",needParams);
			this.dynamic(eleHead,alert,"top",needParams);
				
		},

		//实现扩大缩小弹出框
		resizeDiv: function() {
			var needParams = this.params;
			var alert = this._alertDiv.wrap;
			var eleRig = this._alertDiv.resizeRig;
			var eleBot = this._alertDiv.resizeBot;
			var eleDiv = this._alertDiv.resizeDiv;
			this.dynamic(eleRig,alert,"width",needParams);
			this.dynamic(eleBot,alert,"height",needParams);
			this.dynamic(eleDiv,alert,"width",needParams);
			this.dynamic(eleDiv,alert,"height",needParams);
		},

		//实现拖拽和放大缩小功能
		dynamic: function(bar,target,attr,par) {
					var startDrag = function(event) {
						var e = event ? event: window.event;
						if(par.flag) {
							//鼠标在移动时，鼠标同时是处于按下的状态
							var now = new Array(2), dis = new Array(2);
							now[0] = e.clientX;
							now[1] = e.clientY;
							dis[0] = now[0] - par.currentX;
							dis[1] = now[1] - par.currentY;

							if(attr == "left" || attr == "width") {
								target.style[attr] = parseInt(par[attr]) + dis[0] + "px";
							}else {
								target.style[attr] = parseInt(par[attr]) + dis[1] + "px";
							}							
						}
					}

					var stopDrag = function() {
						par.flag = false;//鼠标释放
						par[attr] = GLOBAL.Dom.getCssAttr(target, attr);//获取此时的样式值
						if(bar.releaseCapture) {
							bar.onmousemove = null;
							bar.onmouseup = null;
							bar.releaseCapture();
						}else {
							GLOBAL.Eve.removeEvent(document,"mousemove",startDrag);
							GLOBAL.Eve.removeEvent(document,"mouseup",stopDrag);
						}				
					}

					GLOBAL.Eve.addEvent(bar, "mousedown", function(event) {

						//首先获取当前的Div的left，right值存放起来
						par[attr] = GLOBAL.Dom.getCssAttr(target, attr);
					
						var e = event ? event: window.event;
						//鼠标按下，记录当前鼠标所在的位置
						par.flag = true;
						par.currentX = e.clientX;
						par.currentY = e.clientY;
						//ie中才有setCapture
						if(bar.setCapture) {										
							GLOBAL.Eve.addEvent(bar, "mousemove", startDrag);
							GLOBAL.Eve.addEvent(bar, "mouseup", stopDrag);
							bar.setCapture();
						}else {										
							GLOBAL.Eve.addEvent(document, "mousemove", startDrag);
							GLOBAL.Eve.addEvent(document, "mouseup", stopDrag);
						}
					});		
		},

		btnEvent: function() {

			//给按钮绑定事件
			var that = this;

			//用这种方式绑定事件只会执行一次绑定事件里面的回调函数
			that.root.onclick = function() {
				that.hide();
			}

			//阻止弹出框上的点击事件冒泡到浮出层上
			GLOBAL.Eve.addEvent(that.root.children[0],"click",function(e) {
				e.stopPropagation();
			});	

			GLOBAL.Eve.addEvent(that._alertDiv.btnSure,"click",function() {
				that.hide();
				if(that._handler) {
					that._handler();
				}
			});

			GLOBAL.Eve.addEvent(that._alertDiv.btnCancel,"click",function() {
				that.hide();
			});
		}
	}
	return FloatLayer;
});
