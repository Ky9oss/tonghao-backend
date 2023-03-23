//---------------------------------------------------------
//该程序用于：接受promise对象后，用于检查外建约束,并输出结果
//---------------------------------------------------------

const express = require('express');
const kgsql = require('../db/kgsql');

const log4js = require('log4js');
const logger = log4js.getLogger('app');
const config = require('../config/log4js.json'); // 加载配置文件
log4js.configure(config); // 初始化log4js

const kglogs = require('../kgtools/kglogs')
kglogs.dbLog()




//获取所有人的所有帖子页面
async function getAllPosting(){
	console.log('---------------------------')
	const data = await kgsql.getAllPosting()
	  .then(result => {
		console.log('[^_^] getAllPosting成功！')
		console.log(result)
		return result
	  })
	  .catch(error => {
		  console.log('[ToT] getAllPosting失败')
		  console.log(error)
		  return error
	  })
	  .finally(() => {
		  console.log('[***] getAllPosting执行完毕')
	  });
	console.log('---------------------------\n')
	return data
}


//获取所有人的所有活动页面
async function getAllActicity(){
	console.log('---------------------------')
	const data = await kgsql.getAllActivity()
	  .then(result => {
		console.log('[^_^] getAllActivity成功！')
		console.log(result)
		return result
	  })
	  .catch(error => {
		  console.log('[ToT] getAllActivity失败')
		  console.log(error)
		  return error
	  })
	  .finally(() => {
		  console.log('[***] getAllActivity执行完毕')
	  });
	console.log('---------------------------\n')
	return data
}

//通过openid获取所有帖子页面
async function getPostByOpenid(openid){
	console.log('---------------------------')
	const data = await kgsql.getPostByOpenid(openid)
	  .then(result => {
		console.log('[^_^] getPostByOpenid成功！')
		console.log(result)
		return result
	  })
	  .catch(error => {
		  console.log('[ToT] getPostByOpenid失败')
		  console.log(error)
		  return error
	  })
	  .finally(() => {
		  console.log('[***] getPostByOpenid执行完毕')
	  });
	console.log('---------------------------\n')
	return data
}

//通过openid获取所有活动页面
async function getActivityByOpenid(openid){
	console.log('---------------------------')
	const data = await kgsql.getActivityByOpenid(openid)
	  .then(result => {
		console.log('[^_^] getActivityByOpenid成功！')
		console.log(result)
		return result
	  })
	  .catch(error => {
		  console.log('[ToT] getActivityByOpenid失败')
		  console.log(error)
		  return error
	  })
	  .finally(() => {
		  console.log('[***] getActivityByOpenid执行完毕')
	  });
	console.log('---------------------------\n')
	return data
}


//通过category获取所有帖子页面
async function getPostByCategory(category){
	console.log('---------------------------')
	const data = await kgsql.getPostByCategory(category)
	  .then(result => {
		console.log('[^_^] getPostByCategory成功！')
		console.log(result)
		return result
	  })
	  .catch(error => {
		  console.log('[ToT] getPostByCategory失败')
		  console.log(error)
		  return error
	  })
	  .finally(() => {
		  console.log('[***] getPostByCategory执行完毕')
	  });
	console.log('---------------------------\n')
	return data
}


//通过category获取所有活动页面
async function getActivityByCategory(category){
	console.log('---------------------------')
	const data = await kgsql.getActivityByCategory(category)
	  .then(result => {
		console.log('[^_^] getActivityByCategory成功！')
		console.log(result)
		return result
	  })
	  .catch(error => {
		  console.log('[ToT] getActivityByCategory失败')
		  console.log(error)
		  return error
	  })
	  .finally(() => {
		  console.log('[***] getActivityByCategory执行完毕')
	  });
	console.log('---------------------------\n')
	return data
}

//通过posting_id读取: 帖子页面+评论+相关openid的User库信息
async function getSinglePosting(posting_id){


	console.log('---------------------------')
	console.log('[@@@] 开始执行getSinglePosting!')
	let data1 = await kgsql.getPostByPID(posting_id)
	  .then(result => {
		console.log('[^_^] <SQL>getPostByPID成功！')
		console.log(result[0])
		return result[0]
	  })
	  .catch(error => {
		  console.log('[ToT] <SQL>getPostByPID失败')
		  console.log(error)
	  })
	  .finally(() => {
		  console.log('[***] <SQL>getPostByPID执行完毕')
	  });

	  const openid = await data1.openid
	  console.log(openid)


	let data2 = await kgsql.getCommentByPID(posting_id)
	  .then(result => {
		console.log('[^_^] <SQL>getCommentByPID成功！')
		console.log(result[0])
		return result[0]
	  })
	  .catch(error => {
		  console.log('[ToT] <SQL>getCommentByPID失败')
		  console.log(error)
	  })
	  .finally(() => {
		  console.log('[***] <SQL>getCommentByPID执行完毕')
	  });


	let data3 = await kgsql.getUserByOpenid(openid)
	  .then(result => {
		console.log('[^_^] <SQL>getUserByOpenid成功！')
		console.log(result[0])
		return result[0]
	  })
	  .catch(error => {
		  console.log('[ToT] <SQL>getUserByOpenid失败')
		  console.log(error)
	  })
	  .finally(() => {
		  console.log('[***] <SQL>getUserByOpenid执行完毕')
	  });


	const data = await Object.assign({}, data1, data2, data3)


	if(data){
		console.log('[@@@] getSinglePosting成功！')
		console.log('---------------------------\n')
		return data
	}else{
		console.log('[@@@] getSinglePosting失败！')
		console.log('---------------------------\n')

	}
}



