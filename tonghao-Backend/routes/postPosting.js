const express = require('express');
const router = express.Router();
const kgtime = require('../kgtools/kgtime')
const route_db = require('../route_db/route_db')



//调用封装好的日志程序
const kglogs = require('../kgtools/kglogs')





// POST
router.post('/', async function(req, res, next) {
    kglogs.routesLog('postPosting')
    console.log('<POST Start>： 上传帖子页面信息')
    var openid = req.body.openid;
    var title = req.body.postTitle;
    var posting_content = req.body.postContent;
    var category = req.body.selectedCategory;
    var time = kgtime.getTime()
    await route_db.postPosting(openid, posting_content, category, title, time)
    console.log('<POST Done>： 上传帖子页面信息完成')
    res.status(200).send('<POST Done>： 上传帖子页面信息完成')
    //res.json('<POST Done>： 上传帖子页面信息完成')

});



module.exports = router;


