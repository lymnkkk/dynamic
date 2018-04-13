

// 封装ajax
function ajax(obj){
	//创建XHR对象(闭包)
	var xhr=(function(){
		if(typeof XMLHttpRequest!='undefined'){
			return new XMLHttpRequest();
		}else if(typeof ActiveXObject!='undefined'){
			var version=[
				'MSXML2.XMLHttp.6.0',
				'MSXML2.XMLHttp.3.0',
				'MSXML2.XMLHttp'
			];
			for(var i=0;i<version.length;i++){
				try{
					return new ActiveXObject(version[i]);
				}catch(e){
					//跳过
				}
			}
		}else{
		   throw('你的浏览器版本不支持XHR对象');
		}
	})();  
	obj.url=obj.url+'?rand='+Math.random();
	// 名值对转换为字符串
	obj.data=(function(data){
		var arr=[];
		for(var i in data){
			arr.push(encodeURIComponent(i)+'='+encodeURIComponent(data[i]));
		}
		return arr.join('&');
	})(obj.data);
	if(obj.method==='get') obj.url+=obj.url.indexOf('?')==-1 ? '?'+obj.data : '&'+obj.data;  //get请求
	if(obj.async===true){              //异步
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
				callback();
			}		
		}
	}

	xhr.open(obj.method,obj.url,obj.async);  
	if(obj.method==='post'){             //post请求
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xhr.send(obj.data);
	}else{                               //get请求
		xhr.send(null);   
	}
	
	if(obj.async===false){              //同步
		callback();
	} 

	function callback(){
		if(xhr.status==200){
			obj.success(xhr.responseText);
		}else{
			alert('获取错误信息！错误代码：'+xhr.status+'错误信息：'+xhr.statusText);
		}
	}              
}

