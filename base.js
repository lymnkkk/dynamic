
//前台调用
var $=function(args){
	return new Base(args);
}

//基础库
function Base(args){
	//创建一个数组，来保存获取的节点和节点数据
	//Base.prototype.elements=[];
	this.elements=[];
	
	if(typeof args=='string'){
		if(args.indexOf(' ')!=-1){   //如果有空格
		//css模拟
			var elements=args.split(' '); //以空格为界分开，变成数组
			//for(elements.length);
			var childElements=[];             //存放临时节点对象的数组，解决覆盖的问题
			var node=[];                       //用来存放父节点
			for(var i=0;i<elements.length;i++){		
				if(node.length==0)  node.push(document);        //如果默认没有父节点，酒吧document放入
				switch(elements[i].charAt(0)){
					case '#':
					    childElements=[];      //清理临时节点,以便父节点失效，子节点有效
						childElements.push(this.getId(elements[i].substring(1)));  
						node=childElements;    //保存父节点，因为chileElements要清理，所以需要创建node来保存父节点
						break;
					case '.':
						childElements=[];
						for(var j=0;j<node.length;j++){
							var temps=this.getClass(elements[i].substring(1),node[j])
							for(var k=0;k<temps.length;k++){
								childElements.push(temps[k]);
							}
						} 
						break;
					default:
					    childElements=[];
						for(var j=0;j<node.length;j++){
							var temps=this.getTagName(elements[i],node[j]);
							for(var k=0;k<temps.length;k++){
								childElements.push(temps[k]);
							}
						}
						node=childElements;
				}
			}
			this.elements=childElements;
		}else{		
			//find模拟
			switch(args.charAt(0)){
				case '#':
					this.elements.push(this.getId(args.substring(1)));
					break;
				case '.':
					this.elements=this.getClass(args.substring(1));
					break;
				default:
					this.elements=this.getTagName(args);
			}
		}
	}else if(typeof args=='object'){		
		if(args!=undefined){ //_this是一个对象，undefined也是一个对象，区别与typeof返回的带单引号的'undefined'
			this.elements[0]=args;
		}
	}else if(typeof args=='function'){
		//addDomLoaded(args);
		this.ready(args);
	}
}

//addDomLoaded
Base.prototype.ready=function(fn){
	addDomLoaded(fn);
}

//获取ID节点
Base.prototype.getId=function(id){
	return document.getElementById(id);
	//return this;          //可以去掉了，因为该函数现在被Base(args)调用，new Base(args)后最终会返回Base这个对象，所以不需要了
}

//获取元素节点
Base.prototype.getTagName=function(tag,parentNode){
	var node=null;
	var temps=[];
	if(parentNode!=undefined){
		node=parentNode;
	}else{
		node=document;
	}
	var tags=node.getElementsByTagName(tag);
	for(var i=0;i<tags.length;i++){		
		temps.push(tags[i]);
	}
	return temps;
	//return this;
}

//获取CLASS节点数据
Base.prototype.getClass=function(className,parentNode){
	var node=null;
	var temps=[];
	//if(arguments.length==2){
	if(parentNode!=undefined){
		node=parentNode;
	}else{
		node=document;
	}
	var all=node.getElementsByTagName('*');
	for(var i=0;i<all.length;i++){
		//if(all[i].className==className){
		if((new RegExp('(\\s|^)'+className+'(\\s|$)')).test(all[i].className)){
			temps.push(all[i]);
		}
	}
	return temps;
	//return this;
}

//设置CSS选择器子节点
Base.prototype.find=function(str){
	var childElements=[];
	for(var i=0;i<this.elements.length;i++){
		switch(str.charAt(0)){
			case '#':                                                  //多余
			    childElements.push(document.getElementById(str.substring(1)));
				break;
			case '.':
				var temps=this.getClass(str.substring(1),this.elements[i]);			
				for(var j=0;j<temps.length;j++){
					childElements.push(temps[j])
				}
				break;
			
			default:
				var temps=this.getTagName(str,this.elements[i]);
				for(var j=0;j<temps.length;j++){
					childElements.push(temps[j]);
				}
		}
	}
	this.elements=childElements;
	return this;
}

//获取某一节点，并返回这个对象
Base.prototype.ge=function(num){
	return this.elements[num];
}

//获取首个节点，并返回这个对象
Base.prototype.first=function(){
	return this.elements[0];
}

//获取末个节点，并返回这个节点
Base.prototype.last=function(){
	return this.elements[this.elements.length - 1];
}

// 获取某组节点的数量
Base.prototype.length=function(){
	return this.elements.length;
}

