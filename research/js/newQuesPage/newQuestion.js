define(["../base/base","../floatDiv/common_floatDiv"], function(G,FloatLayer) {
	var NewQuesPage = function(config) {
		this.wrap = config.wrap;
		this.num = config.num;

		var quesTitle = G.Dom.$("newQuesHeader");
		quesTitle.value = "第" + config.num + "份问卷";
		//quesTitle.focus();

		this.addQuestType();
		this.addQuestion();
	}

	NewQuesPage.prototype = {
		constructor: NewQuesPage,

		addQuestType: function() {
			var addBtn = G.Dom.$("addQuest");
			var btnType = G.Dom.$("btnType");
			G.Eve.addEvent(addBtn,"click",function() {
				btnType.style.height = "51px";
			});			
		},

		addQuestion: function() {
			var btnType = G.Dom.$("btnType");
			var newQuesItem = function(str) {
				var floatLayer = new FloatLayer({		
					root: G.Dom.$("floatDiv"),
					isMove: true,
					isZoom: true,
					floatContent: {
									title: "新建" + str,
									content: "<p class='quesExplain'>分别在下面的框中填写问题的名称以及选项，选项用逗号‘,’分隔开。</p>"
											+ "<p class='quesTitle'><span>请输入题目：</span><input id='quesTitle' type='text' /></p>"
											+ "<p class='quesOption'><span>请输入选项：</span><input id='quesOption' type='text' /></p>"
								}					
				});

				//初始化，生成浮出层				
				floatLayer.show();

				var body = G.Dom.getElementsByClassName("newQues-body")[0];
				body.innerHTML = "<div class='newQues-item'>"
							   + "<h4>Q1 你最喜欢的水果是？</h4>"
							   + "<label class='floatRig'><input type='checkbox' />此题是否必填</label>"
							   + "<div class='newQues-options'>"
							   + "<label><input name='1' type='radio' />苹果</label>"
							   + "<label><input name='1' type='radio' />苹果</label>"
							   + "<label><input name='1' type='radio' />苹果</label>"
							   + "<label><input name='1' type='radio' />苹果</label>"
							   + "</div>"
							   + "<div class='floatRig newQues-change'>"
							   + "<input type='button' value='下移' />"
							   + "<input type='button' value='复用' />"
							   + "<input type='button' value='移除' />"
							   + "</div>"
							   + "</div>";					
			}
			console.log(btnType.children[0]);
			G.Eve.addEvent(btnType.children[0],"click",function() {
				newQuesItem("单选");
				console.log("1");
			});
		}
	}

	return NewQuesPage;
});