/*获取游戏表格，存放在TrTd这个二维数组里*/
var gameTable = document.getElementById("tableBody");
var tableTR = gameTable.children;
var wall={
		"position":[]
	}
/*创建一个二维数组*/
var TrTd = new Array(10);
for(var a = 0;a<10;a++)
{
		TrTd[a] = new Array(10);
}

/*每次运行之前都要把td的class清空*/
for(var i = 0;i<10;i++)
{
		var tableTd=tableTR[i].children;
		for(var j=0;j<10;j++)
		{
			TrTd[i][j] = tableTd[j];
			//TrTd[i][j].className = "";
		}
}

/*游戏开始时，方块的位置*/
function init(){
	//var col =parseInt(Math.random()*9+1);
	//var row =parseInt(Math.random()*9+1);
	var col = 5;
	var row = 5;
	var colorBlock = document.getElementById("corBlock");	

	var rotateObj = colorBlock.style.transform;	
	var bottom = parseFloat(colorBlock.style.bottom);
	var left = parseFloat(colorBlock.style.left);

	colorBlock.style.bottom =(bottom + (10-row)*45) + "px";
	colorBlock.style.left = (left + (col-1)*45) + "px";

	codeNumDisplay();
}

window.onload = init();

/*根据蓝色面的方向前进*/
function GoByBlue(i){
		var colorBlock = document.getElementById("corBlock");	
		var rotateObj = colorBlock.style.transform;
		var pre = parseFloat(rotateObj.substring(rotateObj.indexOf("(")+1,rotateObj.indexOf(")"))); 

		switch(pre){
					case 0:GO("up",45*i,9);	
							break;
					case 90:GO("right",45*i,9);								
							break;
					case -90:GO("left",45*i,9);								
							break;
					case 180:GO("bottom",45*i,9);								
							break;
					case -180:GO("bottom",45*i,9);								
							break;
					case 270:GO("left",45*i,9);								
							break;
					case -270:GO("right",45*i,9);								
							break;
					default:GO("up",45*i,9);								
					}
}

/*前进，R和C分别是到达的行和列*/
function GO(direct,s,step){	

		var colorBlock = document.getElementById("corBlock");	

		var rotateObj = colorBlock.style.transform;	
		var bottomObj = colorBlock.style.bottom;
		var leftObj = colorBlock.style.left;

		var pre = parseFloat(rotateObj.substring(rotateObj.indexOf("(")+1,rotateObj.indexOf(")"))); 
		var bottom = parseFloat(bottomObj.substring(0,bottomObj.indexOf("p"))); 
		var left = parseFloat(leftObj.substring(0,leftObj.indexOf("p"))); 

		var interval = 20;	
		//var s = 45;//每次移动的距离
		//var step = 9;//每调用一次goUp移动的像素	
		var speed = s/step;

		function goUp(){
			

				if((bottom + s) > 450)
				{
					colorBlock.style.bottom = 450 + "px"; 
				}
				else if((bottom + s) < 45)
				{
					colorBlock.style.bottom = 45 + "px"; 
				}
				else
				{
					if( parseFloat(colorBlock.style.bottom) < (bottom + s))
					{
						//console.log(parseFloat(colorBlock.style.bottom));
						colorBlock.style.bottom = parseFloat(colorBlock.style.bottom)+ speed +"px";
						setTimeout(goUp,interval);//只会执行一次				
					}
				}
							
		}
		
		function goDown(){		
				if((bottom - s) > 450)
				{
					colorBlock.style.bottom = 450 + "px"; 
				}
				else if((bottom - s) < 45)
				{
					colorBlock.style.bottom = 45 + "px"; 
				}
				else
				{
					if( parseFloat(colorBlock.style.bottom) > (bottom - s))
					{
						//console.log(parseFloat(colorBlock.style.bottom));
						colorBlock.style.bottom = parseFloat(colorBlock.style.bottom) - speed +"px";
						setTimeout(goDown,interval);//只会执行一次				
					}
				}
				
			}
		

		function goLeft(){
			if((left - s) > 454)
			{
					colorBlock.style.left = 454 + "px"; 
			}
			else if((left - s) < 49)
			{
					colorBlock.style.left = 49 + "px"; 
			}
			else
			{
				if( parseFloat(colorBlock.style.left) > (left - s))
				{
					//console.log(parseFloat(colorBlock.style.left));
					colorBlock.style.left = parseFloat(colorBlock.style.left) - speed +"px";
					setTimeout(goLeft,interval);//只会执行一次				
				}
			}
						
		}

		function goRight(){
			if((left + s) > 454)
			{
					colorBlock.style.left = 454 + "px"; 					
			}
			else if((left + s) < 49)
			{
					colorBlock.style.left = 49 + "px"; 
			}
			else
			{
				if( parseFloat(colorBlock.style.left) < (left + s))
				{
				//console.log(parseFloat(colorBlock.style.left));
				colorBlock.style.left = parseFloat(colorBlock.style.left) + speed +"px";
				setTimeout(goRight,interval);//只会执行一次				
				}
			}
			
		}
		
		switch(direct)
		{
			case "up":				
				goUp();		
				break;

			case "right":
				goRight();				
				break;

			case "left":
				goLeft();			
				break;

			case "down":
				goDown();			
				break;
		}	
		
}

