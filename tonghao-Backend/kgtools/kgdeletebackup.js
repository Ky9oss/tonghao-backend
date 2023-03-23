const express = require('express');
const kgtime = require('./kgtime')
const fs = require('fs');
const moment = require('moment');
const cron = require('node-cron');
const path = require('path');
const { exec } = require('child_process');




const backupDir = path.join(__dirname, '../../backup/');

//定期删除备份
function deleteBackup(){
	// 定义需要保留的最大日志文件天数
	const maxDays = 30;

	// 在每个星期天的午夜删除旧备份文件
	// 分钟0 小时5 日* 月* 周0
	cron.schedule('0 7 * * 0', () => {
	  // 获取所有
	  fs.readdir(backupDir, (err, files) => {
	    if (err) throw err;

	    // 遍历所有文件
	    files.forEach((file) => {
	      // 获取文件的完整路径
	      const filePath = path.join(backupDir, file);
		    console.log(filePath)

	      // 检查文件是否是日志文件
	      if (file.endsWith('.tar.gz')) {
		// 获取文件的详细信息
		fs.stat(filePath, (err, stats) => {
		  if (err) console.log(err);

		  // 计算文件的年龄
		  const fileAge = moment().diff(moment(stats.birthtime), 'days');

		  // 如果文件的年龄超过最大天数，则删除它
		  if (fileAge > maxDays) {
		    fs.unlink(filePath, (err) => {
		      if (err) console.log(err);
		      console.log('[!!!] 执行了一次备份清理！')
		    });
		  }
		});
	      }
	    });
	  }),
	{
	  scheduled: true,
	  timezone: "Asia/Shanghai"
	};
	});
}

module.exports = {
	deleteBackup: deleteBackup,
}


