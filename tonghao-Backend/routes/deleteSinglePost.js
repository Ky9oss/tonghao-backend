const express = require('express');
const router = express.Router();
const route_db = require('../route_db/route_db')



//调用封装好的日志程序
const kglogs = require('../kgtools/kglogs')
kglogs.routesLog('deleteSinglePost')





router.post('/', async function(req, res, next) {
    console.log('<Delete Start>: 删除单个帖子页面')
    var posting_id = req.body.posting_id;
    await route_db.deleteSinglePost(posting_id)
    console.log('<Delete Done>: 删除单个帖子页面完成')
});



module.exports = router;


