const mysql = require('mysql');

const conn = mysql.createConnection({
    host:'sh-cynosdbmysql-grp-9ojx7yk2.sql.tencentcdb.com',
    port:24466,
    user:'root',
    password:'Root1234',
    database:'nodejs_demo'
});

conn.connect(function(err) {
    if(err) {
        console.log("连接失败");
        console.log(err.message);
    }
    console.log("连接成功!当前连接线程ID: " + conn.threadId);
});

//导出
module.exports = conn;