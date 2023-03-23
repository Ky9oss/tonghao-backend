const express = require('express');
const router = express.Router();
const kgtime = require('../kgtools/kgtime')
const route_db = require('../route_db/route_db')



//调用封装好的日志程序
const kglogs = require('../kgtools/kglogs')
kglogs.routesLog('getSinglePosting')





router.post('/', async function(req, res, next) {
    console.log('<GET Start>: 单一帖子页面')
    var posting_id = req.body.posting_id;
    const data = await route_db.getSinglePosting(posting_id)
    res.json(data)
    console.log('<GET Done>: 完成')
});



module.exports = router;


