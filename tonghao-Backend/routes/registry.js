var express = require('express');
var router = express.Router();
var conn = require('../javascripts/connectSQL');


// GET
router.get('/', function(req, res, next) {
    // 读取 GET 请求参数(字符串)
    var openid = req.query.openid;
    var type = req.query.type;
    var userid = req.query.userid;
    var school = req.query.school;

    switch(type) {
        case 'check':
            checkReturn(openid, res);
            break;
        case 'registry':
            registryReturn(openid, userid, school, res);
            break;
        case 'update':
            updateReturn(openid, userid, school, res);
            break;
        default:
            console.log('\n\n\n--------------------------ERROR-----------------------------');
            res.json({
                err: 'true'
            });
            break;
    }
});



// 检查用户信息入口函数
async function checkReturn(openid, res) {

    try{
        // 判断openid是否存在
        const isHave = await checkSql(openid);

        // 构建json
        const data = await createRes(isHave, openid);
        // return data
        res.json(data);
    } catch(err) {
        // 查找失败
        res.json({
            isHave: 'error'
        });
    }
}
    

// 注册入口函数
async function registryReturn(openid, userid, school, res) {

    try{
        const data = await addSql(openid, userid, school);
        // return data
        res.json(data);
    } catch(err) {
        // 注册失败
        res.json({
            affectedRows: 0
        });
    }     
}

// 修改用户信息入口函数
async function updateReturn(openid, userid, school, res) {

    try{
        const data = await updateSql(openid, userid, school);
        // return data
        res.json(data);
    } catch(err) {
        // 修改失败
        res.json({
            affectedRows: 0
        });
    }    
}




// 数据库查询
function checkSql(openid) {
    // 查询 User 表中是否存在该 openid
    var sql = 'SELECT COUNT(*) AS count FROM User WHERE openid=?';
    var sqlParam = [openid];
    var outputData = 0;

    return new Promise((resolve, reject) => {
        conn.query(sql, sqlParam, function(err, result) {
            if(err) {
                console.log('\n\n\n[SELECT ERROR] - ',err.message);
                reject(err);
                return;
            }
            outputData = result[0].count;
            console.log('\n\n\n--------------------------SELECT----------------------------');
            console.log(result);
            console.log('\x1b[95m${openid} \x1b[0m',openid);
            needRegistry(outputData);
            resolve(outputData);
        });
    });
}

// 提示注册或登录
function needRegistry(result) {
    if(result) {
        console.log('\x1b[32m${Login}\x1b[0m');
    }
    else {
        console.log('\x1b[101m${Registry}\x1b[0m');
    }
}

// 构建json
async function createRes(ishave, openid) {
    if(ishave) {
        // 添加数据库获取（查询）
        var outputData = await getSql(openid);
        var data = {
            isHave: 'true',
            openid: openid,
            userid: outputData.userid,
            school: outputData.school
        };
    }
    else {
        var data = {
            isHave: 'false'
        };
    }
    
    return data;
}

// 数据库获取
function getSql(openid) {
    var sql = 'SELECT * FROM User WHERE openid=?';
    var sqlParam = [openid];
    var outputData = 0;

    return new Promise((resolve, reject) => {
        conn.query(sql, sqlParam, function(err, result) {
            if(err) {
                console.log('\n\n\n[SELECT ERROR] - ',err.message);
                reject(err);
                return;
            }
            outputData = {
                userid: result[0].userid,
                school: result[0].school
            };
            console.log('--------------------------SELECT----------------------------');
            console.log(result);
            console.log('------------------------------------------------------------');
            resolve(outputData);
        })
    })
}



// 数据库增加
function addSql(openid, userid, school) {
    var sql = 'INSERT INTO User(openid,userid,school) VALUES(?,?,?)';
    var sqlParam = [openid, userid, school];
    var outputData = 0;

    return new Promise((resolve, reject) => {
        conn.query(sql, sqlParam, function (err, result) {
            if(err){
                console.log('\n\n\n[INSERT ERROR] - ',err.message);
                reject(err);
                return;
            }        
            outputData = result; // NEED TO BE CHANGED
            console.log('\n\n\n--------------------------INSERT----------------------------');  
            console.log('INSERT ID:',result);        
            console.log('-----------------------------------------------------------------');
            resolve(outputData);  
        });
    })
}



// 数据库修改      NEED TO BE CHANGED, WHETHER ALL NEED TO BE EDICTED
function updateSql(openid, userid, school) {
    var sql = 'UPDATE User SET school = ?,userid = ? WHERE openid = ?';
    var sqlParam = [school, userid, openid];
    var outputData = 0;

    return new Promise((resolve, reject) => {
        conn.query(sql, sqlParam, function (err, result) {
            if(err){
                console.log('\n\n\n[UPDATE ERROR] - ', err.message);
                reject(err);
                return;
            }
            outputData = result; // NEED TO BE CHANGED        
            console.log('\n\n\n--------------------------UPDATE----------------------------');
            console.log('UPDATE affectedRows', result.affectedRows);
            console.log('-----------------------------------------------------------------');
            resolve(outputData); 
        })
    })
}


// 获取 SessionKey
function getSessionKey() {

}

module.exports = router;
