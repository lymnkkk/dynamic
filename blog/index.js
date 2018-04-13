       /*
window.onload=function(){
  //个人中心
  $().getClass('member').hover(function(){
		  $(this).css('background','url(images/up.png) no-repeat 50px');   //比上面更简便
		  $().getClass('member_ul').show(); 
	  },function(){
		  $(this).css('background','url(images/down.png) no-repeat 50px');
		  $().getClass('member_ul').css('display','none');
  });
  
  //登录框
  var login=$().getId('login');
  $().getId('login').center(250,350).resize(function(){
	  if($().getId('login').css('display')=='block'){	  
		  $().getId('screen').lock();
	  }
  });
  $().getClass('enter').click(function(){
	  $().getId('login').center(250,350);
	  $().getId('login').css('display','block');    //??不知道为什么这里$().getId()不能改成login
	  $().getId('screen').lock();
  });
  $().getClass('close').click(function(){
	  $().getId('login').css('display','none');
	  $().getId('screen').unlock();
  });
  $().addRule(0,'ul',"font-size:40px",0);
  $().removeRule(0,0);
  
  
  
  
  var oDiv=document.getElementById('login');
  
  //拖拽流程
  //1.先点下去
  //2.在点下的物体被选中，进行move移动
  //3.拾起鼠标，停止移动
  //点击某个物体，用oDiv即可，move和up是全局区域，也就是整个文档通用，应该用document

//拖拽
  //alert($().getTagName('h2').getElement(0));
 //alert($().getTagName('span').getElement(0))
  var login=$().getId('login');
  //login.drag([$().getTagName('h2').getElement(0),$().getTagName('span').getElement(0)]); 
  login.drag();
  //$().bbb();
  

} 
*/

/*
//封装DOM加载
//以下两种都可以
$(function(){
	alert(document.body);
})

$().ready(function(){
	alert(document.body);
})
*/