// 获取某一节点的属性
Base.prototype.attr=function(attr,value){
	// return this.elements[0][attr];
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==1){
			return this.elements[i].getAttribute(attr);
		}else if(arguments.length==2){
			this.elements[i].setAttribute(attr , value);
		}
	}
	return this;
}

// 获取索引值
Base.prototype.index=function(){
	var children = this.elements[0].parentNode.children;   //得到父元素的所有孩子
	for(var i=0;i<children.length;i++){
		if(this.elements[0]==children[i])
			return i;
	}
}

//设置某一个节点的透明度
Base.prototype.opacity=function(num){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.opacity=num/100;
		this.elements[i].style.filter='alpha(opacity='+num+')';
	}
	return this;
}

//获取某一节点，并返回Base
Base.prototype.eq=function(num){
	var element=this.elements[num];
    this.elements=[];
    this.elements[0]=element;
	return this;
}

//获取当前节点的下一个元素节点
Base.prototype.next=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i]=this.elements[i].nextSibling;
		if(this.elements[i]==null) throw new Error('找不到下一个同级节点！');
		if(this.elements[i].nodeType==3)  this.next();
	}
	return this;
}

//获取当前节点的上一个元素节点
Base.prototype.prev=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i]=this.elements[i].previousSibling;
		if(this.elements[i]==null) throw new Error('找不到上一个同级节点！');
		if(this.elements[i].nodeType==3)  this.prev();
	}
	return this;
}

//设置CSS
Base.prototype.css=function(attr,value){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==1){
	        return getStyle(this.elements[i],attr);
		}else{		
			this.elements[i].style[attr]=value;
		}
	}
	return this;
}

//添加Class
Base.prototype.addClass=function(className){
	for(var i=0;i<this.elements.length;i++){
		if(!hasClass(this.elements[i],className)){
			
			this.elements[i].className+=' '+className;

		}
				
	}
	return this;
}

//移除Class
Base.prototype.removeClass=function(className){
		
	for(var i=0;i<this.elements.length;i++){		
		if(hasClass(this.elements[i],className)){
			this.elements[i].className=this.elements[i].className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'),'');
		}
	}
	return this;
}

//添加link或style的CSS规则
Base.prototype.addRule=function(num,selectorText,cssText,position){
	var sheet=document.styleSheets[num];
	insertRule(sheet,selectorText,cssText,position);
	return this;
} 

//移除link或style的CSS规则
Base.prototype.removeRule=function(num,index){
	var sheet=document.styleSheets[num];
	deleteRule(sheet,index);
	return this;
}

//设置表单字段元素
Base.prototype.form=function(name){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i]=this.elements[i][name];
		//alert(this.elements[i].value);
	}
	return this;
}

//设置表单字段内容获取
Base.prototype.value=function(str){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==0){
			return this.elements[i].value;
		}
		this.elements[i].value=str;
	}
	return this;
}

//设置innerHTML
Base.prototype.html=function(str){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==0){
			return this.elements[i].innerHTML; //不过滤html元素
		}
		this.elements[i].innerHTML=str;  //不过滤html元素
	}
	return this;
}	

//设置innerText
Base.prototype.text=function(str){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==0){
			return getInnerText(this.elements[i]);  //过滤html元素
		}
		setInnerText(this.elements[i],str);    
	}
	return this;
}

//设置事件发生器
Base.prototype.bind=function(event,fn){
	for(var i=0;i<this.elements.length;i++){
		addEvent(this.elements[i],event,fn);
}
	return this;
}

//设置鼠标移入移出方法
// ??为什么要循环
Base.prototype.hover=function(over,out){
	for(var i=0;i<this.elements.length;i++){
		addEvent(this.elements[i],'mouseover',over);
		addEvent(this.elements[i],'mouseout',out);

	}
	return this;
}

// Base.prototype.hover2=function(over,out){
	
// 		addEvent(this.elements[0],'mouseover',over);
// 		addEvent(this.elements[0],'mouseout',out);
	
// 	return this;
// }


//设置点击切换方法
Base.prototype.toggle=function(){
	for(var i=0;i<this.elements.length;i++){
		//tog(this.elements[i],arguments);
		(function(element,args){
			var count=0;
			addEvent(element,'click',function(){
			      args[count++ % args.length].call(this); //count先运行，然后再++
			});
		})(this.elements[i],arguments);
		
	}
	return this;
}
/*
function tog(element,args){
	var count=0;
	addEvent(element,'click',function(){
		//alert(count);
		args[count++ % args.length].call(this); //count先运行，然后再++
	});
}
*/

//设置显示
Base.prototype.show=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='block';
	}
	return this;
}

