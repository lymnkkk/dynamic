//浏览器版本
(function(){
	window.sys={};                     //让外部可以访问，保存浏览器信息对象
	var ua=navigator.userAgent.toLowerCase();        //获取浏览器信息字符串
	var s;                             //浏览器信息数组，浏览器名称+版本
	
	(s=ua.match(/msie ([\d.]+)/))? sys.ie=s[1]:                 //ie10-
	(((/trident/).test(ua))&&(s=ua.match(/rv:([\d.]+)/)))?sys.ie11=s[1]:  //ie11
	(s=ua.match(/firefox\/([\d.]+)/))?sys.firefox=s[1]:                   //firefox
	(s=ua.match(/edge\/([\d.]+)/))?sys.edge=s[1]:                         //edge
	(s=ua.match(/opr\/([\d.]+)/))?sys.opera=s[1]:                        //opera
	(s=ua.match(/chrome\/([\d.]+)/))?sys.chrome=s[1]:0                    //chrome
	
	if(/webkit/.test(ua)) sys.webkit=ua.match(/webkit\/([\d.]+)/)[1];
})();

//DOM加载 
function addDomLoaded(fn){
	var isReady=false;
	var timer=null;

	function doReady(){
		if(timer) clearInterval(timer);
		if(isReady) return;
		isReady=true;
		fn();
	}

	if((sys.opera&&sys.opera<9)||(sys.firefox&&sys.firefox<3)||(sys.webkit&&sys.webkit<525)){
		//无论采用哪种，基本上用不着了
		
		//timer=setInterval(function(){
		//	if(/loaded|interactive|complete/.test(document.readyState)){     //loaded只是部分加载，有可能只是DOM加载完毕，complete是完全加载，类似onload
		//		doReady();
		//	}
		//},1);
		
	
		//还有一种方法
		//这个方法会先执行再加载图片
		timer=setInterval(function(){
			if(document&&document.getElementById&&document.getElementsByTagName&&document.body){          //说明DOM已经加载完毕 
				doReady();
			}
		});
	}else if(document.addEventListener){           //W3C
		addEvent(document,'DOMContentLoaded',function(){
			fn();
			//alert(arguments.callee);        //得到匿名函数
			removeEvent(document,'DOMContentLoaded',arguments.callee);
			
		})
	}else if(sys.ie&&sys.ie<9){
		timer=setInterval(function(){
			try{
			    document.documentElement.doScroll('left');
				doReady();
			}catch(e){
				
			}
		})
	} 
}

/*

		//实现累加，并且清晰的指出时专门给addEvent用的
		//JS一切皆为对象，所以addEvent.ID语法正确，实际上是个全局变量
		addEvent.ID++;
		alert(addEvent.ID);
*/

//跨浏览器添加事件绑定
function addEvent(obj,type,fn){
	if(typeof obj.addEventListener!='undefined'){
		obj.addEventListener(type,fn,false);
	}
	/*
	else if(typeof obj.attachEvent!='undefined'){  
		obj.attachEvent('on'+type,function(){   //返回的this为window
			fn.call(obj,window.event);          //第一个参数为this对象，后面多出的参数作为fn(a)中的a使用
		});
	}
	*/
	
	//因为attachEvent作为IE8使用时有挺多问题，所以我们采用传统的添加事件方法
	//解决顺序问题和执行多次问题
	else{
		//alert(addEvent.ID);
		//addEvent.ID++;
		
		//创建一个存放事件的哈希表（数列表）
        if(!obj.events) obj.events={};
        //第一次执行时执行		
		if(!obj.events[type]){
				//创建一个存放事件处理函数的数组
			    obj.events[type]=[];
				//把第一次的事件处理函数存储到第一个位置上
				obj.events[type][0]=fn;
			}else{		
				//从第二次开始我们用事件计数器来存储
				//同一个注册函数不添加到计数器中
				if(addEvent.equal(obj.events[type],fn)==true) return false;
				obj.events[type][++addEvent.ID]=fn;   //x++先存储再加，++x先加再存储
			}
				//执行事件处理函数
				obj['on'+type]=addEvent.exec;
			  
		}
	}

	//为每个事件分配计数器，用来解决IE8不能顺序执行的问题
	addEvent.ID=0;

	//执行事件处理函数
	addEvent.exec=function(event){             //参数也可以是e
		var e=event||addEvent.fixEvent(window.event);
		var es=this.events[e.type];
		for(var i in es){
			//this.events[e.type][i]();
			//传递this
			es[i].call(this,e);   //把e传过去
		}
}

//同一个注册函数进行屏蔽（针对IE会多次执行同意注册函数）
addEvent.equal=function(es,fn){
	for(var i in es){
		if(es[i]==fn) return true;
	}
	return false;
}

//把IE常用的event配对到W3C中去
addEvent.fixEvent=function(event){
	event.preventDefault=addEvent.fixEvent.preventDefault; //函数里面的this就是event
	event.stopPropagation=addEvent.fixEvent.stopPropagation;
	event.target=event.srcElement;
	return event;
}

//IE阻止默认行为
addEvent.fixEvent.preventDefault=function(){
	this.returnValue=false;           
}