//通过activity_id读取: 帖子页面+评论+相关openid的User库信息
async function getSingleActivity(activity_id){

	console.log('---------------------------')
	console.log('[@@@] 开始执行getSinglePosting!')
	let data1 = await kgsql.getActivityByAID(activity_id)
	  .then(result => {
		console.log('[^_^] <SQL> getActivityByAID成功！')
		console.log(result[0])
		return result[0]
	  })
	  .catch(error => {
		  console.log('[ToT] <SQL> getActivityByAID失败')
		  console.log(error)
	  })
	  .finally(() => {
		  console.log('[***] <SQL> getActivityByAID执行完毕')
	  });

	  const openid = await data1.openid
	  console.log(openid)


	let data2 = await kgsql.getCommentByPID(activity_id)
	  .then(result => {
		console.log('[^_^] <SQL> getCommentByPID成功！')
		console.log(result[0])
		return result[0]
	  })
	  .catch(error => { 
		  console.log('[ToT] <SQL> getCommentByPID失败') 
		  console.log(error) 
	  }) 
	  .finally(() => {
		  console.log('[***] <SQL> getCommentByPID执行完毕')
	  });


	let data3 = await kgsql.getUserByOpenid(openid)
	  .then(result => {
		console.log('[^_^] getUserByOpenid成功！')
		console.log(result[0])
		return result[0]
	  })
	  .catch(error => {
		  console.log('[ToT] getUserByOpenid失败')
		  console.log(error)
	  })
	  .finally(() => {
		  console.log('[***] getUserByOpenid执行完毕')
	  });


	const data = Object.assign({}, data1, data2, data3)


	if(data){
		console.log(data)
		console.log('[@@@] getSinglePosting成功!')
		console.log('---------------------------\n')
		return data
	}else{
		console.log('[@@@] getSinglePosting失败!')
		console.log('---------------------------\n')
	}
}






//上传Posting: 检查要上传帖子的人的openid是否存在并上传
async function postPosting(openid, posting_content, category, title, time){
	console.log('---------------------------')
	console.log('[@@@] postPosting')

	console.log('[^_^] <SQL> getUserByOpenid成功！')
    // 处理异步操作成功的结果
	kgsql.postPosting(openid, posting_content, category, time, title)
	  .then(result => {
		console.log('[^_^] <SQL> postPosting成功！')
	    // 处理异步操作成功的结果
	  })
	  .catch(error => {
		  console.log('[ToT] <SQL> postPosting失败')
		  console.log(error)
	    // 处理异步操作失败的错误
	  })
	  .finally(() => {
		  console.log('[***] <SQL> postPosting执行完毕')
	    // 无论异步操作成功或失败，都会执行的代码
	  });

}
		  



//上传Activity: 检查要上传活动的人的openid是否存在并上传
async function postActivity(openid, activity_comment, time, title, requirement, category) {
  logger.info('[@@@] postActivity'); // 使用logger输出日志
  try {
    const user = await kgsql.getUserByOpenid(openid); // 获取用户
    if (!user) {
      logger.warn('[!!!] getUserByOpenid无结果');
      return; // 如果用户不存在，则直接返回
    }
    await kgsql.postActivity(openid, activity_comment, time, title, requirement, category); // 发布活动
    logger.info('[^_^] <SQL> postActivity成功！');
  } catch (error) {
    logger.error('[ToT] <SQL> postActivity失败', error);
    throw error;
  } finally {
    logger.info('[***] <SQL> postActivity执行完毕\n');
  }
}




