var RankTable = function(config) {
	
		this.rowNum = config.r;
		this.colNum = config.c;
		this.th = config.th;
		this.tb = config.tb;
		this.std = config.s;
		this.names = [];
		this.curData = [];

		this.init();
		this.fixedTop();
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
					//console.info(that.tb);
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
					//console.info(that.tb);
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
		//console.log(data);
		var tb = "";
		for(var i = 0; i < data.length; i++) {
			//var name = this.names[i];
			//tb += "<tr>" + fn(name);
			tb += data[i].map(fn).join("") + "</tr>";
			//console.log(tb);
		}
		myTable.children[1].innerHTML =  tb ;	
	},

	fixedTop: function() {
		var getTop = function() {
			if(document.body.scrollTop) {
				return document.body.scrollTop;
			}else {
				return document.documentElement.scrollTop;
			}
		};

		var getoffsetTop = function(obj) {
			var top = obj.offsetTop;
			if(obj.offsetParent != null) {
				top += getoffsetTop(obj.offsetParent);
			}
			return top;
		};

		var offTop = getoffsetTop(myTable.children[0]);
		var offHeight = myTable.offsetHeight;
		window.onscroll = function() {
			if(getTop() > offTop && getTop() < (offTop + offHeight)) {
				myTable.children[0].style.position = "fixed";
			}else {
				myTable.children[0].style.position = "relative";
			}

		}
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
			["小亮","60","100","70","230"],
			["小亮","60","100","70","230"],
			["小亮","60","100","70","230"],
			["小亮","60","100","70","230"],
			["小亮","60","100","70","230"],
			["小亮","60","100","70","230"],
			["小亮","60","100","70","230"],
			["小亮","60","100","70","230"],
			["小亮","60","100","70","230"],
			["小亮","60","100","70","230"]
		],			
	s: []//配置哪一列可以排序
}

//根据提供的config信息生成一个表格
var newTable = new RankTable(config);
