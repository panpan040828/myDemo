var RankTable = function(config) {
	
		this.rowNum = config.r;//表格行数
		this.colNum = config.c;//表格列数
		this.th = config.th;//表格头信息
		this.tb = config.tb;//表格内容信息
		this.std = config.s;//可进行排序的列号

		this.init();
}

RankTable.prototype = {
	constructor: RankTable,

	//初始化表格的方法
	init: function() {//arr是表格中的每一行数据，s是可以排序的列号		
		this.addThead(this.std);
		this.addTbody(this.tb);
	},

	addThead: function(s) {
		function fn(con) {
			return "<td>" + con + "</td>";
		}

		var th = this.th.map(fn).join("");
		myTable.children[0].innerHTML = "<tr>" + th + "</tr>";

		var that = this;

		var addArrow = function(index) {
			var sortBut = document.createElement("div");
			sortBut.className = "sort-button";
			var arrowUp = function(index) {
				var arrUp = document.createElement("div");
				arrUp.className = "triangle-up";
				eventMonitor(arrUp,"click",function() {
					that.tb.sort(function(a,b) {
						return a[index] - b[index];
					});
					console.info(that.tb);
					that.addTbody(that.tb);
				});
				return arrUp;
			}

			var arrowDown = function(index) {
				var arrDown = document.createElement("div");
				arrDown.className = "triangle-down";
				eventMonitor(arrDown,"click",function() {
					that.tb.sort(function(a,b) {
						return b[index] - a[index];
					});
					console.info(that.tb);
					that.addTbody(that.tb);
				});
				return arrDown;
			}
			sortBut.appendChild(arrowUp(index));
			sortBut.appendChild(arrowDown(index));
			return sortBut;
		}

		for(var i = 0; i < this.th.length; i++) {
			for(var j = 0; j < s.length; j++) {
				if(s[j] == i) {
					myTable.children[0].children[0].children[i].appendChild(addArrow(i));					
				}
			}
		}
	},

	addTbody: function(data) {
		function fn(con) {
			return "<td>" + con + "</td>";
		}
		console.log(data);
		var tb = "";
		for(var i = 0; i < data.length; i++) {
			tb += data[i].map(fn).join("") + "</tr>";
			console.log(tb);
		}
		myTable.children[1].innerHTML =  tb ;	
	},

}

var eventMonitor = function(obj,type,fn) {
	if(obj.addEventListener) {
		obj.addEventListener(type,fn);
	}else {
		obj.attachEvent("on" + type,fn);
	}
}

var myTable = document.getElementById("myTable");
var config = {
	r: 4,
	c: 5,
	th: ["姓名","语文","数学","英语","总分"],
	tb: [
			["小红","90","60","90","240"],
			["小明","80","90","70","240"],
			["小亮","60","100","70","230"]
		],			
	s: [1,2]//配置哪一列可以排序
}

//根据提供的config信息生成一个表格
var newTable = new RankTable(config);