$(function(){
	//个人中心
  $('#header .member').hover(function(){
		  $(this).css('background','url(images/up.png) no-repeat 50px');   //比上面更简便
		  $('#header .member_ul').show().animate({
			  t:30,
			  mul:{
				  h:110,
				  o:100
			  }
		  }); 
	  },function(){
		  $(this).css('background','url(images/down.png) no-repeat 50px');
		  $('#header .member_ul').animate({
			  t:30,
			  mul:{
				  h:0,
				  o:0
			  },
			  fn:function(){
				  $('header .member_ul').hide();
			  }
		  })
  });
  
  
  //遮罩的画布
  var screen=$('#screen'); 
   //登录框
  var login=$('#login');
  login.center(350,250).resize(function(){
	  if(login.css('display')=='block'){	  
		  screen.lock();
	  }
  });
  $('#header .enter').click(function(){
	  login.center(350,250).css('display','block');    
	  screen.lock().animate({
		  attr:'o',
		  start:0,
		  target:30,
		  t:30,
		  step:5,
		  type:0
	  });
  });
  $('#login .close').click(function(){
	  login.css('display','none');
	  //先执行动画
	  screen.animate({
		  attr:'o',
		  target:0,
		  t:30,
		  step:5,
		  fn:function(){
			  screen.unlock();
		  }
	  });
  });
  
  
  //注册框
  var reg=$('#reg');
  reg.center(600,550).resize(function(){
	  if(reg.css('display')=='block'){	  
		  screen.lock();
	  }
  });
  $('#header .reg').click(function(){
	  reg.center(600,550).css('display','block');    
	  screen.lock().animate({
		  attr:'o',
		  start:0,
		  target:30,
		  t:30,
		  step:5,
		  type:0
	  });
  });
  $('#reg .close').click(function(){
	  reg.css('display','none');
	  //先执行动画
	  screen.animate({
		  attr:'o',
		  target:0,
		  t:30,
		  step:5,
		  fn:function(){
			  screen.unlock();
		  }
	  });
  });
  
  //拖拽
  login.drag($('#login h2').first());
  reg.drag($('#reg h2').first());
  
  //百度分享初始化位置
   $('#share').css('top',getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2+'px');
    
	/*
	addEvent(window,'scroll',function(){
		$('#share').animate({
			attr:'y',
			target:getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2
		})
	})
	*/
	//上面替换成下面的样子（为了封装起来）
	$(window).bind('scroll',function(){
		setTimeout(function(){
			$('#share').animate({
				attr:'y',
				target:getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2
			})
		},100);  //延迟一下，这样会平滑一些
	})
	
	$('#share').hover(function(){
		$(this).animate({
			attr:'x',
			target:0
		})
	},function(){
		$(this).animate({		
			attr:'x',
			target:-211
		})
	});
	
	
	//滑动导航
	$('#nav .about li').hover(function(){
		var target=$(this).first().offsetLeft;
		$('#nav .nav_bg').animate({
			attr:'x',
			target:target+20,
			t:30,
			fn:function(){
				$('#nav .white').animate({
					attr:'x',
					target:-target
				});
			}
		})
	},function(){
		$('#nav .nav_bg').animate({
			attr:'x',
			target:20,
			t:30,
			fn:function(){
				$('nav .white').animate({
					attr:'x',
					target:0
				});
			}
		})
	})
	

	$('#sidebar h2').toggle(function(){
		//alert(this.innerHTML);
		//alert(this.nextSibling.innerHTML);
		$(this).next().animate({
			mul:{
				h:0,
				o:0
			}
		});
	},function(){
		$(this).next().animate({
			mul:{
				h:150,
				o:100
			}
		});
	});

	
	//表单验证

	//初始化表单操作
	$('form').eq(0).first().reset();
	// 同户名
	//focus,blur
	//alert($('form').eq(0).first().user.value);
	//alert($('form').eq(0).form('user').first().value);
	//$('form').eq(0).form('user').first().value='8888';
	//alert($('form').eq(0).form('user').value());
	//$('form').eq(0).form('user').value('bbb');
	//alert($('#reg .info_user').first());
	$('form').eq(0).form('user').bind('focus',function(){
		$('#reg .info_user').css('display','block');
		$('#reg .error_user').css('display','none');
		$('#reg .succ_user').css('display','none');
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$('#reg .info_user').css('display','none');
			$('#reg .error_user').css('display','none');
			$('#reg .succ_user').css('display','none');
		}else if(!check_user()){
			$('#reg .error_user').css('display','block');
			$('#reg .succ_user').css('display','none');	
			$('#reg .info_user').css('display','none');
		}else{
			$('#reg .succ_user').css('display','block');
			$('#reg .info_user').css('display','none');
			$('#reg .error_user').css('display','none');
		}
	});
	
	function check_user(){
		
		var flag=true;
		if(!/[a-zA-Z0-9_]{2,20}/.test(trim($('form').eq(0).form('user').value()))){
			$('#reg .error_user').html('输入不合法，请重新输入！');
			return false;
		}else{
			// async设为false 即为同步，否则不管如何最终flag返回true

			// 这里两句没有达到预想效果
			$('#reg .loading').css('display','block');
			$('#reg .info_user').css('display','none');
			ajax({
				method:'post',
				url:'is_user.php',
				data:$('form').eq(0).serialize(),
				success:function(text){
					if(text==1){
						flag=false;
						$('#reg .error_user').html('用户名已被占用！');
					}else{
						flag=true;
					}
					$('#reg .loading').css('display','none');
				},
				async:false
			})
		}
		return flag;

	}
	
	//密码验证
	$('form').eq(0).form('pass').bind('focus',function(){
		$('#reg .info_pass').css('display','block');
		$('#reg .error_pass').css('display','none');
		$('#reg .succ_pass').css('display','none');
	}).bind('blur',function(){
		if(trim($(this).value())==''){ 
			$('#reg .info_pass').css('display','none');
		}else {
			if(check_pass()){
				$('#reg .info_pass').css('display','none');
				$('#reg .error_pass').css('display','none');
				$('#reg .succ_pass').css('display','block');			
			}else {
				$('#reg .info_pass').css('display','none');
				$('#reg .error_pass').css('display','block');
				$('#reg .succ_pass').css('display','none');
			}
		}
			
	})
	
	
	$('form').eq(0).form('pass').bind('keyup',function(){
		check_pass();
	})
	
	//密码验证函数
	function check_pass(){
		var value=trim($('form').eq(0).form('pass').value());
		var value_length=value.length;
		var code_length=0;
	
		
		//第一个必须条件的验证6-20位之间
		if(value_length>=6&&value_length<=20){
			$('#reg .info_pass .q1').html('●').css('color','green');
		}else{
			$('#reg .info_pass .q1').html('○').css('color','#666');
		}	
		
		//第二个必须条件的验证，字母或数字或非空字符，任意一个即可满足
		//\s表示空字符
		if(value_length>0&&!/\s/.test(value)){
			$('#reg .info_pass .q2').html('●').css('color','green');
		}else{
			$('#reg .info_pass .q2').html('○').css('color','#666');
		}
		
		//第三个必须条件的验证，大写字母，小写字母，数字，非空字符 任意两种混拼即可
		if(/[0-9]/.test(value)){
			code_length++;
		}
		if(/[a-z]/.test(value)){
			code_length++;
		}
		if(/[A-Z]/.test(value)){
			code_length++;
		}
		if(/[^0-9a-zA-Z]/.test(value)){
			code_length++;
		}
		
		if(code_length>=2){
			$('#reg .info_pass .q3').html('●').css('color','green');
		}else{
			$('#reg .info_pass .q3').html('○').css('color','#666');
		}
		
		//安全级别
		//高：大于等于10个字符，并且三种不同类别的字符混拼
		//中：大于等于8个字符，两种不同类别的字符混拼
		//低：大于等于1个字符
		//无：没有字符
		//判断的时候务必从高到低判断，防止高级别无法执行到
		if(value_length>=10&&code_length>=3){
			$('#reg .info_pass .s1').css('color','green');
			$('#reg .info_pass .s2').css('color','green');
			$('#reg .info_pass .s3').css('color','green');
			$('#reg .info_pass .s4').html('高').css('color','green');
		}else if(value_length>=8&&code_length>=2){
			$('#reg .info_pass .s1').css('color','#f60');
			$('#reg .info_pass .s2').css('color','#f60');
			$('#reg .info_pass .s3').css('color','#ccc');
			$('#reg .info_pass .s4').html('中').css('color','#f60');
		}else if(value_length>=1){
			$('#reg .info_pass .s1').css('color','maroon');
			$('#reg .info_pass .s2').css('color','#ccc');
			$('#reg .info_pass .s3').css('color','#ccc');
			$('#reg .info_pass .s4').html('低').css('color','maroon');
		}else{
			$('#reg .info_pass .s1').css('color','#ccc');
			$('#reg .info_pass .s2').css('color','#ccc');
			$('#reg .info_pass .s3').css('color','#ccc');
			$('#reg .info_pass .s4').html('');
		}
		
		if(value_length>=6&&value_length<=20&&!/\s/.test(value)&&code_length>=2) return true;
		return false;
	}

	//密码确认
	$('form').eq(0).form('notpass').bind('focus',function(){
		$('#reg .info_notpass').css('display','block');
		$('#reg .error_notpass').css('display','none');
		$('#reg .succ_notpass').css('display','none');
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$('reg .info_notpass').css('display','none');
		}else if(check_notpass()){
			$('#reg .info_notpass').css('display','none');
			$('#reg .error_notpass').css('display','none');
			$('#reg .succ_notpass').css('display','block');
		}else{
			$('#reg .info_notpass').css('display','none');
			$('#reg .error_notpass').css('display','block');
			$('#reg .succ_notpass').css('display','none');
		}
	})
	
	function check_notpass(){
		if(trim($('form').eq(0).form('notpass').value())==trim($('form').eq(0).form('pass').value())) return true;
	}

	// 提问
	$('form').eq(0).form('ques').bind('change',function(){
		if(check_ques()){
			$('#reg .error_ques').css('display','none');
		}
	})

	function check_ques(){
		if($('form').eq(0).form('ques').value()!=0)
			return true;
	}

	

	//回答
	$('form').eq(0).form('ans').bind('focus',function(){
		$('#reg .info_ans').css('display','block');
		$('#reg .error_ans').css('display','none');
		$('#reg .succ_ans').css('display','none');
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$('reg .info_ans').css('display','none');
		}else if(check_ans()){
			$('#reg .info_ans').css('display','none');
			$('#reg .error_ans').css('display','none');
			$('#reg .succ_ans').css('display','block');		
		}else{
			$('#reg .info_ans').css('display','none');
			$('#reg .error_ans').css('display','block');
			$('#reg .succ_ans').css('display','none');		
		}
	})

	function check_ans(){
		if(trim($('form').eq(0).form('ans').value()).length>=2&&trim($('form').eq(0).form('ans').value()).length<=32) return true;
	}

	//电子邮件
	$('form').eq(0).form('email').bind('focus',function(){
		if($(this).value().indexOf('@')==-1) $('#reg .all_email').css('display','block');

		$('#reg .info_email').css('display','block');
		$('#reg .error_email').css('display','none');
		$('#reg .succ_email').css('display','none');
	}).bind('blur',function(){
		$('#reg .all_email').css('display','none');
		if(trim($(this).value())==''){
			$('reg .info_email').css('display','none');
		}else if(check_email()){
			$('#reg .info_email').css('display','none');
			$('#reg .error_email').css('display','none');
			$('#reg .succ_email').css('display','block');		
		}else{
			$('#reg .info_email').css('display','none');
			$('#reg .error_email').css('display','block');
			$('#reg .succ_email').css('display','none');		
		}
	})

	function check_email(){
		if(/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($('form').eq(0).form('email').value()))) return true;
	}

	//电子邮件补全系统键入
	$('form').eq(0).form('email').bind('keyup',function(event){
		if($(this).value().indexOf('@')==-1){
			$('#reg .all_email').css('display','block');
			$('#reg .all_email li span').html($(this).value());
		}else{
			$('#reg .all_email').css('display','none');
		}


		$("#reg .all_email li").css('background','none');
		$("#reg .all_email li").css('color','#666');

		if(event.keyCode==40){
			if(this.index==undefined||this.index>=$('#reg .all_emaail li').length()-1){
				this.index=0;
			}else{
				this.index++;
			}
			$("#reg .all_email li").eq(this.index).css('background','#e5edf2');
			$("#reg .all_email li").eq(this.index).css('color','#369');
		}
		if(event.keyCode==38){
			if(this.index==undefined||this.index<=0){
				this.index=$('#reg .all_emaail li').length()-1;
			}else{
				this.index--;
			}
			$("#reg .all_email li").eq(this.index).css('background','#e5edf2');
			$("#reg .all_email li").eq(this.index).css('color','#369');
		}

		if(event.keyCode==13){
			$(this).value($('#reg .all_email li').eq(this.index).text());
			$('#reg .all_email').css('display','none');
		}
	 })

	//电子系统补全系统点击获取
	$('#reg .all_email li').bind('mousedown',function(){
		// alert($(this).html());	//不会过滤html元素(使用的是innerHTML)
		// alert($(this).first().innerText);  //旧版本火狐不支持innerText
		// alert($(this).first().textContent);  //除了ie8不支持，其他均支持

		$('form').eq(0).form('email').value($(this).text());
	})

	//ps:click事件是点击弹起后触发的，而blur失去焦点后，没有点击弹起的元素，导致无法触发

	//电子邮件补全系统鼠标移入移出效果
	$('#reg .all_email li').hover(function(){
		$(this).css('background','#e5edf2');
		$(this).css('color','#369');
	},function(){
		$(this).css('background','none');
		$(this).css('color','#666');
	})

	//生日
	var year=$('form').eq(0).form('year');
	var month=$('form').eq(0).form('month');
	var day=$('form').eq(0).form('day');

	var day30=[4,6,9,11];
	var day31=[1,3,5,7,8,12];

	// 注入年
	for(var i=1950;i<=2018;i++){
		year.first().add(new Option(i,i),undefined);
	}

	// 注入月
	for(var i=1;i<=12;i++){
		month.first().add(new Option(i,i),undefined);
	}

	// alert(inArray(day30,4));

	year.bind('change',select_day);
	month.bind('change',select_day);

    day.bind('change',function(){
    	if(check_birthday()){
    		$('#reg .error_birthday').css('display','none');
    	}
    })

	function check_birthday(){
		if(year.value()!=0&&month.value()!=0&&day.value()!=0){
			return true;
		}
	}

	function select_day(){
		if(year.value()!=0 && month.value()!=0){
			//清理之前的注入
			day.first().options.length=1;

			//不确定的日
			var cur_day=0;

			//注入日
			if(inArray(day31,parseInt(month.value()))){
				cur_day=31;
			}else if(inArray(day30,parseInt(month.value()))){
				cur_day=30;
			}else{
				// 2月
				// 闰年
				if((parseInt(year.value())%4 ==0&&parseInt(year.value())%100!=0) || parseInt(year.value())%400==0){
					cur_day=29;
				}else{
					cur_day=28;
				}
			}

			for(var i=1;i<=cur_day;i++){
				day.first().add(new Option(i,i),undefined);
			}

		}else{//如果其中一个为0
			//清理之前的注入
			day.first().options.length=1;
		}
	}

	//备注
	$('form').eq(0).form('ps').bind('keyup',check_ps).bind('paste',function(){
		// 粘贴事件会在内容粘贴到文本框之前执行
		// alert($('form').eq(0).form('ps').value());
		// 延迟时间
		setTimeout(check_ps,50);
	})

	//清尾
	$('#reg .ps .clear').bind('click',function(){
		$('form').eq(0).form('ps').value($('form').eq(0).form('ps').value().substring(0,200));
		check_ps();
	})

	// 计算字数
	function check_ps(){
		var num=200-$('form').eq(0).form('ps').value().length;
		if(num>=0){
			$('#reg .ps').eq(0).css('display','block');
			$('#reg .ps .num').eq(0).html(num);
			$('#reg .ps').eq(1).css('display','none');
			return true;
		}else{
			$('#reg .ps').eq(0).css('display','none');
			$('#reg .ps .num').eq(1).html(Math.abs(num)).css('color','red');
			$('#reg .ps').eq(1).css('display','block');
			return false;
		}
	}

	// 注册提交
	$('form').eq(0).form('sub').bind('click',function(){
		var flag=true;

		//用户名
		if(!check_user()){
			$('#reg .error_user').css('display','block');
			flag=false;
		}

		// 密码
		if(!check_pass()){
			$('#reg .error_pass').css('display','block');
			flag=false;
		}

		// 密码确认
		if(!check_notpass()){
			$('#reg .error_notpass').css('display','block');
			flag=false;
		}

		//提问 
		if(!check_ques()){
			$('#reg .error_ques').css('display','block');
			flag=false;
		}

		// 回答
		if(!check_ans()){
			$('#reg .error_ans').css('display','block');
			flag=false;
		}

		// 邮件
		if(!check_email()){
			$('#reg .error_email').css('display','block');
			flag=false;
		}

		// 生日
		if(!check_birthday()){
			$('#reg .error_birthday').css('display','block');
			flag=false;
		}
		
		if(!check_ps()){
			$('#reg .error_ps').css('display','block');
			flag=false;
		}

		if (flag) {
			// $('form').eq(0).first().submit();
			var _this=this;
			$('#loading').center(200,40).css('display','block');
			$('#loading p').html('正在提交注册中');
			_this.disabled=true;
			$(_this).css('background','url(images/reg_false.png) no-repeat');
			ajax({
				method:'post',
				url:'add.php',
				async:true,
				success:function(text){
					if(text==1){
						$('#loading').css('display','none');
						$('#success').css('display','block').center(200,40);
						$('#success p').html('注册成功，请登录...');	
						setTimeout(function(){
							$('#success').css('display','none');
							reg.css('display','none');
							screen.unlock().animate({
							  attr:'o',
							  target:0,
							  t:30,
							  step:5,
						  	});
						  	$('form').eq(0).first().reset();
							$('#reg .succ').css('display','none');
							_this.disabled=false;
							$(_this).css('background','url(images/reg.png) no-repeat');
						},1500);

					}
				},
				data:$('form').eq(0).serialize()
			});
		}
		
		// alert($('form').eq(0).eq(0).serialize());
	})

    /*
 	// 表单序列化
	function serialize(form){
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
    */
    // setCookie('user','lymn');
    // alert(getCookie('user'));
    // 登录
    $('form').eq(1).form('sub').click(function(){
    	if(/[a-zA-Z0-9_]{2,20}/.test(trim($('form').eq(1).form('user').value())) && $('form').eq(1).form('pass').value().length>=6){
    		$('#loading').css('display','block').center(200,40);
    		$('#loading p').html('正在尝试登录...');
    		var _this=this;
    		_this.disabled=true;
    		$(_this).css('background','url(images/login_false.png) no-repeat');
            ajax({
				method:'post',
				url:'is_login.php',
				async:true,
				success:function(text){
				   if(text==1){   //失败
				   	  $('#login .info').html('登录失败：用户名或密码不正确！');
				   	  _this.disabled=false;
    			   	  $(_this).css('background','url(images/login.png) no-repeat');
				   }else{  //成功
				   	  $('#login .info').html('');
				   	  $('#success').css('display','block').center(200,40);
				   	  $('#success p').html('登录成功，请稍后...');
				   	  setCookie('user',trim($('form').eq(1).form('user').value()));
				   	  setTimeout(function(){
				   	  	$('#success').css('display','none');
				   	  	login.css('display','none');
				   	  	screen.unlock().animate({
				   	  		attr:'o',
				   	  		target:0,
				   	  		step:10,
				   	  		t:30
				   	    }) 
				   	    $('form').eq(1).first().reset();	
				   	    // 延迟防止用户点击多次登录
				   	    _this.disabled=false;
    			   		$(_this).css('background','url(images/login.png) no-repeat'); 
    			   		$('#header .reg').css('display','none');
    			   		$('#header .enter').css('display','none'); 		
    			   		$('#header .info').css('display','block').html(getCookie('user')+',您好！');
				   	  },1500);
				   }
				   $('#loading').css('display','none');
				},
				data:$('form').eq(1).serialize()
			});
    	}else{
    		$('#login .info').html('登录失败：用户名或密码不合法！');
    	}
    })

	// 轮播器


	// 轮播器初始化
	// $('#banner img').css('display','none');
	// $('#banner img').eq(0).css('display','block');
	$('#banner img').opacity(0);
	$('#banner img').eq(0).opacity(100);
	$('#banner ul li').eq(0).css('color','#fff');
	// $('#banner strong').html($('#banner img').eq(0).first().alt);
	$('#banner strong').html($('#banner img').eq(0).attr('alt'));

	// 轮播器计数器
	var banner_index=1;

	// 自动轮播器
	var banner_timer=setInterval(banner_fn,3000);

	// 轮播器的种类
	var banner_type=2;  //1是透明轮播器，2是上下轮播器

	// 手动轮播
	$('#banner ul li').hover(function(){		
		clearInterval(banner_timer);
		// alert(banner_index);
		// alert(banner_index==0 ? $('#banner ul li').length()-1 : banner_index-1);
		// alert($('#banner ul li').css('color'));  //这个不对
		 // alert($(this).css('color'));   //这个对了
		if($(this).css('color')!='rgb(255, 255, 255)'&& $(this).css('color')!='#fff'){
			banner(this,banner_index==0 ? $('#banner ul li').length()-1 : banner_index-1);
		}
	},function(){
		banner_index=$(this).index()+1;
		banner_timer=setInterval(banner_fn,3000);
	})

	function banner(obj,prev){
		// $('#banner img').css('display','none');
		// $('#banner img').eq($(obj).index()).css('display','block');
		$('#banner ul li').css('color','#999');
		$(obj).css('color','#fff');
		$('#banner strong').html($('#banner img').eq($(obj).index()).attr('alt'));

		// $('#banner img').css('zIndex',1).opacity(0);
		if(banner_type==1){
			$('#banner img').eq(prev).animate({
				attr:'o',
				target:0,
				t:30,
				step:10
			}).css('zIndex',1);
			$('#banner img').eq($(obj).index()).animate({
				attr:'o',
				target:100,
				t:30,
				step:10
			}).css('zIndex',2);
		}else if(banner_type==2){
			$('#banner img').eq(prev).animate({
				attr:'y',
				target:200,
				t:30,
				step:10
			}).css('zIndex',1).opacity(100);
			$('#banner img').eq($(obj).index()).animate({
				attr:'y',
				target:0,
				t:30,
				step:10
			}).css('top','-200px').css('zIndex',2).opacity(100);
		}
		
	}

	function banner_fn(){
		if(banner_index>=$('#banner ul li').length()) banner_index=0;
		banner($('#banner ul li').eq(banner_index).first(),banner_index==0 ? $('#banner ul li').length()-1 : banner_index-1);
		banner_index++;
	}

	// 问题1，将sxrc地址替换到src中去
	// 当图片进入到可见区域的时候，将图片的xsrc的地址替换到src
	// alert($('.wait_load').first().xsrc);  //只有ie8可以获取xsrc

	// getAttribute()可以获取xsrc
	//$('.wait_load').eq(0).attr('src',$('.wait_load').eq(0).attr('xsrc'));

	// $('.wait_load').eq(0).bind('click',function(){
	// 	alert(this.src);    
	// 	alert($(this).attr('src'));
	// });
	// this从何而来？？？

	// 问题2，获取图片元素到最外层顶点元素的距离
	//alert($('.wait_load').first().offsetTop);  //ie7 ：0，chrome ：2149 或 996(不固定？？) 其他：983
	//alert(offsetTop($('.wait_load').first()));    //chrome浏览器多次结果不一致？？？
	
	//问题3，获取页面可视区域最低点的位置
	//alert(getInner().height+getScroll().top);  //IE和edge没用


	// 延迟加载
	$('.wait_load').opacity(0);
	// alert($(.wait_load).length());
	var wait_load=$('.wait_load');  //这样不用每次都执行，浪费资源
    $(window).bind('scroll',_wait_load);
    $(window).bind('resize',_wait_load);

    function _wait_load(){
    	setTimeout(function(){
    		for(var i=0;i<wait_load.length();i++){
    			var _this=wait_load.ge(i);  //换回原生状态

    			 if(getInner().height+getScroll().top>=offsetTop(_this)){
    				$(_this).attr('src',$(_this).attr('xsrc')).animate({
	    				attr:'o',
	    				target:100,
	    				t:30,
	    				step:10
	    			});
    			 }
    			
    		}
    	},100);
    }

    var photo_big=$('#photo_big');
	  photo_big.center(600,710).resize(function(){
		  if(reg.css('display')=='block'){	  
			  screen.lock();
		  }
	  });
	  $('#photo .dl dt img').click(function(){
			photo_big.center(600,710).css('display','block');    
			screen.lock().animate({
			  attr:'o',
			  start:0,
			  target:30,
			  t:30,
			  step:5,
			  type:0
			});
       
		    var temp_img=new Image(); //创建一个临时区域的图片对象
			//image有两个时间onload(图片加载成功) onerror（加载失败）
			// 等待加载完毕再显示
			$(temp_img).bind('load',function(){
				$('#photo_big .big .big_img').attr('src',temp_img.src)
				.animate({
				  	attr:'o',
				  	'target':100, 
				  	t:30,
				  	step:10
				}).css('width','600px').css('height','650px').css('top',0).opacity(0);  		
			})
			//IE必须把src放在load后面才有效
			temp_img.src=$(this).attr('bigsrc');//在后台加载这张图片到本地缓存

			var children=this.parentNode.parentNode;
			// alert($(children).index());
            
            prev_next_img(children);
	  });
	  $('#photo_big .close').click(function(){
		  photo_big.css('display','none');
		  //先执行动画
		  screen.animate({
			  attr:'o',
			  target:0,
			  t:30,
			  step:5,
			  fn:function(){
				  screen.unlock();
			  }
		  });
		  $('#photo_big .big .big_img').attr('src','images/loading.gif').css('width','300px').css('height','300px').css('top','100px');
	  });
	  photo_big.drag($('#photo_big h2').first());

	  // 图片加载
	  // $('#photo_big .big img').attr('src','http://imglf5.nosdn.127.net/img/TTJqU25JSFBBVnFBdHk0VzNtbnBscHprL1BwNjFocmxGZUI1R2I4KzRTVSs4VXFXZkFjb0J3PT0.jpg?imageView&thumbnail=2000y2829&type=jpg&quality=96&stripmeta=0&type=jpg')
	  // .css('height','600px');
	  // $('#photo_big .big .big_img').attr('src','http://imglf4.nosdn.127.net/img/d29ialBXQWRZdnNMWW4xSHpnU1BieTgremlzZGlqZHlINGl2U0lxeDFPOFJ0YjZ2dDBTbHBnPT0.jpg?imageView&thumbnail=2000y2457&type=jpg&quality=96&stripmeta=0&type=jpg')
	  // .animate({
	  // 	attr:'o',
	  // 	'target':100,
	  // 	t:30,
	  // 	step:10
	  // }).css('width','600px').css('height','650px').css('top',0).opacity(0);

	  // 问题1：loading的样式被大图的宽和高改变了
	  // 动画的渐变效果没有出现


	  // alert($('#photo_big .big img').first());
	  // alert(new Image());

	  // var temp_img=new Image(); //创建一个临时区域的图片对象
	  

	  // //image有两个时间onload(图片加载成功) onerror（加载失败）

	  // // 等待加载完毕再显示
	  // $(temp_img).bind('load',function(){
	  	
	  // 		$('#photo_big .big .big_img').attr('src',temp_img.src)
			//   .animate({
			//   	attr:'o',
			//   	'target':100,
			//   	t:30,
			//   	step:10
			//   }).css('width','600px').css('height','650px').css('top',0).opacity(0);  	
	  // })

	  // //IE必须把src放在load后面才有效
	  // temp_img.src=$(this).attr('bigsrc');//在后台加载这张图片到本地缓存

	  // 鼠标划过（左边）
	  $('#photo_big .big .left').hover(function(){
	  	 $('#photo_big .big .sl').animate({
	  	 	attr:'o',
	  	 	target:50,
	  	 	t:30,
	  	 	step:10
	  	 })
	  },function(){
	  	 $('#photo_big .big .sl').animate({
	  	 	attr:'o',
	  	 	target:0,
	  	 	t:30,
	  	 	step:10
	  	 })
	  })

	// 鼠标划过（有边）
	$('#photo_big .big .right').hover(function(){
		 $('#photo_big .big .sr').animate({
		 	attr:'o',
		 	target:70,
		 	t:30,
		 	step:10
		 })
	},function(){
		 $('#photo_big .big .sr').animate({
		 	attr:'o',
		 	target:0,
		 	t:30,
		 	step:10
		 })
	})

	// 上一张
	$('#photo_big .big .left').click(function(){
		$('#photo_big .big .big_img').attr('src','images/loading.gif').css('width','300px').css('height','300px').css('top','100px');
		
		var current_img=new Image();
		// 加载完毕再显示
		$(current_img).bind('load',function(){
			$('#photo_big .big .big_img').attr('src',current_img.src).animate({
				attr:'o',
				target:100,
				t:30,
				step:10
			}).opacity(0).css('width','600px').css('height','650px').css('top',0);
		})
		
		current_img.src=$('#photo_big .big .left').attr('src');
			
			
		// alert($('#photo_big .big .big_img').attr('index'));
		var children=$('#photo dl dt img').ge(prevIndex($('#photo_big .big .big_img').attr('index'),$('#photo').first())).parentNode.parentNode;
		prev_next_img(children);
	})

	// 下一张
	$('#photo_big .big .right').click(function(){
		// $('#photo_big .big .big_img').attr('src',$(this).attr('src'));
		$('#photo_big .big .big_img').attr('src','images/loading.gif').css('width','300px').css('height','300px').css('top','100px');
		
		var current_img=new Image();
		// 加载完毕再显示
		$(current_img).bind('load',function(){
			$('#photo_big .big .big_img').attr('src',current_img.src).animate({
				attr:'o',
				target:100,
				t:30,
				step:10
			}).opacity(0).css('width','600px').css('height','650px').css('top',0);
		})
		
		current_img.src=$('#photo_big .big .left').attr('src');


		// alert($('#photo_big .big .big_img').attr('index'));
		var children=$('#photo dl dt img').ge(nextIndex($('#photo_big .big .big_img').attr('index'),$('#photo').first())).parentNode.parentNode;
		prev_next_img(children);
	})

	function prev_next_img(children){
		var prev=prevIndex($(children).index(),children.parentNode);
        var next=nextIndex($(children).index(),children.parentNode);

        var prev_img=new Image();
        var next_img=new Image();

        prev_img.src=$('#photo dl dt img').eq(prev).attr('bigsrc');
        next_img.src=$('#photo dl dt img').eq(next).attr('bigsrc');

        $('#photo_big .big .left').attr('src',prev_img.src);
        $('#photo_big .big .right').attr('src',next_img.src);
        $('#photo_big .big .big_img').attr('index',$(children).index());
        $('#photo_big .big .index').html(parseInt($(children).index())+1+'/'+$('#photo dl dt img').length());
	}	

	// 使用ajax
	/*
	$(document).click(function(){
		ajax({
			method:'post',
			url:'demo.php',
			async:true,
			success:function(text){
				alert(text);
			},
			data:{
				name:'Le&e',
				age:'100'
			}
		});
	})
	 */
	var blog=$('#blog');
	blog.center(580,320).resize(function(){
	  if(blog.css('display')=='block'){	  
		  screen.lock();
	  }
	});
	$('#header member .blog').click(function(){
	  blog.center(580,320).css('display','block');    
	  screen.lock().animate({
		  attr:'o',
		  start:0,
		  target:30,
		  t:30,
		  step:5,
		  type:0
	  });
	});
	$('#blog .close').click(function(){
	  blog.css('display','none');
	  //先执行动画
	  screen.animate({
		  attr:'o',
		  target:0,
		  t:30,
		  step:5,
		  fn:function(){
			  screen.unlock();
		  }
	  });
	});

	//拖拽
	blog.drag($('#blog h2').first());

	$('form').eq(2).form('sub').click(function(){
		if(trim($('form').eq(2).form('title').value()).length<=0||trim($('form').eq(2).form('content').value()).length<=0){
			$('#blog .info').html('发表失败，标题或内容不得为空！');
		}else{
			var _this=this;
			$('#loading').center(200,40).css('display','block');
			$('#loading p').html('正在发表文章中');
			_this.disabled=true;
			$(_this).css('background','url(images/blog_false.png) no-repeat');
			ajax({
				method:'post',
				url:'add_blog.php',
				async:true,
				success:function(text){
					if(text==1){
						$('#loading').css('display','none');
						$('#success').css('display','block').center(200,40);
						$('#success p').html('发表成功，请稍后...');	
						setTimeout(function(){
							$('#success').css('display','none');
							blog.css('display','none');
							screen.unlock().animate({
							  attr:'o',
							  target:0,
							  t:30,
							  step:5,
						  	});
						  	$('form').eq(2).first().reset();
							_this.disabled=false;
							$(_this).css('background','url(images/blog.png) no-repeat');
							getBlog();
						},1500);

					}
				},
				data:$('form').eq(2).serialize()
			});
		}
	})
    
    function getBlog(){
    	$('#index').html('<span class="loading"></span>');
		$('#index .loading').show();
		ajax({
			method:'post',
			url:'get_blog.php',
			data:{},
			success:function(text){
				// alert(text);
				$('#index .loading').hide();
				var html='';
				var json=JSON.parse(text);  //这里ie7不兼容个，需要引入json2.json，暂时没引入
				for(var i=0;i<json.length;i++){
					html+='<div class="content"><h2><em>'+json[i].date+'</em>'+json[i].title+'</h2><p>'+json[i].content+'</p></div>';
					
				}
				$('#index').html(html);
				for(var i=0;i<json.length;i++){
					$('#index .content').eq(i).animate({
						attr:'o',
						target:100,
						step:10,
						t:30
					})
				}
			},
			async:true
		})
    }
  
	// 获取博文列表
	getBlog();
	
	// 换肤
	var skin=$('#skin');
	skin.center(670,400).resize(function(){
	  if(skin.css('display')=='block'){	  
		  screen.lock();
	  }
	});
	$('#header member .skin').click(function(){
		skin.center(670,400).css('display','block');    
		screen.lock().animate({
		  attr:'o',
		  start:0,
		  target:30,
		  t:30,
		  step:5,
		  type:0
		});
		$('#skin .skin_bg').html('<span class="loading"></span>');//之后会被替换掉
		ajax({
			method:'post',
			url:'get_skin.php',
			data:{
				'type':'all'
			},
			success:function(text){
				var json=JSON.parse(text);
				var html='';
				for(var i=0;i<json.length;i++){
					html+='<dl><dt><img src="images/'+json[i].small_bg+'" big_bg="'+json[i].big_bg+'" bg_color="'+json[i].bg_color+'"></dt><dd>'+json[i].bg_text+'</dt></dl>'	
				}
				$('#skin .skin_bg').html(html).opacity(0).animate({
					attr:'o',
					target:100,
					step:10,
					t:30
				});
				$('#skin dl dt img').click(function(){
					$('body').css('background',$(this).attr('bg_color')+' '+'url(images/'+$(this).attr('big_bg')+') no-repeat');
					ajax({
				    	method:'post',
						url:'get_skin.php',
						data:{
							'type':'set',
							'big_bg':$(this).attr('big_bg')
						},
						success:function(text){
						 	$('#success').show().center(200,40);
						 	$('#success p').html('更换皮肤成功...');
						 	setTimeout(function(){
						 		$('#success').hide();
						 		skin.hide();
						 		screen.unlock().animate({
						 			attr:'o',
						 			target:0,
						 			step:10,
						 			t:30
						 		})
						 	},1500);
						},
						async:true
				    });
				})		
			},
			async:true
		});
		
	});
	$('#skin .close').click(function(){
	  skin.css('display','none');
	  //先执行动画
	  screen.animate({
		  attr:'o',
		  target:0,
		  t:30,
		  step:5,
		  fn:function(){
			  screen.unlock();
		  }
	  });
	});

	//拖拽
	skin.drag($('#skin h2').first());

	// 自动显示背景图片
    ajax({
    	method:'post',
		url:'get_skin.php',
		data:{
			'type':'main'
		},
		success:function(text){
			var json=JSON.parse(text);
			$('body').css('background',json.bg_color+' '+'url(images/'+json.big_bg+') no-repeat');
		},
		async:true
    });


})


 


