/*旋转到某一个角度，d是要旋转到的角度，step是旋转的步数*/
function rotateTo(d,step){
		var colorBlock = document.getElementById("corBlock");	
		var rotateObj = colorBlock.style.transform;
		var pre = parseFloat(rotateObj.substring(rotateObj.indexOf("(")+1,rotateObj.indexOf(")"))); 
		
		var interval = 20;	
		var dt = (Math.abs(d-pre))/step;

		function rotateR(){
			
			var rotateObjR = colorBlock.style.transform;
			
			var preR = parseFloat(rotateObjR.substring(rotateObj.indexOf("(")+1,rotateObj.indexOf(")")));
			console.log(rotateObjR);
			console.log(preR);
			if( preR < d)
			{								   
				colorBlock.style.transform = "rotate(" + (preR +dt) + "deg)";
				console.log(preR +dt);						
				setTimeout(rotateR,interval);//只会执行一次		
			}
		}

		function rotateL(){
			var rotateObjL = colorBlock.style.transform;
			var preL = parseFloat(rotateObjL.substring(rotateObjL.indexOf("(")+1,rotateObjL.indexOf(")")));
			if( preL > d)
			{	

				colorBlock.style.transform = "rotate(" + (preL-dt) + "deg)";
				setTimeout(rotateL,interval);//只会执行一次

			}
		}
			

		if(d > pre)
		{
			rangeR(rotateR);
			
			
			
		}
		else
		{
			rotateL();			
		}
		
}

/*控制旋转的角度为-360~360之间*/
var rangeR = function(r){
			var colorBlock = document.getElementById("corBlock");	
			var rotateObj = colorBlock.style.transform;
			var preR = parseFloat(rotateObj.substring(rotateObj.indexOf("(")+1,rotateObj.indexOf(")")));
			//console.log(preR);
			if(preR>=360 || preR<=-360)
			{				
				colorBlock.style.transform = "rotate(" + (preR%360)+ "deg)";
			}			

			if(r)
			{
				r();
			}
			
}

/*删除显示代码的block*/
function removeBlock(obj)
{
	   
	while(obj.hasChildNodes()) //当div下还存在子节点时 循环继续
	{
		obj.removeChild(obj.firstChild);
	}
}

/*获取输入代码的行数，显示在左边*/
function codeNumDisplay(){
	var codeInput = document.getElementById("input");
	var numDisplay = document.getElementById("numDiv");
	
	var top = codeInput.scrollTop;

	codeInput.oninput = function(){		
		var inputValue = codeInput.value;
		var codeContent = inputValue.split("\n");
		var codeNum = inputValue.split("\n").length;
		var numTd = [];
		
		removeBlock(numDisplay);
		for(var i=0;i < codeNum;i++)
		{
			var TR = document.createElement("tr");
			var TD = document.createElement("td");
			numTd.push(numDisplay.appendChild(TR).appendChild(TD));
			numTd[i].innerHTML = i + 1;
			
		}    			
	}

	/*给文本框添加滚动条监听事件，让文本框的scrollTop和显示代码行数的div的滚动条的scrollTop相等*/
	codeInput.onscroll = function(){
		var top = codeInput.scrollTop;
		console.log(top);
		numDisplay.parentNode.parentNode.scrollTop = top;
	}
}

