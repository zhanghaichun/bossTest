<?php
	$name = $_POST['username'];
	$age = $_POST['age'];
	$address = $_POST['address'];
	
	$gender = $_POST['gender'];
	$favLang = $_POST['fav'];
	$answer = $_POST['question'];
	
	echo ("个人信息：<br>");
	echo ("name: ".$name.", age: ".$age.", address: ".$address."<br>");
	echo ("gender: ".$gender.", Favorite Language: ".$favLang.", Question Answer: ".$answer."<br>");
	// echo ("gender: ".$gender.", Favorite Language: ".$favLang.", Question Answer: "."<br>");
	
	var_dump($answer);