//IE取消冒泡
addEvent.fixEvent.stopPropagation=function(){
	this.cancelBubble=true;
}

//跨浏览器删除事件
function removeEvent(obj,type,fn){
	if(typeof obj.removeEventListener!='undefined'){
		obj.removeEventListener(type,fn,false);
	}
	/*
	else if(typeof obj.detachEvent!='undefined'){
		//obj.detachEvent('on'+type,fn);
	}
	*/
	else{		
		//alert(obj.events);         //可以得到上面传来的obj.events
		if(obj.events){		        //如果存在
			for(var i in obj.events[type]){
				if(obj.events[type][i]==fn){
					delete obj.events[type][i];
				}
			}
		}
	}
}

//跨浏览器获取视口大小
function getInner(){
	
	if(typeof window.innerWidth!='undefined'){
		return{
			width:window.innerWidth,
			height:window.innerHeight
		}
	}else{
		return{
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		}
	}
		
}

//跨浏览器获取滚动条位置
function getScroll(){
	return{
		top:document.documentElement.scrollTop||document.body.scrollTop,
		left:document.documentElement.scrollLeft||document.body.scrollLeft
	}
}

//跨浏览器获取style
function getStyle(element,attr){
	var value;
	if(typeof window.getComputedStyle!='undefined'){
		value=window.getComputedStyle(element,null)[attr];
	}else if(typeof element.currentStyle!='undefined'){
		value=element.currentStyle[attr];
	}
	return value;
}


//是否存在class
function hasClass(element,className){
    
	return element.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'));

}

//跨浏览器添加link规则
function insertRule(sheet,selectorText,cssText,position){
	if(typeof sheet.insertRule!='undefined'){  //W3C
		sheet.insertRule(selectorText+'{'+cssText+'}',position);
	}else if(typeof sheet.addRule!='undefined'){//IE
		sheet.addRule(selectorText,cssText,position);
	}
}


//跨浏览器移除link规则
function deleteRule(sheet,index){
	if(typeof sheet.deleteRule!='undefined'){
		sheet.deleteRule(index);
	}else if(typeof sheet.removeRule!='undefined'){
		sheet.removeRule(index);
	}
}

// 跨浏览获取innerText
function getInnerText(element){
	return (typeof element.textContent=='string')?element.textContent:element.innerText;
}

// 跨浏览器设置innerText
function setInnerText(element,text){
	if(typeof element.textContent== 'string'){
		element.textContent=text;
	}else{
		element.innerText=text;
	}
}

//获取某一个元素到最外层一个顶点的距离
function offsetTop(element){
	var top=element.offsetTop;
	var parent =element.offsetParent;
	while(parent!=null){
		top+=parent.offsetTop;
		parent=parent.offsetParent;
	}
	return top;
} 

//去掉空格
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g,'');
}

//某一个值是否存在某个数组中
function inArray(array,value){
	for(var i in array){
		if(array[i]===value) return true;
	}
	return false;
}

//滚动条清零
// function scrollTop(){
// 	document.documentElement.scrollTop=0;
// 	document.body.scrollTop=0;
// }

// 获取某一个节点的上一个节点的索引
function prevIndex(current,parent){
	var length=parent.children.length;
	if(current==0) return length-1;
	return parseInt(current)-1;
}

// 获取某一个节点的下一个节点的索引
function nextIndex(current,parent){
	var length=parent.children.length;
	if(current==length-1) return 0;
	return parseInt(current)+1;
}

function fixedScroll(){
    setTimeout(function(){              //用setTimeout防止进行多次的滚动条触发，节约资源
		window.scrollTo(fixedScroll.left,fixedScroll.top);
    },100);  
}

//跨浏览器获取event对象
function getEvent(event){
	return event||window.event;
}

//阻止默认行为
function preDef(event){
	var e=getEvent(event);
	if(typeof e.preventDefault!='undefined'){  //W3C
		e.preventDefault();
		
	}else{
		e.returnValue=false;
		
	}
}

function setCookie(name,value,expires,path,domain,secure){
	var cookieName=encodeURIComponent(name)+'='+encodeURIComponent(value);
	if(expires instanceof Date){
		cookieName+=';expires='+expires;
	}
	if(path){
		cookieName+=';path+'+path;
	}
	if(domain){
		cookieName+=';domain'+domain;
	}
	if(secure){
		cookieName+=';secure';
	}
	document.cookie=cookieName;
}

function getCookie(name){
	var cookieName=encodeURIComponent(name)+'=';
	var cookieStart=document.cookie.indexOf(name);
	var cookieValue=null;
    if(cookieStart>-1){          //确认name 是否存在
		var cookieEnd=document.cookie.indexOf(';',cookieStart);    //最后一个没有分号
		if(cookieEnd==-1){         //当最后一个是，这么处理
			cookieEnd=document.cookie.length;
		}
	}           
    cookieValue=document.cookie.substring(cookieStart+cookieName.length,cookieEnd);
	//return cookieStart+cookieName.length;
	return decodeURIComponent(cookieValue);
}

function unsetCookie(name){
	document.cookie=name+"=;expires="+new Date(0);
}


