/*游戏的每种指令对应的操作*/
function startBycode(c,con,n){
			rangeR();
			if(isNaN(c))//如果指令中没有数字
			{
				switch(con){
					case "GO":
						{
						  GoByBlue(1);					  										
						  break;
						};

					case "TUN LEF":
						{
						  
						  var colorBlock = document.getElementById("corBlock");	
						  var rotateObj = colorBlock.style.transform;
						  var pre = parseFloat(rotateObj.substring(rotateObj.indexOf("(")+1,rotateObj.indexOf(")"))); 
						  var newRotate = pre - 90;
						  rotateTo(newRotate,10);				  										
						  break;
						};

					case "TUN RIG":
						{
						  var colorBlock = document.getElementById("corBlock");	
						  var rotateObj = colorBlock.style.transform;
						  var pre = parseFloat(rotateObj.substring(rotateObj.indexOf("(")+1,rotateObj.indexOf(")"))); 
						  var newRotate = pre + 90;
						  console.info(newRotate);
						  rotateTo(newRotate,10);					  										
						  break;
						};

					case "TUN BAC":
						{
						  var colorBlock = document.getElementById("corBlock");	
						  var rotateObj = colorBlock.style.transform;
						  var pre = parseFloat(rotateObj.substring(rotateObj.indexOf("(")+1,rotateObj.indexOf(")"))); 
						  var newRotate = pre + 180;
						  rotateTo(newRotate,10);				  										
						  break;
						};

					case "TRA LEF":
						{
						  GO("left",45,9);					  										
						  break;
						};	
						
					case "TRA TOP":
						 {		 				 	
							GO("up",45,9);
							break;
						 };
					case "TRA RIG":
						 {			 	
							GO("right",45,9);
							break;
						 };
					case "TRA BOT":
						 {			 	
							GO("down",45,9);
							break;
						 };
					case "MOV LEF":
						 {			 	
							GO("left",45,9);
							rotateTo(-90,10);
							break;
						 };
					case "MOV TOP":
						 {			 	
							GO("up",45,9);
							rotateTo(0,10);
							break;
						 };
					case "MOV RIG":
						 {			 	
							GO("right",45,9);
							rotateTo(90,10);
							break;
						 };
					case "MOV BOT":
						 {			 	
							GO("down",45,9);
							var colorBlock = document.getElementById("corBlock");	
							var rotateObj = colorBlock.style.transform;
							var pre = parseFloat(rotateObj.substring(rotateObj.indexOf("(")+1,rotateObj.indexOf(")"))); 
							if(pre >= 0)
							{
								rotateTo(180,10);
							}
							else
							{
								rotateTo(-180,10);
							}
							break;
						 };
					case "BUILD":
						 {
						 	wallOper("build");
						 	break;
						 };
					default:
						n.firstChild.style.background = "red";
				}
			}
			else
			{
				var num = con.replace(/[^0-9]/ig,"");//获得指令中的数字 						
				var str = con.replace(num,"");//获得指令中的字符
				switch(str){
					case "GO ":
						{
						  GoByBlue(num);					  										
					 	  break;
						};
									
					case "TRA LEF ":
						{
						  GO("left",45*num,9);					  										
						  break;
						};	
						
					case "TRA TOP ":
						 {		 				 	
							GO("up",45*num,9);
							break;
						 };
					case "TRA RIG ":
						 {			 	
							GO("right",45*num,9);
							break;
						 };
					case "TRA BOT ":
						 {			 	
							GO("down",45*num,9);
							break;
						 };
					case "MOV LEF ":
						 {			 	
							GO("left",45*num,9);
							rotateTo(-90,10);
							break;
						 };
					case "MOV TOP ":
						 {			 	
							GO("up",45*num,9);
							rotateTo(0,10);
							break;
						 };
					case "MOV RIG ":
						 {			 	
							GO("right",45*num,9);
							rotateTo(90,10);
							break;
						 };
					case "MOV BOT ":
						 {			 	
							GO("down",45*num,9);
							var colorBlock = document.getElementById("corBlock");	
							var rotateObj = colorBlock.style.transform;
							var pre = parseFloat(rotateObj.substring(rotateObj.indexOf("(")+1,rotateObj.indexOf(")"))); 
							if(pre >= 0)
							{
								rotateTo(180,10);
							}
							else
							{
								rotateTo(-180,10);
							}
							break;
						 };
					default:
						n.firstChild.style.background = "red";

				} 
			}

}	

