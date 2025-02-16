// 引入 express
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// 设置路由
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// 设置存储引擎
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // 存储到 uploads 文件夹
  },
  filename: (req, file, cb) => {
    // 使用时间戳加上原文件名，确保文件名唯一
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// 创建 Multer 实例
const upload = multer({ storage: storage });

// 创建文件上传接口
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('没有上传文件');
  }
  // 上传成功后返回文件信息
  res.send({
    message: '文件上传成功',
    file: req.file // 返回上传的文件信息
  });
});

// 启动服务器，监听 3000 端口
app.listen(port, () => {
  console.log(`服务器正在监听 http://localhost:${port}`);
});
