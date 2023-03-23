const express = require('express');
const router = express.Router();
const route_db = require('../route_db/route_db')



//调用封装好的日志程序
const kglogs = require('../kgtools/kglogs')
kglogs.routesLog('updateSinglePosting')





router.post('/', async function(req, res, next) {
    console.log('<Update Start>: 更新单个帖子页面')
    var posting_id = req.body.posting_id;
    var openid = req.body.openid;
    var posting_content = req.body.posting_content;
    var category = req.body.category;
    var time = req.body.time;
    var title = req.body.title;
    await route_db.updateSinglePosting(posting_id, openid, posting_content, category, time, title)
    console.log('<Update Done>: 更新单个帖子页面完成')
});



module.exports = router;