/*根据游戏的几种指令来做出相应的变化*/
function startGame(){
	
	var codeInput = document.getElementById("input");
	var numDisplay = document.getElementById("numDiv");
	var inputValue = codeInput.value;
	var codeContent = inputValue.split("\n");
	var codeNum = inputValue.split("\n").length;
	var numTr = numDisplay.children;
	var i = 0;

	var timer = setInterval(function(){
		if(i < codeNum)
		{
				
				var lastChar = codeContent[i].substring(codeContent[i].length-1,codeContent[i].length);
				var firstThreeC = codeContent[i].substring(0,3);
				var firstSixC = codeContent[i].substring(0,6);
				if(firstThreeC == "BRU")
				{
					rangeR();
					var corChar = codeContent[i].substring(4);
					wallOper(corChar);
				}
				else if(firstSixC == "MOV TO")
				{
					rangeR();					
					set(1,getBoxSPos());
					set(2,getBoxEPos(codeContent[i]));
					//console.log(wall["position"]);
					set(3,wall["position"]);
					setPos();
					main();

				}
				else
				{
					rangeR();
					startBycode(lastChar,codeContent[i],numTr[i]);
				}
				
				console.log(codeContent[i]);
				i++;															
		}
		else
		{	
				clearInterval(timer);
		}

	},400);
			

	//console.log(codeContent[i]);	
		
}

/*删除文本框里面的代码*/
function clearAll(){
	var codeInput = document.getElementById("input");
	codeInput.value = "";
	var numDisplay = document.getElementById("numDiv");
	removeBlock(numDisplay);
}

/*得到当前彩色块的行和列*/
function getNowRC(){
		var nodeTd = document.getElementById("corBlock").parentNode;
		var nodeTr = nodeTd.parentNode;
		var index = new Array(2);
		if(nodeTd){		
			index[0] = nodeTr.rowIndex + 1;
			index[1] = nodeTd.cellIndex + 1;
		}
		//console.log(index);
		return index;
}

/*关于墙的函数，若传入的参数为build，则修一座墙；若传入的参数为颜色，则为墙粉刷这个颜色*/
function wallOper(code){
	var colorBlock = document.getElementById("corBlock");
	
	var rotateObj = colorBlock.style.transform;	
	var bottom = parseFloat(colorBlock.style.bottom);
	var left = parseFloat(colorBlock.style.left);
	var pre = parseFloat(rotateObj.substring(rotateObj.indexOf("(")+1,rotateObj.indexOf(")"))); 

	var rowNum = 10 -(bottom - 45)/45;
	var colNum = (left -49)/45 + 1;

	

	function buildWall(){
			
		switch(pre){
						case 0:					
								buildInfront(rowNum-2,colNum-1);
								wall["position"].push(rowNum-2);
								wall["position"].push(colNum-1);
								//TrTd[rowNum-2][colNum-1].className = "greyBlock";
								break;
						case 90:
								buildInfront(rowNum-1,colNum);
								wall["position"].push(rowNum-1);
								wall["position"].push(colNum);
								//TrTd[rowNum-1][colNum].className = "greyBlock";								
								break;
						case -90:
								buildInfront(rowNum-1,colNum-2);
								wall["position"].push(rowNum-1);
								wall["position"].push(colNum-2);
								//TrTd[rowNum-1][colNum-2].className = "greyBlock";								
								break;
						case 180:
								buildInfront(rowNum,colNum-1);
								wall["position"].push(rowNum);
								wall["position"].push(colNum-1);
								//TrTd[rowNum][colNum-1].className = "greyBlock";								
								break;
						case -180:
								buildInfront(rowNum,colNum-1);
								wall["position"].push(rowNum);
								wall["position"].push(colNum-1);
								//TrTd[rowNum][colNum-1].className = "greyBlock";							
								break;								
					}


	}


	function burColor(){		

		switch(pre){
						case 0:					
								corInfront(rowNum-2,colNum-1,code);
								//TrTd[rowNum-2][colNum-1].className = "greyBlock";
								break;
						case 90:
								corInfront(rowNum-1,colNum,code);
								//TrTd[rowNum-1][colNum].className = "greyBlock";								
								break;
						case -90:
								corInfront(rowNum-1,colNum-2,code);
								//TrTd[rowNum-1][colNum-2].className = "greyBlock";								
								break;
						case 180:
								corInfront(rowNum,colNum-1,code);
								//TrTd[rowNum][colNum-1].className = "greyBlock";								
								break;
						case -180:
								corInfront(rowNum,colNum-1,code);
								//TrTd[rowNum][colNum-1].className = "greyBlock";							
								break;								
					}
	}
	
	if(code == "build")
	{
		buildWall();
		console.log("1");
	}
	else
	{
		burColor();
		//alert("1");
	}

}

