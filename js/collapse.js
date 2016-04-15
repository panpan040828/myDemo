window.onload = function(){
	var container = document.getElementById("container");
	var imgList	= document.getElementById("imgList");
	var buttons = document.getElementById("buttons").getElementsByTagName("span");
	var pre = document.getElementById("prev");
	var next = document.getElementById("next");
	var index = 1;
	var animated = false;//动画是否在动
	var interval = 3000;
	var timer;
	/*按钮的样式变换*/
	function showButtons(){
		console.log(index);
		for(var i = 0;i < buttons.length;i++)
		{
			if(buttons[i].className == "buttonOn")
			{
			 buttons[i].className = "";
			 break;
			}
			
		}
		buttons[index - 1].className = "buttonOn";
	}


	/*用一个函数封装图片左右滚动的功能*/
	function animate(offset){
		animated = true;
		var newleft= parseInt(imgList.style.left) + offset ;
		var time = 300;//位移总时间
		var interval = 10;//位移时间间隔
		var speed = offset/(time/interval);

		var go = function(){
			if((speed > 0 && parseInt(imgList.style.left) < newleft) || (speed < 0 && parseInt(imgList.style.left) > newleft))
			{
				imgList.style.left = parseInt(imgList.style.left) + speed +"px";
				setTimeout(go,interval);//只会执行一次
			}
			else
			{
				if(newleft > -450)
				{imgList.style.left = -2250 + "px"; 
				//imgList.style.transition = "0s";
				}//当变到第一张，再点左箭头，切回第五张
				else if(newleft < -2250)
				{imgList.style.left = -450 + "px"; 
				//imgList.style.transition = "0s";
				}
				else
				{imgList.style.left = newleft + "px";
				//imgList.style.transition = "left 0.5s linear";
				 }
				 animated = false;
			}
		}

		go();

		


		//debugger;

	}


	function autoPlay(){
		timer = setInterval(function(){
			//next.onclick();
			//imgList.style.transform = "translateX(-450px)";
			
		},interval);
	}

	function stop(){
		clearTimeout(timer);
	}

	/*点击右边的箭头，图片向右滚动*/
	next.onclick = function(){
		if(index == 5)
			{index = 1;}
		else
			{index += 1;}
		
		showButtons();
		animate(-450);
	}

	/*点击左边的箭头，图片向左滚动*/
	prev.onclick = function(){
		if(index == 1)
			{index = 5;}
		else
			{index -= 1;}
		showButtons();
		animate(450);
	}

	for(var i = 0;i < buttons.length;i++)
	{
		buttons[i].onclick = function(){

			/*优化工作，当当前页面是要显示的页面时，点击对应按钮，不执行下面的语句*/
			if(this.className == "buttonOn")
			{
				return;//return的意思是，当程序跑到这里时，就会退出当前函数
			}

			var myIndex = parseInt(this.getAttribute("index"));
			var offset = -450 * (myIndex - index);			
			animate(offset);
			index = myIndex;
			showButtons();
			//debugger;
		}
	}

	container.onmouseover = stop;
	container.onmouseout = autoPlay;

	autoPlay();
}