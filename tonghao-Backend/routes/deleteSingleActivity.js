const express = require('express');
const router = express.Router();
const route_db = require('../route_db/route_db')



//调用封装好的日志程序
const kglogs = require('../kgtools/kglogs')
kglogs.routesLog('deleteSingleActivity')





router.post('/', async function(req, res, next) {
    console.log('<Delete Start>: 删除单个活动页面')
    var activity_id = req.body.activity_id;
    await route_db.deleteSingleActivity(activity_id)
    console.log('<Delete Done>: 删除单个活动页面完成')
});



module.exports = router;


