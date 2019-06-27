const express = require('express');
var router = express.Router();

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {});

server.listen(4000);

// 服务器监听所有客户端 并返回该新连接对象
// 每个客户端socket连接时都会触发 connection 事件
let num = 0
io.on('connection', (socket) => {
  console.log('22', socket);

  socket.on('disconnect', (reason) => {
    console.log('断开连接')
  })
  socket.on('error', (error) => {
    console.log('发生错误')
  })
  socket.on('disconnecting', (reason) => {
    console.log('客户端断开连接但尚未离开')
  })

  console.log(socket.id) // 获取当前连接进入的客户端的id
  io.clients((error, ids) => {
    console.log('获取已连接的全部客户机的ID', ids)  // 获取已连接的全部客户机的ID
  })

  // 监听客户端发送的事件
  socket.on('feEve', (data) => {
    console.log('feEve', data)
  })
  // 给客户端发送事件
  setInterval(() => {
    console.log('发送事件');
    socket.emit('serverEve', ++num)
  }, 1000)
})

// router.get('/', (req, res) => {
//   console.log('res', 1);

// })

// /*
//   io.close()  // 关闭所有连接
// */

// module.exports = router;