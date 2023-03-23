const express = require('express');
const multer = require('multer');

const app = express();

// 配置Multer中间件
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// 处理上传请求
app.post('/upload-data', upload.array('images'), (req, res) => {
  const files = req.files;
  
  if (!files || files.length === 0) {
    return res.status(400).json({
      message: 'No files uploaded'
    });
  }
  
  const imageUrls = files.map((file) => `http://localhost:3000/${file.path}`);
  
  const name = req.body.name;
  const age = req.body.age;
  
  return res.status(200).json({
    message: 'Data uploaded successfully',
    name,
    age,
    imageUrls
  });
});
