       /*
window.onload=function(){
  //��������
  $().getClass('member').hover(function(){
		  $(this).css('background','url(images/up.png) no-repeat 50px');   //����������
		  $().getClass('member_ul').show(); 
	  },function(){
		  $(this).css('background','url(images/down.png) no-repeat 50px');
		  $().getClass('member_ul').css('display','none');
  });
  
  //��¼��
  var login=$().getId('login');
  $().getId('login').center(250,350).resize(function(){
	  if($().getId('login').css('display')=='block'){	  
		  $().getId('screen').lock();
	  }
  });
  $().getClass('enter').click(function(){
	  $().getId('login').center(250,350);
	  $().getId('login').css('display','block');    //??��֪��Ϊʲô����$().getId()���ܸĳ�login
	  $().getId('screen').lock();
  });
  $().getClass('close').click(function(){
	  $().getId('login').css('display','none');
	  $().getId('screen').unlock();
  });
  $().addRule(0,'ul',"font-size:40px",0);
  $().removeRule(0,0);
  
  
  
  
  var oDiv=document.getElementById('login');
  
  //��ק����
  //1.�ȵ���ȥ
  //2.�ڵ��µ����屻ѡ�У�����move�ƶ�
  //3.ʰ����ֹ꣬ͣ�ƶ�
  //���ĳ�����壬��oDiv���ɣ�move��up��ȫ������Ҳ���������ĵ�ͨ�ã�Ӧ����document

//��ק
  //alert($().getTagName('h2').getElement(0));
 //alert($().getTagName('span').getElement(0))
  var login=$().getId('login');
  //login.drag([$().getTagName('h2').getElement(0),$().getTagName('span').getElement(0)]); 
  login.drag();
  //$().bbb();
  

} 
*/

/*
//��װDOM����
//�������ֶ�����
$(function(){
	alert(document.body);
})

$().ready(function(){
	alert(document.body);
})
*/

