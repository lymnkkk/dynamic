// 表单序列化
$().extend('serialize',function(){
	 for(var i=0;i<this.elements.length;i++){
	 	var form=this.elements[i];
	 	var parts={};
		for(var i=0;i<form.elements.length;i++){
			var filed=form.elements[i];
			switch(filed.type){
				// 表单序列化不发送type是button,submit,reset,file以及字段集
				case undefined:
				case 'button':
				case 'submit':			
				case 'reset':
				case 'file':
					break;
				// 单选框和复选框
				case 'radio':
				case 'checkbox':
					if(!filed.selected)  break;
				// 下拉菜单
				case 'select-one':
				case 'select-multiple':
				    for(var j=0;j<filed.options.length;j++){
				    	var option=filed.options[j];
				    	if(option.selected){
				    		var optValue='';
				    		// parts.push(filed.name+'='+option.value);
				    		//alert(option.hasAttribute);
				    		if(option.hasAttribute){
				    			optValue=(option.hasAttribute('value')?option.value:option.text);
				    		}else{
				    			//兼容ie7
				    			optValue=(option.attributes('value').specified?option.value:option.text);
				    		}
				    		parts[filed.name]=optValue;
				    	}
				    }
				    break;
				default:
				    parts[filed.name]=filed.value;
			}
		}

		return parts;
	 }
	return this;
})