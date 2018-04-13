<?php
	require "config.php";

	$query=mysql_query("SELECT user FROM blog_user WHERE user='{$_POST['user']}'") or die('SQL错误！'.mysql_error());
	// 判断一个常量是否存在
	if(mysql_fetch_array($query,MYSQL_ASSOC)){
		echo 1;
	}

	mysql_close();
?>