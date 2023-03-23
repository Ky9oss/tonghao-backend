const express = require('express');
const router = express.Router();
const kgtime = require('../kgtools/kgtime')
const route_db = require('../route_db/route_db')



//调用封装好的日志程序
const kglogs = require('../kgtools/kglogs')
kglogs.routesLog('getActivityByOpenid')





router.post('/', async function(req, res, next) {
    console.log('<GET Start>: 一个人的所有活动页面')
    var openid = req.body.openid
    const data = await route_db.getActivityByOpenid(openid)
    res.json(data)
    console.log('<GET Done>: 完成')
});



module.exports = router;


