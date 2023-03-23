const express = require('express');
const router = express.Router();
const kgtime = require('../kgtools/kgtime')
const route_db = require('../route_db/route_db')



//调用封装好的日志程序
const kglogs = require('../kgtools/kglogs')
kglogs.routesLog('postActivityComment')





// POST
router.post('/', async function(req, res, next) {
    console.log('<POST Start>： 上传帖子页面信息')
    // 读取 POST 请求参数，返回字符串
    var openid = req.body.openid;
    var content = req.body.content;
    var time = kgtime.getTime()
    var activity_id = req.body.activity_id;
    await route_db.postPosting(openid, content, time, activity_id)
    console.log('<POST Done>： 上传帖子页面信息完成')
    res.status(200).send('<POST Done>： 上传帖子页面信息完成')

});



module.exports = router;


