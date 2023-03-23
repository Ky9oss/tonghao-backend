const express = require('express');
const router = express.Router();
const kgtime = require('../kgtools/kgtime')
const route_db = require('../route_db/route_db')



//调用封装好的日志程序
const kglogs = require('../kgtools/kglogs')
kglogs.routesLog('getSingleActivity')





router.post('/', async function(req, res, next) {
    console.log('<GET Start>: 单一活动页面')
    var activity_id = req.body.activity_id;
    const data = await route_db.getSingleActivity(activity_id)
    res.json(data)
    console.log('<GET Done>: 完成')
});



module.exports = router;


