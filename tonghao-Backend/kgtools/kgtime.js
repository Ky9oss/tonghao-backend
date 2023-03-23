var express = require('express');


function getTime(){
	var nowdate = new Date();
	var year = nowdate.getFullYear();
	var month = nowdate.getMonth() + 1;
	var date = nowdate.getDate();
	var hours = nowdate.getHours();
	var minutes = nowdate.getMinutes();
	if(hours<10){
		hours = '0'+hours;
	}
	if(minutes<10){
		minutes = '0'+minutes;
	}
	return year+'/'+month+'/'+date+' '+hours+':'+minutes;
}


function getLogTime(){
	var nowdate = new Date();
	var year = nowdate.getFullYear();
	var month = nowdate.getMonth() + 1;
	var date = nowdate.getDate();
	var hours = nowdate.getHours();
	var minutes = nowdate.getMinutes();
	if(hours<10){
		hours = '0'+hours;
	}
	if(minutes<10){
		minutes = '0'+minutes;
	}
	return '['+year+'-'+month+'-'+date+' '+hours+':'+minutes+'] ';
}


function getLogName(){
	var nowdate = new Date();
	var year = nowdate.getFullYear();
	var month = nowdate.getMonth() + 1;
	var date = nowdate.getDate();
	var hours = nowdate.getHours();
	var minutes = nowdate.getMinutes();
	var seconds = nowdate.getSeconds();
	if(hours<10){
		hours = '0'+hours;
	}
	if(minutes<10){
		minutes = '0'+minutes;
	}
	if(seconds<10){
		seconds = '0'+seconds;
	}
	return year+'-'+month+'-'+date+'-'+hours+'-'+minutes+'-'+seconds+'.log';
}



function getBackupName(){
	var nowdate = new Date();
	var year = nowdate.getFullYear();
	var month = nowdate.getMonth() + 1;
	var date = nowdate.getDate();
	var hours = nowdate.getHours();
	var minutes = nowdate.getMinutes();
	var seconds = nowdate.getSeconds();
	if(hours<10){
		hours = '0'+hours;
	}
	if(minutes<10){
		minutes = '0'+minutes;
	}
	if(seconds<10){
		seconds = '0'+seconds;
	}
	return 'backup-'+year+'-'+month+'-'+date+'-'+hours+'-'+minutes+'-'+seconds+'.tar.gz';
}


module.exports = {
	getTime: getTime,
	getLogTime: getLogTime,
	getLogName: getLogName,
	getBackupName: getBackupName,
}