function buildInfront(r,c){

			/*每次运行之前都要把td的class清空
			for(var i = 0;i<10;i++)
			{
				for(var j=0;j<10;j++)
				{					
					TrTd[i][j].className = "";
				}
			}*/

			if(r <= 10 && r >= 0 && c <= 10 && c >= 0)
			{
				TrTd[r][c].className = "greyBlock";
			}
			else
			{
				console.log("已到边界，无法修墙！");
			}

}

function corInfront(r,c,cor){
			if(r <= 10 && r >= 0 && c <= 10 && c >= 0)
			{
				if(TrTd[r][c].className == "greyBlock")
				{
					TrTd[r][c].style.background = cor;
					console.log(TrTd[r][c].style.background);
				}
				else
				{

					console.log("正前方没有墙，无法粉刷！");
				}
			}
}

function wallRandom(){
	var col =parseInt(Math.random()*9+1);
	var row =parseInt(Math.random()*9+1);

	buildInfront(row,col);
	wall["position"].push(row);
	wall["position"].push(col);
}

/*给执行按钮添加点击事件*/
var submitButton = document.getElementById("submit");
var refreshButton = document.getElementById("refresh");
var randomButton = document.getElementById("random");
submitButton.onclick = startGame;
refreshButton.onclick = clearAll;
randomButton.onclick = wallRandom;


/*寻路算法*/
function getBoxSPos(){
	var colorBlock = document.getElementById("corBlock");
	var bottom = parseFloat(colorBlock.style.bottom);
	var left = parseFloat(colorBlock.style.left);
	var rowNum = 10 -(bottom - 45)/45;
	var colNum = (left -49)/45 + 1;
	//console.log(rowNum,colNum);
	return [rowNum-1,colNum-1];
}

function getBoxEPos(code){
	var X = code.substring(7,code.indexOf(","));
	var Y = code.substring(code.indexOf(",")+1);
	return [X-1,Y-1];
}

