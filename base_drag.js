$().extend('drag',function(){
	
	//alert(this.elements.length);
	//alert(arguments.length);
	var tags=arguments;
	//alert(tags.length);
   for(var i=0;i<this.elements.length;i++){
	//alert(tags.length);
    //alert(this.elements[i]);
	addEvent(this.elements[i],'mousedown',function(e){
		
	     if(trim(this.innerHTML).length==0)  e.preventDefault();   //这个是针对火狐旧版本，对于空的div，火狐旧版本无法拖动，所以要阻止默认行为
		 var _this=this;
		  var diffX=e.clientX-_this.offsetLeft;
		  var diffY=e.clientY-_this.offsetTop;
		                       //没法用，当tag传进来是this.elements[0]会变成数组最后一个值
		//alert(arguments.length);					   
		
		 //自定义拖拽
		  var flag=false;
           for(var i=0;i<tags.length;i++){
			   if(e.target==tags[i]){
				   flag=true;                 //只要有一个是true,就立刻返回
				   break;
			   }
		  }
		  
		  //alert(e.target.tagName);
		  //alert(e.srcElement.tagName);//针对IE8
		  //当鼠标超出浏览器时，超出的功能失效
		  //if(e.target.tagName=='H2'||e.target.tagName=='SPAN'){
		  if(flag){
			  addEvent(document,'mousemove',move);
			  addEvent(document,'mouseup',up);
		  }else{
			 removeEvent(document,'mousemove',move);
			 removeEvent(document,'mouseup',up);
		  }
		  
		  function move(e){
			  if(typeof _this.setCapture!='undefined'){    //火狐和IE支持，但在这里针对IE
				  _this.setCapture();
			  }
			  
			  var left=e.clientX-diffX;
			  var top=e.clientY-diffY;
		      
              if(left<0)
			  {
			      left=0;
			  }else if(left<=getScroll().left){
			  	  left=getScroll().left;
			  }
			  else if(left>getInner().width+getScroll().left-_this.offsetWidth){
				  left=getInner().width+getScroll().left-_this.offsetWidth;
			  }	

			  if(top<0){
				  top=0; 
			  }else if(top<=getScroll().top){
			  	  top=getScroll().top;
			  }
			  else if(top>getInner().height+getScroll().top-_this.offsetHeight){
				  top=getInner().height+getScroll().top-_this.offsetHeight;
			  };
			  _this.style.left=left+'px';
			  _this.style.top=top+'px'; 
		  }
		  
		  function up(){
			  removeEvent(document,'mousemove',move);
			  removeEvent(document,'mouseup',up);
			  if(typeof _this.releaseCapture!='undefined'){
				  _this.releaseCapture();
			  }
		  }
 
	})
}
return this;
})