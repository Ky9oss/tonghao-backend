const express = require('express');
const kgtime = require('./kgtime')
const fs = require('fs');
const moment = require('moment');
const cron = require('node-cron');
const path = require('path');
const morgan = require('morgan');




// 创建数据库新日志
function dbLog(){
	var logName = kgtime.getLogName();
	var logStream = fs.createWriteStream('log/db/'+logName, { flags: 'w' });

	// 重定向console.log输出到日志文件
	console.log = function(message) {
	  var time = kgtime.getLogTime()
	  logStream.write(`${time} ${message}\n`);
	  process.stdout.write(`${time} ${message}\n`);
	};
}

// 创建路由新日志
function routesLog(arg1){
	var logName = 'log/routes/'+arg1+'-'+kgtime.getLogName();
	var logStream = fs.createWriteStream(logName, { flags: 'a' });

	// 重定向console.log输出到日志文件
	console.log = function(message) {
	var time = kgtime.getLogTime()
	logStream.write(`${time} ${message}\n`);
	process.stdout.write(`${time} ${message}\n`);
	};
}

//生成网络日志
function networkLog(){
	var app = express();
	var logName = kgtime.getLogName();
	var logStream = fs.createWriteStream('log/network/'+logName, { flags: 'w' });
	app.use(morgan('combined', { stream: logStream }));
}


//定期删除
const logDir = path.join(__dirname, '../log/db');
const logDir1 = path.join(__dirname, '../log/routes');
const logDir2 = path.join(__dirname, '../log/network');
function deleteLog(){
	// 定义需要保留的最大日志文件天数
	const maxDays = 7;

	// 在每个星期天的午夜删除旧日志文件
	// 分钟0 小时0 日* 月* 周0
	cron.schedule('0 0 * * 0', () => {
	  // 获取所有日志文件
	  fs.readdir(logDir, (err, files) => {
	    if (err) throw err;

	    // 遍历所有文件
	    files.forEach((file) => {
	      // 获取文件的完整路径
	      const filePath = path.join(logDir, file);

	      // 检查文件是否是日志文件
	      if (file.endsWith('.log')) {
		// 获取文件的详细信息
		fs.stat(filePath, (err, stats) => {
		  if (err) console.log(err);

		  // 计算文件的年龄
		  const fileAge = moment().diff(moment(stats.birthtime), 'days');

		  // 如果文件的年龄超过最大天数，则删除它
		  if (fileAge > maxDays) {
		    fs.unlink(filePath, (err) => {
		      if (err) console.log(err);
		      console.log('[!!!] 执行了一次日志清理！')
		    });
		  }
		});
	      }
	    });
	  }),
	  fs.readdir(logDir1, (err, files) => {
	    if (err) throw err;

	    // 遍历所有文件
	    files.forEach((file) => {
	      // 获取文件的完整路径
	      const filePath = path.join(logDir1, file);

	      // 检查文件是否是日志文件
	      if (file.endsWith('.log')) {
		// 获取文件的详细信息
		fs.stat(filePath, (err, stats) => {
		  if (err) console.log(err);

		  // 计算文件的年龄
		  const fileAge = moment().diff(moment(stats.birthtime), 'days');

		  // 如果文件的年龄超过最大天数，则删除它
		  if (fileAge > maxDays) {
		    fs.unlink(filePath, (err) => {
		      if (err) console.log(err);
		      console.log('[!!!] 执行了一次日志清理！')
		    });
		  }
		});
	      }
	    });
	  }),
	  fs.readdir(logDir2, (err, files) => {
	    if (err) throw err;

	    // 遍历所有文件
	    files.forEach((file) => {
	      // 获取文件的完整路径
	      const filePath = path.join(logDir2, file);

	      // 检查文件是否是日志文件
	      if (file.endsWith('.log')) {
		// 获取文件的详细信息
		fs.stat(filePath, (err, stats) => {
		  if (err) console.log(err);

		  // 计算文件的年龄
		  const fileAge = moment().diff(moment(stats.birthtime), 'days');

		  // 如果文件的年龄超过最大天数，则删除它
		  if (fileAge > maxDays) {
		    fs.unlink(filePath, (err) => {
		      if (err) console.log(err);
		      console.log('[!!!] 执行了一次日志清理！')
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
	dbLog: dbLog,
	deleteLog: deleteLog,
	routesLog: routesLog,
	networkLog: networkLog,
}

