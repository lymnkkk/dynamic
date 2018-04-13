<?php
	require "config.php";

    $_pass=sha1($_POST['pass']);
	$query=mysql_query("SELECT user FROM blog_user WHERE user='{$_POST['user']}' AND pass='$_pass'") or die('SQL错误！'.mysql_error());

	if(mysql_fetch_array($query ,MYSQL_ASSOC)){  //登录成功
		sleep(3);
		echo 0;
	}else{  //登录失败
		sleep(3);
		echo 1;
	}

	mysql_close();
?>