<?php
	require "config.php";

	$query=mysql_query("SELECT title,content FROM blog_blog ORDER BY id DESC LIMIT 0,3") or die('SQL错误！'.mysql_error());

    $json='';
	while(!!$row=mysql_fetch_array($query,MYSQL_ASSOC)){
		// $json.=json_encode($row).',';
		$json.=json_encode($row).',';
	}
	// print_r($json);
	// sleep(3);
	echo '['.substr($json,0,strlen($json)-1).']';
	mysql_close();

	
?>