//设置隐藏
Base.prototype.hide=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='none';
	}
	return this;
}

//设置物体居中
Base.prototype.center=function(width,height){
	var top=(getInner().height-height)/2+getScroll().top;
	var left=(getInner().width-width)/2+getScroll().left;
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.top=top+'px';
		this.elements[i].style.left=left+'px';
	} 
	return this;
}

//触发浏览器窗口事件
Base.prototype.resize=function(fn){
	for(var i=0;i<this.elements.length;i++){
		element=this.elements[i];
		addEvent(window,'resize',function(){
			fn();
			if(element.offsetLeft>getInner().width+getScroll().left-element.offsetWidth){
				element.style.left=getInner().width+getScroll().left-element.offsetWidth+'px';
				if(element.offsetLeft<=0+getScroll().left){
					element.style.left=0+getScroll().left+'px';
				}
			}
			if(element.offsetTop>getInner().height+getScroll().top-element.offsetHeight){
				element.style.top=getInner().height+getScroll().top-element.offsetHeight+'px';
				if(element.offsetTop<=0+getScroll().top){
					element.style.top=0+getScroll().top+'px';
				}
			}		
		})
	}
	return this;
}

//锁屏功能
Base.prototype.lock=function(){
	for(var i=0;i<this.elements.length;i++){
		// var top=getScroll().top;
		// var left=getScroll().left;
		fixedScroll.left=getScroll().left;    //静态属性作为全局变量
		fixedScroll.top=getScroll().top;
		this.elements[i].style.width=getInner().width+getScroll().left+'px';
		this.elements[i].style.height=getInner().height+getScroll().top+'px'
		this.elements[i].style.display='block';
		// 针对firefix的兼容
		parseFloat(sys.firefox)< 4 ?document.body.style.overflow='hidden' :document.documentElement.style.overflow='hidden';
		// document.documentElement.style.overflow='hidden';
		// document.body.style.overflow='hidden';
		/*
		//方法1
		addEvent(this.elements[i],'mousedown',function(e){       //解决IE和edge锁屏后还能通过登陆框外的区域往下拉的情况
			e.preventDefault();
			addEvent(document,'mousemove',function(e){            //解决IE8
				e.preventDefault();
			})
		})
		*/
		//方法2	
		// addEvent(window,'scroll',scrollTop);

		  // 防止拖拽的时候拖爆(不让选中)
		  // addEvent(document,'mousedown',function(e){
		  // 		e.preventDefault();
		  // });
		  addEvent(this.elements[i],'mousedown',preDef); //this.elements[i]是遮罩，让遮罩不能选择,但是IE和edge还是可以拖爆
		  addEvent(this.elements[i],'mouseup',preDef);
		  // 兼容ie8
		  addEvent(this.elements[i],'selectstart',preDef);
		  /*
		  addEvent(window,'scroll',function(){         //针对IE,edge的问题，每次拖动都让滚动条回到原来的地方
		  	window.scrollTo(left,top);
		  })
		  */
		  addEvent(window,'scroll',fixedScroll);     //为了在关闭窗口后可以删除事件
		
	}
	return this;
}

//关闭锁屏功能
Base.prototype.unlock=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='none';
		// document.documentElement.style.overflow='auto';
		// document.body.style.overflow='auto';
		// removeEvent(window,'scroll',scrollTop);
		parseFloat(sys.firefox)< 4 ?document.body.style.overflow='auto' :document.documentElement.style.overflow='auto';
		removeEvent(this.elements[i],'mousedown',preDef);
		removeEvent(this.elements[i],'mouseup',preDef);
		// 兼容ie8
		removeEvent(this.elements[i],'selectstart',preDef);
		removeEvent(window,'scroll',fixedScroll);
		
	}
	return this;		
}

//触发点击事件
Base.prototype.click=function(fn){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onclick=fn;
	}
	return this;
}

//插件入口
Base.prototype.extend=function(name,fn){
	Base.prototype[name]=fn;
}


