/*小球可以斜着走*/
var gameWrap = document.getElementById('gameWrap');
var clientWidth = document.documentElement.clientWidth;

if(clientWidth >= 600)
{
	gameWrap.width = 600;
	gameWrap.height = 800;
	
}
else
{
	gameWrap.width = clientWidth;
	gameWrap.height = clientWidth*800/600;

}
var boxSize = gameWrap.width/15;


console.log(clientWidth);
var hero = {
		speed: 100,		
		x: 7,
		y: 0
};
var sDoc = {		
		x: 7,
		y: 19
};
var openlist = [];
var closelist = [];
var father = [];

var row = gameWrap.height/boxSize;
var col = gameWrap.width/boxSize;	
console.log(row);
console.log(col);
var NopassBlock = [];

if (gameWrap.getContext){
	  var ctxGame = gameWrap.getContext('2d');	          
	  setStart();	
	  resetGame();          	 		  			  
}

/*创建障碍物*/
function rectRandom(r){
	var xPos,yPos;

 	function XYRandom(){
 		xPos = parseInt(Math.random()*15);
		yPos = parseInt(Math.random()*20);
		if((xPos == hero.x && yPos ==hero.y )||(xPos == sDoc.x && yPos == sDoc.y) )
		{
	 		XYRandom();
	 		return [xPos,yPos];
		}
		else
		{
			return [xPos,yPos];
		}
 }
 		
 	function rectBlock(r){ 		
	 	var xyPos = XYRandom();
	 	NopassBlock.push(xyPos);
	 	if (gameWrap.getContext){
	 		ctxGame.fillStyle = "#493C2D";
	 		ctxGame.fillRect(xyPos[0]*r,xyPos[1]*r,r,r);
	 	}	
	}

	 var rectNum = parseInt(Math.random()*10+30);
	 for(var i=0;i<rectNum;i++)
	 {
	 	rectBlock(r);
	 }

 }

/*创建特工*/
function heroSet(x,y){
	ctxGame.fillStyle = "#90DF97";
	ctxGame.beginPath();
    //ctxGame.moveTo(gameWrap.width,gameWrap.height);
    ctxGame.arc(x*boxSize+boxSize/2,y*boxSize+boxSize/2,boxSize/2,0,2*Math.PI);
	ctxGame.fill();
}

/*创建机密文件*/
function docSet(){
	ctxGame.fillStyle = "#F4AE8A";
	ctxGame.beginPath();
	ctxGame.moveTo(sDoc.x*boxSize+boxSize/2,(sDoc.y+1)*boxSize);
	ctxGame.lineTo(sDoc.x*boxSize,sDoc.y*boxSize);
	ctxGame.lineTo((sDoc.x+1)*boxSize,sDoc.y*boxSize);
	ctxGame.fill();
}

/*游戏重置*/
function resetGame(){
	ctxGame.clearRect(0,0,gameWrap.width,gameWrap.height);
	rectRandom(boxSize);
	heroSet(hero.x,hero.y);
	docSet();
}

/*寻路算法*/
var start = [];
var end = [];
var rh = 10,ch = 10,rch = 14;

/*是否超出屏幕*/
function isOutScreen(pos){
	if(pos[0] < 0 || pos[1] < 0 || pos[0] > col-1 || pos[1] > row-1 )
	{
			return true;
	}
	else
	{
			return false;
	}
}

/*是否在关闭列表中*/
function isInCloselist(pos){
		for(var i = 0;i < closelist.length;i++)
		{
			if(pos[0] == closelist[i][0] && pos[1] == closelist[i][1])
			{
				return true;
				break;
			}
		}
		return false;
}

/*是否是障碍物*/
function isNoPassBlock(pos){
		//console.log(NopassBlock);
		for(var i = 0;i < NopassBlock.length;i++)
		{
			if(pos[0] == NopassBlock[i][0] && pos[1] == NopassBlock[i][1])
			{
				return true;
				break;
			}
		}
		return false;
}

/*根据F值的大小，对开放列表中的节点进行排序*/
function sortF(arr){
		openlist = arr.sort(function(a,b){
			return b[2]-a[2];
		});
}

/*是否是起点*/
function isStart(pos,start){
		if(pos[0] == start[0] && pos[1] == start[1])
	  	{
	    	return true;
	  	}
	  	else
	  	{
	  		return false;
	  	}	  	
} 

function getAround(pos){
		  var around = [];
		  around.push([pos[0]+1,pos[1]-1]);

		  around.push([pos[0]+1,pos[1]]);

		  around.push([pos[0]+1,pos[1]+1]);

		  around.push([pos[0],pos[1]+1]);

		  around.push([pos[0]-1,pos[1]+1]);

		  around.push([pos[0]-1,pos[1]]);

		  around.push([pos[0]-1,pos[1]-1]);

		  around.push([pos[0],pos[1]-1]);
		  
		  return around;
}

