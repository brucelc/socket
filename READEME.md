#### 2019-06-25更新
- test/server2.js文件是之前socket服务的线上运行代码, 启动supervisor server.js
  目前维持现状,
  index.html和main.html都是之前老的代码, 暂时不动

- test/socketIo,以及websocket是 开启socket服务的服务端代码;

- server.js文件是之前小程序socket服务的线上运行代码, 启动supervisor server.js
  目前维持现状, 功能没有实现完全;
  index.html和main.html都是之前老的代码, 暂时不动

- app.js是socket服务本次测试,新搭建的服务, 启动npm run start
  数据库采用mysql, 用sequrel pro管理;
  views新建目录, 用于本次调试文件;

  #### public 是静态文件存放的地方
  websocket和socketIo必须是在新端口开启服务, EventSource是基于http的所以可以在app.js中定义路由





