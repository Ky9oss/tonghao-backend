// 这是一个Mysql的纯交互程序
// 返回的均为Promis对象，可以利用.then .catch .finally等方法
var conn = require('../javascripts/connectSQL');
var express = require('express');


//获取User信息
function getUserByOpenid(openid) {
    var sql = `SELECT * FROM User WHERE openid = ?`;
    var sqlParse = [openid]
    return new Promise((resolve, reject) => {
        conn.query(sql, sqlParse, function(err, result) {
            if(err) reject(err);
            resolve(result);
        })
    })
}

//获取所有人的所有Posting
function getAllPosting() {
    var sql = `SELECT * FROM Posting`;
    return new Promise((resolve, reject) => {
        conn.query(sql, function(err, result) {
            if(err) reject(err);
            resolve(result);
        })
    })
}

//获取所有人的所有Activity
function getAllActivity() {
    var sql = `SELECT * FROM Activity`;
    return new Promise((resolve, reject) => {
        conn.query(sql, function(err, result) {
            if(err) reject(err);
            resolve(result);
        })
    })
}

// 用openid获取一个人的所有Posting
function getPostByOpenid(openid) {
    var sql = `SELECT * FROM Posting WHERE openid = ?`;
    var sqlParse = [openid]
    return new Promise((resolve, reject) => {
        conn.query(sql, sqlParse, function(err, result) {
            if(err) reject(err);
            resolve(result);
        })
    })
}

// 用category获取Posting
function getPostByCategory(category) {
    var sql = `SELECT * FROM Posting WHERE category = ?`;
    var sqlParse = [category]
    return new Promise((resolve, reject) => {
        conn.query(sql, sqlParse, function(err, result) {
            if(err) reject(err);
            resolve(result);
        })
    })
}


// 用posting_id获取Posting
function getPostByPID(posting_id) {
    var sql = `SELECT * FROM Posting WHERE posting_id = ?`;
    var sqlParse = [posting_id]
    return new Promise((resolve, reject) => {
        conn.query(sql, sqlParse, function(err, result) {
            if(err) reject(err);
            resolve(result);
        })
    })
}

// 用openid获取所有Activity
var getActivityByOpenid = function(openid) {
    var sql = `SELECT * FROM Activity WHERE openid = ?`;
    var sqlParse = [openid]
    return new Promise((resolve, reject) => {
        conn.query(sql, sqlParse, function(err, result) {
            if(err) reject(err);
            resolve(result);
        })
    })
}

// 用category获取Activity
function getActivityByCategory(category) {
    var sql = `SELECT * FROM Activity WHERE category = ?`;
    var sqlParse = [category]
    return new Promise((resolve, reject) => {
        conn.query(sql, sqlParse, function(err, result) {
            if(err) reject(err);
            resolve(result);
        })
    })
}


// 用activity_id获取Activity
function getActivityByAID(activity_id) {
    var sql = `SELECT * FROM Activity WHERE activity_id = ?`;
    var sqlParse = [activity_id]
    return new Promise((resolve, reject) => {
        conn.query(sql, sqlParse, function(err, result) {
            if(err) reject(err);
            resolve(result);
        })
    })
}

// 上传帖子
function postPosting(openid, posting_content, category, time, title) {
    const sql = "INSERT INTO Posting(openid, posting_content, category, time, title) VALUES(?,?,?,?,?)";
    const values = [openid, posting_content, category, time, title];
    return new Promise((resolve, reject) => {
        conn.query(sql, values, function(err, result) {
            if(err) reject(err);
            resolve(result);
        })
    })
};		  


// 上传活动
function postActivity(openid, activity_content, time, title, requirement, category) {
    const sql = `INSERT INTO Posting(openid, activity_content, time, title, requirement, category) VALUES(?,?,?,?,?,?)`;
    const values = [openid, activity_content, time, title, requirement, category];
    return new Promise((resolve, reject) => {
        conn.query(sql, values, function(err, result) {
            if(err) reject(err);
            resolve(result);
        })
    })
};		  


