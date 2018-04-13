<?php
	require "config.php";

	$query="INSERT INTO blog_blog(title,content,date) 
			VALUES ('{$_POST['title']}','{$_POST['content']}',NOW())";

	
	@mysql_query($query) or die('SQL错误!'+mysql_error());

	echo mysql_affected_rows();

	mysql_close();
?>