//通过posting_id删除单一帖子
async function deleteSinglePost(posting_id){
	console.log('---------------------------')
	console.log('[@@@] deleteSinglePost开始')

	const select1 = await kgsql.getCommentByPID(posting_id) .then(result => {
		console.log('[^_^] <SQL>getCommentByPID成功！')
		return result[0]
	  })
	  .catch(error => {
		  console.log('[ToT] <SQL>getCommentByPID失败')
		  console.log(error)
	  })
	  .finally(() => {
		  console.log('[***] <SQL>getCommentByPID执行完毕\n')
	  });
	
	if(select1){
		await kgsql.deleteCommentByPID(posting_id)
		  .then(result => {
			console.log('[^_^] <SQL>deleteCommentByPID成功！')
			//return result
		  })
		  .catch(error => {
			  console.log('[ToT] <SQL>deleteCommentByPID失败')
			  console.log(error)
			 // return error
		  })
		  .finally(() => {
			  console.log('[***] <SQL>deleteCommentByPID执行完毕\n\n')
			 // return 'success'
		  });
	}else{ console.log('[!!!] getCommentByPID无结果') }


	const select2 = await kgsql.getPostByPID(posting_id) 
	  .then(result => {
		console.log('[^_^] <SQL>getPostByPID成功！')
		return result[0]
	  })
	  .catch(error => {
		  console.log('[ToT] <SQL>getPostByPID取失败')
		  console.log(error)
	  })
	  .finally(() => {
		  console.log('[***] <SQL>getPostByPID执行完毕\n')
	  });

	if(select2){
		await kgsql.deletePostByPID(posting_id)
		  .then(result => {
			console.log('[^_^] <SQL>deletePostByPID成功！')
			//return result
		  })
		  .catch(error => {
			  console.log('[ToT] <SQL>deletePostByPID失败')
			  console.log(error)
			 // return error
		  })
		  .finally(() => {
			  console.log('[***] <SQL>deletePostByPID执行完毕\n\n')
		  });
	}else{ console.log('[!!!] getPostByPID无结果') }
	console.log('[@@@] deleteSinglePost完成')
	console.log('---------------------------\n')

}


//通过activity_id删除单一活动
async function deleteSingleActivity(activity_id){
	console.log('---------------------------')
	console.log('[@@@] deleteSingleActivity开始')

	const select1 = await kgsql.getCommentByAID(activity_id) .then(result => {
		console.log('[^_^] <SQL>getCommentByAID成功！')
		return result[0]
	  })
	  .catch(error => {
		  console.log('[ToT] <SQL>getCommentByAID失败')
		  console.log(error)
	  })
	  .finally(() => {
		  console.log('[***] <SQL>getCommentByAID执行完毕\n')
	  });
	
	if(select1){
		await kgsql.deleteCommentByAID(activity_id)
		  .then(result => {
			console.log('[^_^] <SQL>deleteCommentByAID成功！')
			//return result
		  })
		  .catch(error => {
			  console.log('[ToT] <SQL>deleteCommentByAID失败')
			  console.log(error)
			 // return error
		  })
		  .finally(() => {
			  console.log('[***] <SQL>deleteCommentByAID执行完毕\n\n')
			 // return 'success'
		  });
	}else{ console.log('[!!!] getCommentByAID无结果') }

	const select2 = await kgsql.getActivityByAID(activity_id) 
	  .then(result => {
		console.log('[^_^] <SQL>getActivityByAID成功！')
		return result[0]
	  })
	  .catch(error => {
		  console.log('[ToT] <SQL>getActivityByAID取失败')
		  console.log(error)
	  })
	  .finally(() => {
		  console.log('[***] <SQL>getActivityByAID执行完毕\n')
	  });

	if(select2){
		await kgsql.deleteActivityByAID(activity_id)
		  .then(result => {
			console.log('[^_^] <SQL>deleteActivityByAID成功！')
			//return result
		  })
		  .catch(error => {
			  console.log('[ToT] <SQL>deleteActivityByAID失败')
			  console.log(error)
			 // return error
		  })
		  .finally(() => {
			  console.log('[***] <SQL>deleteActivityByAID执行完毕\n\n')
		  });
	}else{ console.log('[!!!] getActivityByAID无结果') }
	console.log('[@@@] deleteSingleActivity完成')
	console.log('---------------------------\n')

}

