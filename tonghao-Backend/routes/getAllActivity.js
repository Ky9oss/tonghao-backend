const express = require('express');
const router = express.Router();
const kgtime = require('../kgtools/kgtime')
const route_db = require('../route_db/route_db')



//调用封装好的日志程序
const kglogs = require('../kgtools/kglogs')
kglogs.routesLog('getAllActivity')





// GET
router.get('/', async function(req, res, next) {
    console.log('<GET Start>: 所有活动页面')
    const data = await route_db.getAllActicity()
    res.json(data)
    console.log('<GET Done>: 完成')

});



module.exports = router;


