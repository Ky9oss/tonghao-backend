const express = require('express');

const app = express();

// 处理上传请求
app.post('/upload-image', (req, res) => {
  const base64String = req.body.image;
  
  if (!base64String) {
    return res.status(400).json({
      message: 'No image uploaded'
    });
  }
  
  // 将Base64编码的字符串转换为Buffer对象
  const buffer = Buffer.from(base64String.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  
  // TODO: 在这里你可以将Buffer对象写入到磁盘上保存为图片文件
  
  return res.status(200).json({
    message: 'Image uploaded successfully'
  });
});