//更新帖子内容：根据posting_id删除原数据库中的内容并将整个更新后的帖子重新上传数据库
async function updateSinglePosting(posting_id, openid, posting_content, category, time, title){
	console.log('---------------------------')
	console.log('[@@@] updateSinglePosting')
	const select1 = await kgsql.getPostByPID(posting_id)
	  .then(result => {
		console.log('[^_^] getPostByPID成功！')
	    // 处理异步操作成功的结果
	  })
	  .catch(error => {
		  console.log('[ToT] getPostByPID失败')
		  console.log(error)
	    // 处理异步操作失败的错误
	  })
	  .finally(() => {
		  console.log('[***] getPostByPID执行完毕')
	    // 无论异步操作成功或失败，都会执行的代码
	  })
		  
	if(select1){
		await kgsql.deletePostByPID(posting_id)
		  .then(result => {
			console.log('[^_^] <SQL>deletePostByPID成功！')
		    // 处理异步操作成功的结果
		  })
		  .catch(error => {
			  console.log('[ToT] <SQL>deletePostByPID失败')
			  console.log(error)
		    // 处理异步操作失败的错误
		  })
		  .finally(() => {
			  console.log('[***] <SQL>deletePostByPID执行完毕')
		    // 无论异步操作成功或失败，都会执行的代码
		  });

		await kgsql.postPosting(openid, posting_content, category, time, title)
		  .then(result => {
			console.log('[^_^] <SQL>postPosting成功！')
		    // 处理异步操作成功的结果
		  })
		  .catch(error => {
			  console.log('[ToT] <SQL>postPosting失败')
			  console.log(error)
		    // 处理异步操作失败的错误
		  })
		  .finally(() => {
			  console.log('[***] <SQL>postPosting执行完毕')
		    // 无论异步操作成功或失败，都会执行的代码
		  });

	}else{ console.log('[!!!] 更新页面失败：<SQL>getPostByPID无结果') }
	console.log('[@@@] updateSinglePosting')
	console.log('---------------------------\n')
}



//更新活动内容：根据activity_id删除原数据库中的内容并将整个更新后的活动重新上传数据库
async function updateSingleActivity(activity_id, openid, activity_content, time, title, requirement, category){
	console.log('---------------------------')
	console.log('[@@@] updateSingleActivity')
	const select1 = await kgsql.getActivityByAID(activity_id)
	  .then(result => {
		console.log('[^_^] <SQL> getActivityByAID成功！')
	    // 处理异步操作成功的结果
	  })
	  .catch(error => {
		  console.log('[ToT] <SQL> getActivityByAID失败')
		  console.log(error)
	    // 处理异步操作失败的错误
	  })
	  .finally(() => {
		  console.log('[***] <SQL> getActivityByAID执行完毕')
	    // 无论异步操作成功或失败，都会执行的代码
	  })
		  
	if(select1){
		await kgsql.deleteActivityByAID(activity_id)
		  .then(result => {
			console.log('[^_^] <SQL> deleteActivityByAID成功！')
		    // 处理异步操作成功的结果
		  })
		  .catch(error => {
			  console.log('[ToT] <SQL> deleteActivityByAID失败')
			  console.log(error)
		    // 处理异步操作失败的错误
		  })
		  .finally(() => {
			  console.log('[***] <SQL> deleteActivityByAID执行完毕')
		    // 无论异步操作成功或失败，都会执行的代码
		  });

		await kgsql.postActivity(openid, activity_content, time, title, requirement, category)
		  .then(result => {
			console.log('[^_^] <SQL> getActivityByAID成功！')
		    // 处理异步操作成功的结果
		  })
		  .catch(error => {
			  console.log('[ToT] <SQL> postPosting失败')
			  console.log(error)
		    // 处理异步操作失败的错误
		  })
		  .finally(() => {
			  console.log('[***] <SQL> postPosting执行完毕')
		    // 无论异步操作成功或失败，都会执行的代码
		  });

	}else{ console.log('[!!!] 更新页面失败：<SQL> getActivityByAID无结果') }
	console.log('[@@@] updateSingleActivity')
	console.log('---------------------------\n')
}

//发布评论
async function postPostingComment(openid, content, time, posting_id){
	console.log('---------------------------')
	await kgsql.postPostingComment(openid, content, time, posting_id)
	  .then(result => {
		console.log('[^_^] postPostingComment成功！')
		console.log(result)
	  })
	  .catch(error => {
		  console.log('[ToT] postPostingComment失败')
		  console.log(error)
		  return error
	  })
	  .finally(() => {
		  console.log('[***] postPostingComment执行完毕')
	  });
	console.log('---------------------------\n')
}


//发布评论
async function postActivityComment(openid, content, time, activity_id){
	console.log('---------------------------')
	await kgsql.postActivityComment(openid, content, time, activity_id)
	  .then(result => {
		console.log('[^_^] postActivityComment成功！')
		console.log(result)
	  })
	  .catch(error => {
		  console.log('[ToT] postActivityComment失败')
		  console.log(error)
		  return error
	  })
	  .finally(() => {
		  console.log('[***] postActivityComment执行完毕')
	  });
	console.log('---------------------------\n')
}


module.exports = {

	getAllPosting: getAllPosting,
	getAllActicity: getAllActicity,
	getSinglePosting: getSinglePosting,
	getSingleActivity: getSingleActivity,
	getActivityByOpenid: getActivityByOpenid,
	getPostByOpenid: getPostByOpenid,

	postPosting: postPosting,
	postActivity: postActivity,
	postPostingComment: postPostingComment,
	postActivityComment: postActivityComment,

	deleteSinglePost: deleteSinglePost,
	deleteSingleActivity: deleteSingleActivity,

	updateSinglePosting: updateSinglePosting,
	updateSingleActivity: updateSingleActivity,
}

