var DatePicker = function(wrap,startY,endY,min,max) {
	this.wrap = wrap;//日历
	this.container = null;
	this.inputText = null;
	this.date = new Date();//获得当前的日期

	this.startY = startY;//日期年份上限
	this.endY = endY;//日期年份下限
	this.startIndex = 0;
	this.selectIndex = 0;
	this.dateScope = [];

	this.min = min;//可选范围最小值
	this.max = max;//可选范围最大值

	this.init();//初始化日历插件：初始化表单，创建日历表格，显示当前日期
	
}

DatePicker.prototype = {
	constructor: DatePicker,

	//初始化方法
	init: function() {
		var that = this;

		//创建日历
		var creCalendar = function() {
			var container = document.createElement("div");
			container.className = "container";
			//创建表单
			var creForm = function() {
				var form = document.createElement("form");
				var div = document.createElement("div");
				form.name = "chooseDate";
				div.id = "selectWrap";

				var creSelect = function(str,start,end) {
					var select = document.createElement("select");

					var initDate = function(str,start,end) {
						var chooseDate = "";
						for(var i = start; i <= end; i++) {
							chooseDate += "<option>" + i + str + "</option>";
						}
						return chooseDate;
					}
					select.className = "selectDate";
					select.innerHTML = initDate(str,start,end);
					div.appendChild(select);
				};

				var creA = function(str) {
					var a = document.createElement("a");
					a.href = "javascript:;";
					if(str == "pre") {
						a.id = "preMonth";
						a.innerHTML = "&lt";
					}else {
						a.id = "nextMonth";
						a.innerHTML = "&gt";
					}
					form.appendChild(a);
				};
				creA("pre");	
				creSelect("年", that.startY, that.endY);
				creSelect("月", 1, 12);
				form.appendChild(div);
				creA("next");
				container.appendChild(form);						
			};

			//创建日历表格
			var creTable = function() {
				var table = document.createElement("table");
				var thead = document.createElement("thead");
				var tbody = document.createElement("tbody");
				var week = ["日","一","二","三","四","五","六"],dateTd
				 = "", dayNum;
				table.className = "calContent";
				thead.className = "calhead";
				tbody.className = "calbody";
				var creTd = function(i) {
					return "<td>" + i + "</td>";
				};

				var tabHead = week.map(creTd).join("");
				thead.innerHTML = tabHead;

				for( i = 0; i < 6; i++) {
				   dateTd += '<tr>';
					for( j = 1; j <= 7; j++){
					    dayNum = i*7+j;
					    dateTd += '<td id= "box' + dayNum +'">' + '</td>';
					}
					dateTd += '</tr>';
				}
				tbody.innerHTML = dateTd;
				table.appendChild(thead);
				table.appendChild(tbody);
				container.appendChild(table);
			};

			//创建确定选中按钮
			var clickSure = function() {
				var div = document.createElement("div");
				div.className = "clickButton";
				div.style.display = "none";
				div.innerHTML = "<input type='submit' id='submitDate' value='确定' />" + "<input type='submit' id='cancelDate' value='取消' />";
				container.appendChild(div);
			};
			creForm();
			creTable();
			clickSure();
			this.wrap.appendChild(container);
			that.container = container;	
		}
		
		//创建输入框
		var creInput = function() {
			var div = document.createElement("div");
			div.id = "dateInput";
			div.className = "dateInput";
			div.innerHTML = "<input class='dateInput-text' type='text' />" + "<i class='fa fa-calendar fa-lg dateInput-icon'></i>";
			this.wrap.appendChild(div);
			that.inputText = div;
		};

		creInput();
		creCalendar();

		this.selectForm(this.date);

		//显示当前月份的日历
		this.renderByDate(this.date);
		this.chooseDate();
		this.textInput();
		this.clickButton();
		this.container.style.display = "none";		
	},

	//选择日期方法
	selectForm: function(date) {
		//将选择年月日的表单控件置为当前年月
		var selectDiv = document.getElementById("selectWrap");
		var selectYear = selectDiv.children[0];
		var selectMonth = selectDiv.children[1];
		var pre = document.getElementById("preMonth");
		var next = document.getElementById("nextMonth");
		selectYear.selectedIndex = date.getFullYear() - this.startY;
		selectMonth.selectedIndex = date.getMonth();

		var that = this;
		var year = that.date.getFullYear();
		var month = that.date.getMonth();
		var day = that.date.getDate();

		eventMonitor(selectYear,"change",function(){
			year = selectYear.selectedIndex + that.startY;
			that.date = new Date(year,month,day);	
			that.renderByDate(that.date);
		});
		
		eventMonitor(selectMonth,"change",function(){
			month = selectMonth.selectedIndex;
			that.date = new Date(year,month,day);
			that.renderByDate(that.date);
		});

		eventMonitor(pre,"click",function(){
			if(selectMonth.selectedIndex > 0) {
				selectMonth.selectedIndex--;
			}else {
				selectYear.selectedIndex--;
				selectMonth.selectedIndex = 11;
			}
			month = selectMonth.selectedIndex;
			year = selectYear.selectedIndex + that.startY;
			that.date = new Date(year,month,day);
			//that.selectForm(that.date);			
			that.renderByDate(that.date);
		});

		eventMonitor(next,"click",function(){
			if(selectMonth.selectedIndex < 11) {
				selectMonth.selectedIndex++;
			}else {
				selectYear.selectedIndex++;
				selectMonth.selectedIndex = 0;
			}
			month = selectMonth.selectedIndex;
			year = selectYear.selectedIndex + that.startY;
			that.date = new Date(year,month,day);		
			that.renderByDate(that.date);
		});

	},

	chooseDate: function() {
		var tableDiv = this.container.children[1].children[1]; 
		var that = this;
		//事件委托
		eventMonitor(tableDiv,"click",function(event){
			var eve = event || window.event;
			var target = event.target || event.srcElement;
			var childName = "td";
			var dat;
			if(childName.toLowerCase() === target.tagName.toLowerCase()) {
				that.clickIndex = parseInt(target.id.replace(/[^0-9]/ig,""));
			
                that.date.setDate(that.date.getDate() + that.clickIndex - that.startIndex);
                that.startIndex = parseInt(target.id.replace(/[^0-9]/ig,""));
                console.log(that.startIndex);
                console.info(that.clickIndex);
                console.log(that.date);
                dat = new Date(that.date);

				that.container.children[2].style.display = "block";

				if(that.dateScope.length < 1) {
					that.dateScope.push(dat);
				}else if(that.dateScope.length == 1) {
					var preDate = that.dateScope[0];
					var dateNum = Math.abs(that.date - preDate) / 1000 / 60 / 60 / 24;

					if(dateNum < that.min || dateNum > that.max) {
						alert("时间跨度不在范围内！请重新选择~~");
						return;
					}else {
						that.dateScope.push(dat);
					}
				}else {
					that.dateScope.shift();
					var preDate = that.dateScope[0];
					var dateNum = Math.abs(that.date - preDate) / 1000 / 60 / 60 / 24;

					if(dateNum < that.min || dateNum > that.max) {
						alert("时间跨度不在范围内！请重新选择~~");
						return;
					}else {
						that.dateScope.push(dat);
					}
				}

				//将选择的日期进行排序
				that.dateScope.sort(function(a,b) {
					return a - b;
				});
				console.log(that.dateScope);
				that.selectForm(that.date);
				that.renderByDate(that.date);								
			}
		});
	},

	//获得选中的日期
	getDate: function(date) {
		var month = date.getMonth() + 1;
		var day = date.getDate();
		if(month < 10) {
			month = "0" + month;
		}

		if(day < 10) {
			day = "0" + day;
		}

		return date.getFullYear() + "-" + month + "-" + day;
	},

	//根据传入的日期参数改变下面的日历表格,指定具体日期，日历板上相应的日期选中
	renderByDate: function(date) {
		var eachDate = new Date(date);
		eachDate.setDate(1);
		eachDate.setDate(1 - eachDate.getDay());

		for(var i = 1; i <= 42; i++) {
			var box = document.getElementById("box" + i);
			//box.style.border = "";
			box.className = "";
			box.style.color = "";
			box.innerHTML = eachDate.getDate();

			//不是当月的月份的日期变成灰色，周末变成红色
			if(eachDate.getMonth() != date.getMonth()){
				box.style.color = "#C5C7C8";
			}else if(eachDate.getDay() == 0 || eachDate.getDay() == 6){
				box.style.color = "rgb(200, 27, 1)";
			}
		
			//选中的日期添加样式
			if(eachDate.getDate() === date.getDate() && eachDate.getMonth() === date.getMonth()) {				
				box.className = "selected";
				this.startIndex = parseInt(box.id.replace(/[^0-9]/ig,""));
			}

			if(this.dateScope.length == 1) {

				if(eachDate.getTime() == this.dateScope[0].getTime()) {				
					box.className = "selected";
					console.log("1");
				}else {
					box.className = "";
				}	
				
				this.inputText.children[0].value= this.getDate(this.dateScope[0]);
						
			}else if(this.dateScope.length == 2) {
				
				if(eachDate.getTime() === this.dateScope[0].getTime() || eachDate.getTime() === this.dateScope[1].getTime()) {				
					box.className = "selected";
					console.log("2");					
				}else if(eachDate.getTime() > this.dateScope[0].getTime() && eachDate.getTime() < this.dateScope[1].getTime()) {
					console.log("3");
					box.className = "selectedScope";
				}else {
					box.className = "";
				}
				this.inputText.children[0].value = this.getDate(this.dateScope[0]) + " — " + this.getDate(this.dateScope[1]);
			} 
			eachDate.setDate(eachDate.getDate() + 1);
		}
	},

	textInput: function() {
		var that = this;
		var inputText = this.inputText.children[0];
		var inputIcon = this.inputText.children[1];
		eventMonitor(inputText,"textInput",function(){
			that.container.style.display = "block";
		});
		eventMonitor(inputText,"focusin",function(){
			that.container.style.display = "block";
		});	
		eventMonitor(inputIcon,"click",function(){
			that.container.style.display = "block";
		});	
	},

	clickButton: function() {
		var sure = document.getElementById("submitDate");
		var cancel = document.getElementById("cancelDate");
		var that = this;
		eventMonitor(sure,"click",function(){
			that.container.style.display = "none";
		});

		eventMonitor(cancel,"click",function(){
			that.dateScope = [];
			that.date = new Date();
			that.renderByDate(that.date);
			that.inputText.children[0].value = "";
		});
	}
}

var eventMonitor = function(obj,type,fn) {
	if(obj.addEventListener) {
		obj.addEventListener(type,fn);
	}else {
		obj.attachEvent("on" + type,fn);
	}
}

var wrap = document.getElementById("dateWrap");

var mydatepicker = new DatePicker(wrap,1901,2049,3,15);