/*获得开放列表里面的每一个节点的F值*/
function getF(arr,start,end){
		var G,H,F;
		openlist = [];//每次进行计算F值之前，对开放列表进行清空
		 
		for(var i=0;i<arr.length;i++){

			//检验此节点是否为屏幕之外、或者是障碍节点、是否在关闭列表里、是否是最开始的节点
			if(isOutScreen(arr[i]) || isNoPassBlock(arr[i]) || isInCloselist(arr[i]) || isStart(arr[i],start) )
		    {
		        continue;//跳出本次循环
		    }

		    var each = new Array(5);		    		    

		    //计算检测节点的G和H值
		    if((arr[i][0]-father[0])*(arr[i][1]-father[1]) != 0)
			{
			    G = rch;
			}
			else
			{
			    G = rh;
			}
			H = Math.abs(end[0] - arr[i][0])*rh + Math.abs(end[1] - arr[i][1])*ch;
			F = G + H;		    
		    	
		    each[0] = arr[i][0];
		    each[1] = arr[i][1];		    
			each[2] = F;
			each[3] = father[0];
			each[4] = father[1];
			openlist.push(each);		    
		}

}

/*清除路径*/
function clearPath(x,y){
			ctxGame.clearRect(x*boxSize,y*boxSize,boxSize,boxSize);
}


/*重新设置起点*/	
function setStart(){
		openlist = [];
	    closelist = [];
	    NopassBlock = [];
	    father = [];
		father = [hero.x,hero.y,0,0,0];
		closelist.push([hero.x,hero.y,0,0,0]);
}
		
/*寻路的主函数*/
function findMain(){

			if(end[0] == closelist[closelist.length-1][0] && end[1] == closelist[closelist.length-1][1])
			{
				alert("起点和终点相同！");
			}
			else
			{
				
				getF(getAround(father),[closelist[closelist.length-1][0],closelist[closelist.length-1][1]],end);
				 
				sortF(openlist);
				 
				father = openlist[openlist.length - 1];
				 
				closelist[closelist.length] = openlist[openlist.length - 1];
				 
				clearPath(closelist[closelist.length-2][0],closelist[closelist.length-2][1]);
			    heroSet(closelist[closelist.length-1][0],closelist[closelist.length-1][1]);
				 
				 
				 if(openlist.length == 0)
				 {
				 	alert("找不到路径");
		      		return;
				 }

				 /*如果找到了机密文件，则重置游戏，跳出函数*/
				 if((sDoc.x==father[0])&&(sDoc.y==father[1]))
			     {
			      	 setStart();
			      	 resetGame();	
			      	 return;		      	 

			     }

			     /*如果没有找到终点，则循环执行findMain()*/
				 if(!((father[0] == end[0]) && (father[1] == end[1])))
			     {
			        setTimeout("findMain()",hero.speed);
			       	        
			     }

			}
			 
}

/*获得鼠标的坐标*/
function windowTocanvas(canvas, x, y) {
        var bbox = canvas.getBoundingClientRect();
        return {
          x: x - bbox.left , 
          y: y - bbox.top 
        };

 }

/*鼠标点击事件*/     
gameWrap.onclick = function(event){
        
        var loc=windowTocanvas(gameWrap,event.clientX,event.clientY)
        var x=parseInt(loc.x);
        var y=parseInt(loc.y);

        var arrayX = [];
        var arrayY = [];

        for(var i = 0;i<=15;i++)
        {
        	arrayX.push(boxSize*i);
        }
        
        for(var i = 0;i<=20;i++)
        {
        	arrayY.push(boxSize*i);
        }

        function find(array,val){
	        
	        var idx =   0,
	            i   =   0,
	            j   =   array.length;
	        for(;i<j;i++){
	            if(array[i] >= val){
	                idx = i;
	                break;
	            };
	        };
	        return idx-1;
	    }

	    if(isNoPassBlock([find(arrayX,x),find(arrayY,y)]))
	    {
	    	console.log(NopassBlock);
	    	console.log([find(arrayX,x),find(arrayY,y)]);
	    	alert("特工不能到达障碍物！")
	    }
	    else
	    {
	    	
	    	openlist = [];

			closelist.splice(0,closelist.length-1);

	    	end = [find(arrayX,x),find(arrayY,y)];
	    	    	
	    	console.log(end);
	    	
	    	findMain();	    	
	    }    
}