//动画
var timer=null;
Base.prototype.animate=function(obj){     //attr只有left和top,没有right和bottom  
	for(var i=0;i<this.elements.length;i++){		
		var element=this.elements[i];
		//alert(getStyle(element,'opacity'));
		//var attr=obj['attr']!=undefined?obj['attr']:'left';                        //可选，left和top两种值，默认值为left
		var attr=obj['attr']=='x'?'left':obj['attr']=='y'?'top':
				 obj['attr']=='w'?'width':obj['attr']=='h'?'height':
				 obj['attr']=='o'?'opacity':obj['attr']!=undefined?obj['attr']:'left';
		var start=obj['start']!=undefined?obj['start']:
		          obj['attr']=='o'? parseFloat(getStyle(element,attr))*100:
				                    parseInt(getStyle(element,attr));   //可选，默认是css的初始位置
									
		var step=obj['step']!=undefined?obj['step']:10;                            //可选，默认每次执行10像素
		var t=obj['t']!=undefined?obj['t']:10;                                      //可选，默认10毫秒执行一次
		//var target=obj['alter']+start;                                             //必选，增量，运行的目标点
		
		//同步动画
		var mul=obj['mul'];
		
		var alter=obj['alter'];                                                    
		var target=obj['target'];
		
		var speed=obj['speed']!=undefined?obj['speed']:6;                          //可选，默认缓冲速度为6
		var type=obj['type']==0?'constant':obj['type']==1?'buffer':'buffer';       //可选，0表示匀速，1表示缓冲，默认缓冲
		
		//如果alter和target同时存在，则用target
		if(alter!=undefined&&target==undefined){                                   
			target=alter+start;
		}else if(alter==undefined&&target==undefined&&mul==undefined){
			throw new Error('alter增量或target目标量必须存在一个！');
		}
		
		if(start>target) step=-step;         //判断向左还是向右，向上还是向下
		
		if(attr=='opacity'){
			element.style.opacity=parseFloat(start)/100;
			element.style.filter='alpha(opacity='+parseInt(start)+')';
		}else{			
		
		}
		
		if(mul==undefined){
			mul={};
			mul[attr]=target;
		}
		//alert(start);
		
		clearInterval(element.timer);            //马上清除掉，就不会增速
		
		element.timer=setInterval(function(){
			
			
			/*
				1.多个动画执行了多个列队动画，我们要求不管多少个动画只执行一个列队动画
				2.多个动画数值差别太大，导致动画无法执行目标值，原因是定时器提前清理掉了	

				解决1：不管多少个动画，只提供一次列队动画的机会
				解决2：多个动画按最后一个分动画执行完毕后再清理即可
			*/
			
			//创建一个布尔值，这个值可以了解多个动画是否全部执行完毕
			var flag=true;//表示执行完毕了
			
			for(var i in mul){
				attr=i=='x'?'left':i=='y'?'top':i=='w'?'width':i=='h'?'height':i=='o'?'opacity':i!=undefined?i:'left';
				target=mul[i];
                
			
				if(type=='buffer'){
					step=attr=='opacity'?(target-parseFloat(getStyle(element,attr))*100)/speed:
										 (target-parseInt(getStyle(element,attr)))/speed;
						//alert(parseFloat(getStyle(element,attr)));
					step=step>0?Math.ceil(step):Math.floor(step);
				}
				
				if(attr=='opacity'){	
					if(step==0){
						setOpacity();
						//alert('0');
					}else if(step>0 && Math.abs(parseFloat(getStyle(element,attr))*100-target)<=step){
						setOpacity();
						//alert('1');
					}
					else if(step<0 && (parseFloat(getStyle(element,attr))*100-target)<=Math.abs(step)){
						setOpacity();
						//alert('2');
					}else{
						var temp=parseFloat(getStyle(element,attr))*100;	
						element.style.opacity=parseInt(temp+step)/100;
						element.style.filter='alpha(opacity='+parseInt(temp+step)+')';
					} 
					if(parseInt(target)!=parseInt(parseFloat(getStyle(element,attr))*100))  flag=false;
				}else{	
					if(step==0){
						setTarget();
					}else if(step>0 && Math.abs(parseInt(getStyle(element,attr))-target)<=step){
						setTarget();
					}
					else if(step<0 && (parseInt(getStyle(element,attr))-target)<=Math.abs(step)){
						setTarget();
					}else{
						//放在else就永远不会和停止运动同时执行，就不会出现303同时剪到300的问题
						//但是会出现不同时剪到300的问题，导致突兀
						element.style[attr]=parseInt(getStyle(element,attr))+step+'px';
					} 
					if(parseInt(target)!=parseInt(getStyle(element,attr))) flag=false;
				}
					//document.getElementById('test').innerHTML+=i+'--'+parseInt(target)+'--'+parseFloat(getStyle(element,attr))+'--'+flag+'<br/>'
				
			}
			
			if(flag){
				clearInterval(element.timer);
				if(obj.fn!=undefined) obj.fn();
			}
			
		},t);
		
		function setTarget(){
			element.style[attr]=target+'px';

		}
		
		function setOpacity(){
			element.style.opacity=parseInt(target)/100;
			element.style.filter='alpha(opacity='+parseInt(target)+')';
		
		}
	}
	return this;
}
 

















