(function() {
	var DatePicker = function(container,i,startY,endY) {
		this.container = container;
		this.i = i; 
		this.date = new Date();
		this.year = 0;
		this.month = 0;
		this.day = 0;
		this.startY = startY;//日期年份上限
		this.endY = endY;//日期年份下限
		this.selectIndex = 0;

		this.init();//初始化日历插件：初始化表单，创建日历表格，显示当前日期
		
	}

	DatePicker.prototype = {
		constructor: DatePicker,

		//初始化方法
		init: function() {
			var that = this;
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
				this.container.appendChild(form);
				
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

				for( i = 0; i < 5; i++) {
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
				this.container.appendChild(table);
			};
			creForm();
			creTable();

			//获得当前日期
			this.year = this.date.getFullYear();
			this.month = this.date.getMonth();
			this.day = this.date.getDate();

			this.selectForm(this.startY,this.year,this.month);

			//显示当前月份的日历
			this.renderByDate(this.year,this.month,this.day);
			this.preMonth();
			this.nextMonth();
			this.chooseDate();
			this.textInput();
			this.container.style.display = "none";		
		},

		//选择日期方法
		selectForm: function(start,year,month) {
			//将选择年月日的表单控件置为当前年月
			var selectDiv = document.getElementById("selectWrap");
			var selectYear = selectDiv.children[0];
			var selectMonth = selectDiv.children[1];
			selectYear.selectedIndex = year - this.startY;
			selectMonth.selectedIndex = month;

			var that = this;
			GLOBAL.eventMonitor(selectYear,"change",function(){
				that.year = selectYear.selectedIndex + start;		
				that.renderByDate(that.year,that.month,that.day);
			});
			
			GLOBAL.eventMonitor(selectMonth,"change",function(){
				that.month = selectMonth.selectedIndex;
				that.renderByDate(that.year,that.month,that.day);
			});
		},

		preMonth: function() {
			var pre = document.getElementById("preMonth");
			var that = this;
			GLOBAL.eventMonitor(pre,"click",function(){
				if(that.month > 0) {
					that.month--;
				}else {
					that.year--;
					that.month = 11;
				}
				that.selectForm(that.startY,that.year,that.month);			
				that.renderByDate(that.year,that.month,that.day);

			});
		},

		nextMonth: function() {
			var next = document.getElementById("nextMonth");
			var that = this;
			GLOBAL.eventMonitor(next,"click",function(){
				if(that.month < 11) {
					that.month++;
				}else {
					that.year++;
					that.month = 0;
				}
					
				that.selectForm(that.startY,that.year,that.month);		
				that.renderByDate(that.year,that.month,that.day);

			});
		},

		chooseDate: function() {
			var tableDiv = this.container.children[1].children[1]; 
			var that = this;
			//事件委托
			GLOBAL.eventMonitor(tableDiv,"click",function(event){
				var eve = event || window.event;
				var target = event.target || event.srcElement;
				var childName = "td";

				if(childName.toLowerCase() === target.tagName.toLowerCase()) {
					var index = parseInt(target.id.replace(/[^0-9]/ig,""));
					console.log(index);
					console.log(that.selectIndex);
					//that.day = parseInt(target.innerHTML);
					var dat = new Date(that.year,that.month,that.day);
					
	                dat.setDate(dat.getDate() + index - that.selectIndex);
	                console.log(dat);
	                that.month = dat.getMonth();
	                that.day = dat.getDate();               
					that.renderByDate(that.year,that.month,that.day);
					that.i.children[0].value = that.getDate();
					that.container.style.display = "none";				
				}
				console.log([that.year,that.month,that.day]);

			});
		},

		getDate: function() {
			return this.year + "年" + (this.month+1) + "月" + this.day + "日";
		},

		//根据传入的日期参数改变下面的日历表格,指定具体日期，日历板上相应的日期选中
		renderByDate: function(year,month,day) {
			var eachDate = new Date(year,month,day);
			eachDate.setDate(1);
			eachDate.setDate(1 - eachDate.getDay());

			for(var i = 1; i < 36; i++) {
				var box = document.getElementById("box" + i);
				box.style.border = "";
				box.style.color = "";

				box.innerHTML = eachDate.getDate();


				if(eachDate.getMonth() != month){
					box.style.color = "#C5C7C8";
				}else if(eachDate.getDay() == 0 || eachDate.getDay() == 6){
					box.style.color = "rgb(200, 27, 1)";
				}

				if(eachDate.getDate() === day && eachDate.getMonth() === month){				
					box.style.border = "1px rgb(200, 27, 1) solid";
					this.selectIndex = parseInt(box.id.replace(/[^0-9]/ig,""));
				}
				eachDate.setDate(eachDate.getDate() + 1);
			}
		},

		textInput: function() {
			var that = this;
			var inputText = this.i.children[0];
			var inputIcon = this.i.children[1];
			GLOBAL.eventMonitor(inputText,"textInput",function(){
				that.container.style.display = "block";
			});
			GLOBAL.eventMonitor(inputText,"focusin",function(){
				that.container.style.display = "block";
			});	
			GLOBAL.eventMonitor(inputIcon,"click",function(){
				that.container.style.display = "block";
			});	
		}
	}

	// var eventMonitor = function(obj,type,fn) {
	// 	if(obj.addEventListener) {
	// 		obj.addEventListener(type,fn);
	// 	}else {
	// 		obj.attachEvent("on" + type,fn);
	// 	}
	// }

	var wrap = document.getElementById("container");
	var input = document.getElementById("dateInput");
	var mydatepicker = new DatePicker(wrap,input,1901,2049);
})();