$(function(){
	//��������
  $('#header .member').hover(function(){
		  $(this).css('background','url(images/up.png) no-repeat 50px');   //����������
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
  
  
  //���ֵĻ���
  var screen=$('#screen'); 
   //��¼��
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
	  //��ִ�ж���
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
  
  
  //ע���
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
	  //��ִ�ж���
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
  
  //��ק
  login.drag($('#login h2').first());
  reg.drag($('#reg h2').first());
  
  //�ٶȷ����ʼ��λ��
   $('#share').css('top',getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2+'px');
    
	/*
	addEvent(window,'scroll',function(){
		$('#share').animate({
			attr:'y',
			target:getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2
		})
	})
	*/
	//�����滻����������ӣ�Ϊ�˷�װ������
	$(window).bind('scroll',function(){
		setTimeout(function(){
			$('#share').animate({
				attr:'y',
				target:getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2
			})
		},100);  //�ӳ�һ�£�������ƽ��һЩ
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
	
	
	//��������
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

	
	//����֤

	//��ʼ��������
	$('form').eq(0).first().reset();
	// ͬ����
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
			$('#reg .error_user').html('���벻�Ϸ������������룡');
			return false;
		}else{
			// async��Ϊfalse ��Ϊͬ�������򲻹��������flag����true

			// ��������û�дﵽԤ��Ч��
			$('#reg .loading').css('display','block');
			$('#reg .info_user').css('display','none');
			ajax({
				method:'post',
				url:'is_user.php',
				data:$('form').eq(0).serialize(),
				success:function(text){
					if(text==1){
						flag=false;
						$('#reg .error_user').html('�û����ѱ�ռ�ã�');
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
	
	//������֤
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
	
	//������֤����
	function check_pass(){
		var value=trim($('form').eq(0).form('pass').value());
		var value_length=value.length;
		var code_length=0;
	
		
		//��һ��������������֤6-20λ֮��
		if(value_length>=6&&value_length<=20){
			$('#reg .info_pass .q1').html('��').css('color','green');
		}else{
			$('#reg .info_pass .q1').html('��').css('color','#666');
		}	
		
		//�ڶ���������������֤����ĸ�����ֻ�ǿ��ַ�������һ����������
		//\s��ʾ���ַ�
		if(value_length>0&&!/\s/.test(value)){
			$('#reg .info_pass .q2').html('��').css('color','green');
		}else{
			$('#reg .info_pass .q2').html('��').css('color','#666');
		}
		
		//������������������֤����д��ĸ��Сд��ĸ�����֣��ǿ��ַ� �������ֻ�ƴ����
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
			$('#reg .info_pass .q3').html('��').css('color','green');
		}else{
			$('#reg .info_pass .q3').html('��').css('color','#666');
		}
		
		//��ȫ����
		//�ߣ����ڵ���10���ַ����������ֲ�ͬ�����ַ���ƴ
		//�У����ڵ���8���ַ������ֲ�ͬ�����ַ���ƴ
		//�ͣ����ڵ���1���ַ�
		//�ޣ�û���ַ�
		//�жϵ�ʱ����شӸߵ����жϣ���ֹ�߼����޷�ִ�е�
		if(value_length>=10&&code_length>=3){
			$('#reg .info_pass .s1').css('color','green');
			$('#reg .info_pass .s2').css('color','green');
			$('#reg .info_pass .s3').css('color','green');
			$('#reg .info_pass .s4').html('��').css('color','green');
		}else if(value_length>=8&&code_length>=2){
			$('#reg .info_pass .s1').css('color','#f60');
			$('#reg .info_pass .s2').css('color','#f60');
			$('#reg .info_pass .s3').css('color','#ccc');
			$('#reg .info_pass .s4').html('��').css('color','#f60');
		}else if(value_length>=1){
			$('#reg .info_pass .s1').css('color','maroon');
			$('#reg .info_pass .s2').css('color','#ccc');
			$('#reg .info_pass .s3').css('color','#ccc');
			$('#reg .info_pass .s4').html('��').css('color','maroon');
		}else{
			$('#reg .info_pass .s1').css('color','#ccc');
			$('#reg .info_pass .s2').css('color','#ccc');
			$('#reg .info_pass .s3').css('color','#ccc');
			$('#reg .info_pass .s4').html('');
		}
		
		if(value_length>=6&&value_length<=20&&!/\s/.test(value)&&code_length>=2) return true;
		return false;
	}

	//����ȷ��
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

	// ����
	$('form').eq(0).form('ques').bind('change',function(){
		if(check_ques()){
			$('#reg .error_ques').css('display','none');
		}
	})

	function check_ques(){
		if($('form').eq(0).form('ques').value()!=0)
			return true;
	}

	

	//�ش�
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

	//�����ʼ�
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

	//�����ʼ���ȫϵͳ����
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

	//����ϵͳ��ȫϵͳ�����ȡ
	$('#reg .all_email li').bind('mousedown',function(){
		// alert($(this).html());	//�������htmlԪ��(ʹ�õ���innerHTML)
		// alert($(this).first().innerText);  //�ɰ汾�����֧��innerText
		// alert($(this).first().textContent);  //����ie8��֧�֣�������֧��

		$('form').eq(0).form('email').value($(this).text());
	})

	//ps:click�¼��ǵ������󴥷��ģ���blurʧȥ�����û�е�������Ԫ�أ������޷�����

	//�����ʼ���ȫϵͳ��������Ƴ�Ч��
	$('#reg .all_email li').hover(function(){
		$(this).css('background','#e5edf2');
		$(this).css('color','#369');
	},function(){
		$(this).css('background','none');
		$(this).css('color','#666');
	})

	//����
	var year=$('form').eq(0).form('year');
	var month=$('form').eq(0).form('month');
	var day=$('form').eq(0).form('day');

	var day30=[4,6,9,11];
	var day31=[1,3,5,7,8,12];

	// ע����
	for(var i=1950;i<=2018;i++){
		year.first().add(new Option(i,i),undefined);
	}

	// ע����
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
			//����֮ǰ��ע��
			day.first().options.length=1;

			//��ȷ������
			var cur_day=0;

			//ע����
			if(inArray(day31,parseInt(month.value()))){
				cur_day=31;
			}else if(inArray(day30,parseInt(month.value()))){
				cur_day=30;
			}else{
				// 2��
				// ����
				if((parseInt(year.value())%4 ==0&&parseInt(year.value())%100!=0) || parseInt(year.value())%400==0){
					cur_day=29;
				}else{
					cur_day=28;
				}
			}

			for(var i=1;i<=cur_day;i++){
				day.first().add(new Option(i,i),undefined);
			}

		}else{//�������һ��Ϊ0
			//����֮ǰ��ע��
			day.first().options.length=1;
		}
	}

	//��ע
	$('form').eq(0).form('ps').bind('keyup',check_ps).bind('paste',function(){
		// ճ���¼���������ճ�����ı���֮ǰִ��
		// alert($('form').eq(0).form('ps').value());
		// �ӳ�ʱ��
		setTimeout(check_ps,50);
	})

	//��β
	$('#reg .ps .clear').bind('click',function(){
		$('form').eq(0).form('ps').value($('form').eq(0).form('ps').value().substring(0,200));
		check_ps();
	})

	// ��������
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

	// ע���ύ
	$('form').eq(0).form('sub').bind('click',function(){
		var flag=true;

		//�û���
		if(!check_user()){
			$('#reg .error_user').css('display','block');
			flag=false;
		}

		// ����
		if(!check_pass()){
			$('#reg .error_pass').css('display','block');
			flag=false;
		}

		// ����ȷ��
		if(!check_notpass()){
			$('#reg .error_notpass').css('display','block');
			flag=false;
		}

		//���� 
		if(!check_ques()){
			$('#reg .error_ques').css('display','block');
			flag=false;
		}

		// �ش�
		if(!check_ans()){
			$('#reg .error_ans').css('display','block');
			flag=false;
		}

		// �ʼ�
		if(!check_email()){
			$('#reg .error_email').css('display','block');
			flag=false;
		}

		// ����
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
			$('#loading p').html('�����ύע����');
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
						$('#success p').html('ע��ɹ������¼...');	
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
 	// �����л�
	function serialize(form){
		var parts={};
		for(var i=0;i<form.elements.length;i++){
			var filed=form.elements[i];
			switch(filed.type){
				// �����л�������type��button,submit,reset,file�Լ��ֶμ�
				case undefined:
				case 'button':
				case 'submit':			
				case 'reset':
				case 'file':
					break;
				// ��ѡ��͸�ѡ��
				case 'radio':
				case 'checkbox':
					if(!filed.selected)  break;
				// �����˵�
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
				    			//����ie7
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
    // ��¼
    $('form').eq(1).form('sub').click(function(){
    	if(/[a-zA-Z0-9_]{2,20}/.test(trim($('form').eq(1).form('user').value())) && $('form').eq(1).form('pass').value().length>=6){
    		$('#loading').css('display','block').center(200,40);
    		$('#loading p').html('���ڳ��Ե�¼...');
    		var _this=this;
    		_this.disabled=true;
    		$(_this).css('background','url(images/login_false.png) no-repeat');
            ajax({
				method:'post',
				url:'is_login.php',
				async:true,
				success:function(text){
				   if(text==1){   //ʧ��
				   	  $('#login .info').html('��¼ʧ�ܣ��û��������벻��ȷ��');
				   	  _this.disabled=false;
    			   	  $(_this).css('background','url(images/login.png) no-repeat');
				   }else{  //�ɹ�
				   	  $('#login .info').html('');
				   	  $('#success').css('display','block').center(200,40);
				   	  $('#success p').html('��¼�ɹ������Ժ�...');
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
				   	    // �ӳٷ�ֹ�û������ε�¼
				   	    _this.disabled=false;
    			   		$(_this).css('background','url(images/login.png) no-repeat'); 
    			   		$('#header .reg').css('display','none');
    			   		$('#header .enter').css('display','none'); 		
    			   		$('#header .info').css('display','block').html(getCookie('user')+',���ã�');
				   	  },1500);
				   }
				   $('#loading').css('display','none');
				},
				data:$('form').eq(1).serialize()
			});
    	}else{
    		$('#login .info').html('��¼ʧ�ܣ��û��������벻�Ϸ���');
    	}
    })

	// �ֲ���


	// �ֲ�����ʼ��
	// $('#banner img').css('display','none');
	// $('#banner img').eq(0).css('display','block');
	$('#banner img').opacity(0);
	$('#banner img').eq(0).opacity(100);
	$('#banner ul li').eq(0).css('color','#fff');
	// $('#banner strong').html($('#banner img').eq(0).first().alt);
	$('#banner strong').html($('#banner img').eq(0).attr('alt'));

	// �ֲ���������
	var banner_index=1;

	// �Զ��ֲ���
	var banner_timer=setInterval(banner_fn,3000);

	// �ֲ���������
	var banner_type=2;  //1��͸���ֲ�����2�������ֲ���

	// �ֶ��ֲ�
	$('#banner ul li').hover(function(){		
		clearInterval(banner_timer);
		// alert(banner_index);
		// alert(banner_index==0 ? $('#banner ul li').length()-1 : banner_index-1);
		// alert($('#banner ul li').css('color'));  //�������
		 // alert($(this).css('color'));   //�������
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

	// ����1����sxrc��ַ�滻��src��ȥ
	// ��ͼƬ���뵽�ɼ������ʱ�򣬽�ͼƬ��xsrc�ĵ�ַ�滻��src
	// alert($('.wait_load').first().xsrc);  //ֻ��ie8���Ի�ȡxsrc

	// getAttribute()���Ի�ȡxsrc
	//$('.wait_load').eq(0).attr('src',$('.wait_load').eq(0).attr('xsrc'));

	// $('.wait_load').eq(0).bind('click',function(){
	// 	alert(this.src);    
	// 	alert($(this).attr('src'));
	// });
	// this�Ӻζ���������

	// ����2����ȡͼƬԪ�ص�����㶥��Ԫ�صľ���
	//alert($('.wait_load').first().offsetTop);  //ie7 ��0��chrome ��2149 �� 996(���̶�����) ������983
	//alert(offsetTop($('.wait_load').first()));    //chrome�������ν����һ�£�����
	
	//����3����ȡҳ�����������͵��λ��
	//alert(getInner().height+getScroll().top);  //IE��edgeû��


	// �ӳټ���
	$('.wait_load').opacity(0);
	// alert($(.wait_load).length());
	var wait_load=$('.wait_load');  //��������ÿ�ζ�ִ�У��˷���Դ
    $(window).bind('scroll',_wait_load);
    $(window).bind('resize',_wait_load);

    function _wait_load(){
    	setTimeout(function(){
    		for(var i=0;i<wait_load.length();i++){
    			var _this=wait_load.ge(i);  //����ԭ��״̬

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
       
		    var temp_img=new Image(); //����һ����ʱ�����ͼƬ����
			//image������ʱ��onload(ͼƬ���سɹ�) onerror������ʧ�ܣ�
			// �ȴ������������ʾ
			$(temp_img).bind('load',function(){
				$('#photo_big .big .big_img').attr('src',temp_img.src)
				.animate({
				  	attr:'o',
				  	'target':100, 
				  	t:30,
				  	step:10
				}).css('width','600px').css('height','650px').css('top',0).opacity(0);  		
			})
			//IE�����src����load�������Ч
			temp_img.src=$(this).attr('bigsrc');//�ں�̨��������ͼƬ�����ػ���

			var children=this.parentNode.parentNode;
			// alert($(children).index());
            
            prev_next_img(children);
	  });
	  $('#photo_big .close').click(function(){
		  photo_big.css('display','none');
		  //��ִ�ж���
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

	  // ͼƬ����
	  // $('#photo_big .big img').attr('src','http://imglf5.nosdn.127.net/img/TTJqU25JSFBBVnFBdHk0VzNtbnBscHprL1BwNjFocmxGZUI1R2I4KzRTVSs4VXFXZkFjb0J3PT0.jpg?imageView&thumbnail=2000y2829&type=jpg&quality=96&stripmeta=0&type=jpg')
	  // .css('height','600px');
	  // $('#photo_big .big .big_img').attr('src','http://imglf4.nosdn.127.net/img/d29ialBXQWRZdnNMWW4xSHpnU1BieTgremlzZGlqZHlINGl2U0lxeDFPOFJ0YjZ2dDBTbHBnPT0.jpg?imageView&thumbnail=2000y2457&type=jpg&quality=96&stripmeta=0&type=jpg')
	  // .animate({
	  // 	attr:'o',
	  // 	'target':100,
	  // 	t:30,
	  // 	step:10
	  // }).css('width','600px').css('height','650px').css('top',0).opacity(0);

	  // ����1��loading����ʽ����ͼ�Ŀ�͸߸ı���
	  // �����Ľ���Ч��û�г���


	  // alert($('#photo_big .big img').first());
	  // alert(new Image());

	  // var temp_img=new Image(); //����һ����ʱ�����ͼƬ����
	  

	  // //image������ʱ��onload(ͼƬ���سɹ�) onerror������ʧ�ܣ�

	  // // �ȴ������������ʾ
	  // $(temp_img).bind('load',function(){
	  	
	  // 		$('#photo_big .big .big_img').attr('src',temp_img.src)
			//   .animate({
			//   	attr:'o',
			//   	'target':100,
			//   	t:30,
			//   	step:10
			//   }).css('width','600px').css('height','650px').css('top',0).opacity(0);  	
	  // })

	  // //IE�����src����load�������Ч
	  // temp_img.src=$(this).attr('bigsrc');//�ں�̨��������ͼƬ�����ػ���

	  // ��껮������ߣ�
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

	// ��껮�����бߣ�
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

	// ��һ��
	$('#photo_big .big .left').click(function(){
		$('#photo_big .big .big_img').attr('src','images/loading.gif').css('width','300px').css('height','300px').css('top','100px');
		
		var current_img=new Image();
		// �����������ʾ
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

	// ��һ��
	$('#photo_big .big .right').click(function(){
		// $('#photo_big .big .big_img').attr('src',$(this).attr('src'));
		$('#photo_big .big .big_img').attr('src','images/loading.gif').css('width','300px').css('height','300px').css('top','100px');
		
		var current_img=new Image();
		// �����������ʾ
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

	// ʹ��ajax
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
	  //��ִ�ж���
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

	//��ק
	blog.drag($('#blog h2').first());

	$('form').eq(2).form('sub').click(function(){
		if(trim($('form').eq(2).form('title').value()).length<=0||trim($('form').eq(2).form('content').value()).length<=0){
			$('#blog .info').html('����ʧ�ܣ���������ݲ���Ϊ�գ�');
		}else{
			var _this=this;
			$('#loading').center(200,40).css('display','block');
			$('#loading p').html('���ڷ���������');
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
						$('#success p').html('����ɹ������Ժ�...');	
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
				var json=JSON.parse(text);  //����ie7�����ݸ�����Ҫ����json2.json����ʱû����
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
  
	// ��ȡ�����б�
	getBlog();
	
	// ����
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
		$('#skin .skin_bg').html('<span class="loading"></span>');//֮��ᱻ�滻��
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
						 	$('#success p').html('����Ƥ���ɹ�...');
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
	  //��ִ�ж���
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

	//��ק
	skin.drag($('#skin h2').first());

	// �Զ���ʾ����ͼƬ
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


 


