var closelist=new Array(),openlist=new Array();
var gw=10,gh=10,gwh=14;
var p_start=new Array(2),p_end=new Array(2);
var s_path,n_path="";
var num,bg,flag=0;
var w=10,h=10;//横向30个，纵向20个
function GetRound(pos){
  var a=new Array();
  a[0]=(pos[0]+1)+","+(pos[1]-1);
  a[1]=(pos[0]+1)+","+pos[1];
  a[2]=(pos[0]+1)+","+(pos[1]+1);
  a[3]=pos[0]+","+(pos[1]+1);
  a[4]=(pos[0]-1)+","+(pos[1]+1);
  a[5]=(pos[0]-1)+","+pos[1];
  a[6]=(pos[0]-1)+","+(pos[1]-1);
  a[7]=pos[0]+","+(pos[1]-1);
  return a;
}
function GetF(arr){
  var t,G,H,F;
  for(var i=0;i<arr.length;i++){
    t=arr[i].split(",");
    t[0]=parseInt(t[0]);t[1]=parseInt(t[1]);
    if(IsOutScreen([t[0],t[1]])||IsPass(arr[i])||InClose([t[0],t[1]])||IsStart([t[0],t[1]])||!IsInTurn([t[0],t[1]]))
        continue;
    if((t[0]-s_path[3][0])*(t[1]-s_path[3][1])!=0)
        G=s_path[1]+gwh;
    else
        G=s_path[1]+gw;
    if(InOpen([t[0],t[1]])){
        if(G<openlist[num][1]){
          openlist[num][0]=(G+openlist[num][2]);
          openlist[num][1]=G;
          openlist[num][4]=s_path[3];
        }
        else{G=openlist[num][1];}
    }
    else{
        H=(Math.abs(p_end[0]-t[0])+Math.abs(p_end[1]-t[1]))*gw;
        F=G+H;
        arr[i]=new Array();
        arr[i][0]=F;arr[i][1]=G;arr[i][2]=H;arr[i][3]=[t[0],t[1]];arr[i][4]=s_path[3];
        openlist[openlist.length]=arr[i];
    }
    if(mapTable.rows[t[1]].cells[t[0]].style.backgroundColor!="#cccccc"&&mapTable.rows[t[1]].cells[t[0]].style.backgroundColor!="#0000ff"&&mapTable.rows[t[1]].cells[t[0]].style.backgroundColor!="#ff0000"&&mapTable.rows[t[1]].cells[t[0]].style.backgroundColor!="#00ff00")
    {
        mapTable.rows[t[1]].cells[t[0]].style.backgroundColor="#FF00FF";
        //mapTable.rows[t[1]].cells[t[0]].innerHTML="<font color=white>"+G+"</font>";
    }
  }
}
function IsStart(arr){
  if(arr[0]==p_start[0]&&arr[1]==p_start[1])
    return true;
  return false;
}
function IsInTurn(arr){
  if(arr[0]>s_path[3][0]){
    if(arr[1]>s_path[3][1]){
        if(IsPass((arr[0]-1)+","+arr[1])||IsPass(arr[0]+","+(arr[1]-1)))
          return false;
    }
    else if(arr[1]<s_path[3][1]){
        if(IsPass((arr[0]-1)+","+arr[1])||IsPass(arr[0]+","+(arr[1]+1)))
          return false;
    }
  }
  else if(arr[0]<s_path[3][0]){
    if(arr[1]>s_path[3][1]){
        if(IsPass((arr[0]+1)+","+arr[1])||IsPass(arr[0]+","+(arr[1]-1)))
          return false;
    }
    else if(arr[1]<s_path[3][1]){
        if(IsPass((arr[0]+1)+","+arr[1])||IsPass(arr[0]+","+(arr[1]+1)))
          return false;
    }
  }
  return true;
}
function IsOutScreen(arr){
  if(arr[0]<0||arr[1]<0||arr[0]>(w-1)||arr[1]>(h-1))
    return true;
  return false;
}
function InOpen(arr){
  var bool=false;
  for(var i=0;i<openlist.length;i++){
    if(arr[0]==openlist[i][3][0]&&arr[1]==openlist[i][3][1]){
        bool=true;num=i;break;}
  }
  return bool;
}
function InClose(arr){
  var bool=false;
  for(var i=0;i<closelist.length;i++){
    if((arr[0]==closelist[i][3][0])&&(arr[1]==closelist[i][3][1])){
        bool=true;break;}
  }
  return bool;
}
function IsPass(pos){
  if((";"+n_path+";").indexOf(";"+pos+";")!=-1)
    return true;
  return false;
}
function Sort(arr){
  var temp;
  for(var i=0;i<arr.length;i++){
    if(arr.length==1)break;
    if(arr[i][0]<=arr[i+1][0]){
        temp=arr[i];
        arr[i]=arr[i+1];
        arr[i+1]=temp;
    }
    if((i+1)==(arr.length-1))
        break;
  }
}
function main(){
    GetF(GetRound(s_path[3]));
    console.log(s_path[3]);
    console.log(GetRound(s_path[3]));
    Sort(openlist);
    s_path=openlist[openlist.length-1];
    closelist[closelist.length]=s_path;
    openlist[openlist.length-1]=null;
    if(openlist.length==0){alert("找不到路径");return;}
    openlist.length=openlist.length-1;
    if((s_path[3][0]==p_end[0])&&(s_path[3][1]==p_end[1])){
        getPath();
    }
    else{mapTable.rows[s_path[3][1]].cells[s_path[3][0]].style.backgroundColor="#00ff00";setTimeout("main()",100);}
}

function getPath(){
  var str="";
  var t=closelist[closelist.length-1][4];
  while(1){
    str+=t.join(",")+";";
    mapTable.rows[t[1]].cells[t[0]].style.backgroundColor="#ffff00";
    for(var i=0;i<closelist.length;i++){
        if(closelist[i][3][0]==t[0]&&closelist[i][3][1]==t[1])
          t=closelist[i][4];
    }
    if(t[0]==p_start[0]&&t[1]==p_start[1])
        break;
  }
  alert(str);
}

function setPos(){
  var h=(Math.abs(p_end[0]-p_start[0])+Math.abs(p_end[1]-p_start[1]))*gw;
  s_path=[h,0,h,p_start,p_start];
}

function set(id,arr){
  switch(id){
    case 1:
        p_start=arr;
        mapTable.rows[arr[1]].cells[arr[0]].style.backgroundColor="#ff0000";break;
    case 2:
        p_end=arr;mapTable.rows[arr[1]].cells[arr[0]].style.backgroundColor="#0000ff";break;
    case 3:
        n_path+=arr.join(",")+";";mapTable.rows[arr[1]].cells[arr[0]].style.backgroundColor="#cccccc";break;
    default:
        break;
  }
}

function setflag(id){flag=id;}
