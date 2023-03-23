const express = require('express');
const kgtime = require('./kgtime')
const fs = require('fs');
const moment = require('moment');
const cron = require('node-cron');
const path = require('path');
const { exec } = require('child_process');




const backupDir = path.join(__dirname, '..');
const backupFilePath = '../backup/'+kgtime.getBackupName();

//定期生成备份
function createBackup(){
	// 在每个星期天的午夜生成备份文件
	// 分钟0 小时5 日* 月* 周0
	cron.schedule('0 5 * * 0', () => {
		exec(`tar -czf ${backupFilePath} ${backupDir}`, (err, stdout, stderr) => {
	    if (err) {
	      console.error(`备份失败：${err}`);
	      return;
	    }
	    console.log(`备份成功：${backupFilePath}`);
  });
	});
}


module.exports = {
	createBackup: createBackup,
}


