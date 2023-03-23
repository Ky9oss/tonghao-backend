const express = require('express');
const router = express.Router();
const kgtime = require('../kgtools/kgtime')
const route_db = require('../route_db/route_db')



//调用封装好的日志程序
const kglogs = require('../kgtools/kglogs')
kglogs.routesLog('postActivity')





// POST
router.post('/', async function(req, res, next) {
    console.log('<POST Start>： 上传活动页面信息')
    var openid = req.body.openid;
    var title = req.body.activityTitle;
    var activity_content = req.body.activityContent;
    var time = kgtime.getTime();
    var requirement = req.body.activityRequirements;
    var category = req.body.selectedCategory;
    await route_db.postPosting(openid, activity_content, title, time, requirement, category)
    console.log('<POST Done>： 上传帖子页面信息完成')
    res.status(200).send('<POST Done>： 上传帖子页面信息完成')

});



module.exports = router;


