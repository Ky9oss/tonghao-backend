const express = require('express');
const router = express.Router();
const route_db = require('../route_db/route_db')



//调用封装好的日志程序
const kglogs = require('../kgtools/kglogs')
kglogs.routesLog('updateSingleActivity')





router.post('/', async function(req, res, next) {
    console.log('<Update Start>: 更新单个活动页面')
    var activity_id = req.body.activity_id;
    var openid = req.body.openid;
    var activity_content = req.body.activity_content;
    var time = req.body.time;
    var title = req.body.title;
    var requirement = req.body.requirement;
    var category = req.body.category;
    await route_db.updateSingleActivity(activity_id, openid, activity_content, time, title, requirement, category)
    console.log('<Update Done>: 更新单个活动页面完成')
});



module.exports = router;


