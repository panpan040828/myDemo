define(["../base/base","../common/common_floatDiv"], function(G,FloatLayer) {
	var QuesList = function(config) {
		this.root = config.root;
		this.num = config.num;
		this.listBody = null;
		this.init();

		this.listBody = G.Dom.getElementsByClassName("quesNaire-body")[0];
		
		var listItems = this.listBody.children;
		var listAll = G.Dom.$("list-all");
		var clearAll = G.Dom.$("clearAll");
		var newQuest = G.Dom.$("createNew");
		var listCheckbox = [];
		var that = this;

		// for (var i = 0; i < this.num; i++) {
		// 	listCheckbox.push(G.Dom.$("list-" + (i + 1)));	
		// }
		//给每个问卷的四个按钮绑定事件
		for (var i = 0; i < this.num; i++) {
						
			(function(_i) {
				var button = G.Dom.getElementsByClassName("J_quesNaire-button",listItems[_i],"input");
				var state = G.Dom.getElementsByClassName("J_quesNaire-state",listItems[_i],"div")[0];
				var checkBox = G.Dom.$("list-" + (_i + 1));
				G.Eve.addEvent(button[0],"click",function() {				
					if(state.innerText == "发布中" || state.innerText == "已结束") {
						var floatLayer = new FloatLayer({		
							root: G.Dom.$("floatDiv"),
							isMove: true,
							isZoom: true,
							floatContent: {
								title: "提示",
								content: "问卷" + (_i + 1) + "正在发布中或者已结束，不能再进行编辑！"
							},							
						});
						//初始化，生成浮出层				
						floatLayer.show();
					} else {
						alert("跳到编辑页！");
					}										
				});

				G.Eve.addEvent(button[1],"click",function(event) {
					var e = window.event || event;
					var target = e.target || e.srcElement;
					var floatLayer = new FloatLayer({		
						root: G.Dom.$("floatDiv"),
						isMove: true,
						isZoom: true,
						floatContent: {
							title: "提示",
							content: "确定要删除第" + (_i + 1) + "份问卷吗？"
						},
						_handler: function() {
							that.deleteItem(target);
						}					
					});
					//初始化，生成浮出层				
					floatLayer.show();
				});

				G.Eve.addEvent(button[2],"click",function() {					
					//alert("跳到查看问卷页！");	
					window.location.href = "newQuesPage.html";														
				});

				G.Eve.addEvent(button[3],"click",function() {					
					alert("跳到数据分析页！");															
				});

				G.Eve.addEvent(checkBox,"click",function() {					
					if(checkBox.checked == true) {
						listCheckbox.push(checkBox);
					}															
				});
			})(i);				
		}

		//给全选按钮绑定事件
		G.Eve.addEvent(listAll,"click",function() {
			listCheckbox = G.Dom.getElementsByClassName("J_checkBox");

			if(listAll.checked == true) {
				listCheckbox.forEach(function(item,index,arr) {
					return item.checked = true;
				});
			} else {
				listCheckbox.forEach(function(item,index,arr) {
					return item.checked = false;
				});
			}															
		});

		//给删除选中项的删除按钮绑定事件
		G.Eve.addEvent(clearAll,"click",function() {				
			var itemChecked = listCheckbox.filter(function(item,index,arr) {					
					return item.checked == true;
			});
			itemChecked.forEach(function(item,index,arr) {
				return that.listBody.removeChild(item.parentNode.parentNode);
			});														
		});

		//给新建问卷按钮绑定事件
		G.Eve.addEvent(newQuest,"click",function() {				
			window.location.href = "newQuesPage.html";														
		});
	}

	QuesList.prototype = {
		constructor: QuesList,

		init: function() {
			var quesHeader = document.createElement("div");
			var quesBody = document.createElement("div");
			var quesFooter = document.createElement("div");

			quesHeader.className = "quesNaire-tr quesNaire-header";
			quesHeader.innerHTML = "<div class='quesNaire-td1'></div>"
									+ "<div class='quesNaire-td2'>标题</div>"
									+ "<div class='quesNaire-td3'>时间</div>"
									+ "<div class='quesNaire-td4'>状态</div>"
									+ "<div class='quesNaire-td5'>操作"
									+ "<input id='createNew' type='button' value='+ 新建问卷'' />"
									+ "</div>";
			quesFooter.className = "quesNaire-tr quesNaire-footer";
			quesFooter.innerHTML = "<div class='quesNaire-td1'>"
									+ "<input id='list-all' type='checkbox' />"
									+ "</div>"
									+ "<div class='quesNaire-td2'>"
									+ "<label for='list-all'>全选</label>"
									+ "<input id='clearAll' type='button' value='删除' />"
									+ "</div>"
									+ "<div class='quesNaire-td3'></div>"
									+ "<div class='quesNaire-td4'></div>"
									+ "<div class='quesNaire-td5'></div>"
			quesBody.className = "quesNaire-body";
			for(var i = 1; i <= this.num; i++) {
				var quesItem = document.createElement("div");
				quesItem.className = "quesNaire-tr" + " " + "quesNaire-body-item" + i;
				quesItem.innerHTML = "<div class='quesNaire-td1'>"
									+ "<input id='list-" + i + "' type='checkbox' class='J_checkBox' />"
									+ "</div>"
									+ "<div class='quesNaire-td2'>"
									+ "<label for='list-" + i + "'>这是你的第<span>" + i
									+ "</span>份问卷</label>"
									+ "</div>"
									+ "<div class='quesNaire-td3'>2016-04-12 20:46:52</div>"
									+ "<div class='quesNaire-td4 J_quesNaire-state'>发布中</div>"
									+ "<div class='quesNaire-td5'>"
									+ "<input class='J_quesNaire-button' type='button' value='编辑'>"
									+ "<input class='J_quesNaire-button' type='button' value='删除'>"
									+ "<input class='J_quesNaire-button' type='button' value='查看问卷'>"
									+ "<input class='J_quesNaire-button' type='button' value='数据分析'>"
									+ "</div>";
				quesBody.appendChild(quesItem);
			}

			this.root.appendChild(quesHeader);
			this.root.appendChild(quesBody);
			this.root.appendChild(quesFooter);	
		},

		deleteItem: function(target) {
			this.listBody.removeChild(target.parentNode.parentNode);
		}
	}

	return {
		QuesList: QuesList
	}
});