//发布帖子评论
function postPostingComment(openid, content, time, posting_id) {
    const sql = "INSERT INTO PostingComment(openid, content, time, posting_id) VALUES(?,?,?,?)";
    const values = [openid, content, time, posting_id];
    return new Promise((resolve, reject) => {
        conn.query(sql, values, function(err, result) {
            if(err) reject(err);
            resolve(result);
        })
    })
};		  

//发布活动评论
function postActivityComment(openid, content, time, activity_id) {
    const sql = "INSERT INTO ActivityComment(openid, content, time, posting_id) VALUES(?,?,?,?)";
    const values = [openid, content, time, activity_id];
    return new Promise((resolve, reject) => {
        conn.query(sql, values, function(err, result) {
            if(err) reject(err);
            resolve(result);
        })
    })
};		  


//获取帖子评论
function getCommentByPID(posting_id) {
    var sql = `SELECT * FROM PostingComment WHERE posting_id = ?`;
    var sqlParse = [posting_id]
    return new Promise((resolve, reject) => {
        conn.query(sql, sqlParse, function(err, result) {
            if(err) reject(err);
            resolve(result);
        })
    })
}


//获取活动评论
function getCommentByAID(activity_id) {
    var sql = `SELECT * FROM ActivityComment WHERE activity_id = ?`;
    var sqlParse = [activity_id]
    return new Promise((resolve, reject) => {
        conn.query(sql, sqlParse, function(err, result) {
            if(err) reject(err);
            resolve(result);
        })
    })
}


//删除帖子
function deletePostByPID(posting_id) {
    var sql = `DELETE FROM Posting WHERE posting_id=?;`;
    var sqlParse = [posting_id]
    return new Promise((resolve, reject) => {
        conn.query(sql, sqlParse, function(err, result) {
            if(err) reject(err);
            resolve(result);
        })
    })
}

//删除活动
function deleteActivityByAID(activity_id) {
    var sql = `DELETE FROM Activity WHERE activity_id=?;`;
    var sqlParse = [activity_id]
    return new Promise((resolve, reject) => {
        conn.query(sql, sqlParse, function(err, result) {
            if(err) reject(err);
            resolve(result);
        })
    })
}

//删除帖子评论
function deleteCommentByPID(posting_id) {
    var sql = `DELETE FROM PostingComment WHERE posting_id=?;`;
    var sqlParse = [posting_id]
    return new Promise((resolve, reject) => {
        conn.query(sql, sqlParse, function(err, result) {
            if(err) reject(err);
            resolve(result);
        })
    })
}

//删除活动评论
function deleteCommentByAID(activity_id) {
    var sql = `DELETE FROM ActivityComment WHERE activity_id=?;`;
    var sqlParse = [activity_id]
    return new Promise((resolve, reject) => {
        conn.query(sql, sqlParse, function(err, result) {
            if(err) reject(err);
            resolve(result);
        })
    })
}

//更新帖子
//更新活动





module.exports = {

	getAllPosting: getAllPosting,
	getAllActivity: getAllActivity,
	getPostByOpenid: getPostByOpenid,
	getActivityByOpenid: getActivityByOpenid,
	getActivityByAID: getActivityByAID,
	getPostByPID: getPostByPID,
	getCommentByAID: getCommentByAID,
	getCommentByPID: getCommentByPID,
	getUserByOpenid: getUserByOpenid,
	getPostByCategory: getPostByCategory,
	getActivityByCategory: getActivityByCategory,

	postPosting: postPosting,
	postActivity: postActivity,
	postPostingComment: postPostingComment,
	postActivityComment: postActivityComment,

	deletePostByPID: deletePostByPID,
	deleteActivityByAID: deleteActivityByAID,
	deleteCommentByAID: deleteCommentByAID,
	deleteCommentByPID: deleteCommentByPID,
}
