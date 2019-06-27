var ws = require("nodejs-websocket");
  var server = ws.createServer(function (conn) {
      conn.on("text",function (str) {
          var jsdata = JSON.parse(str);
          console.log("接受消息"+jsdata, str);
          // type 0 连接服务器
          if(jsdata.type == 0){
              if(!conn.uid){
                  conn.user = jsdata; // 最后把所有的人都连接到服务器上,得到人的列表
              }
          }

          // 发送消息
          if(jsdata.type == 1){
              conn.user.content = jsdata.content;
              var sendjson = JSON.stringify(conn.user);
              // 消息发给谁;
              broadcast(sendjson, jsdata.to_uid);
          }

      })
      conn.on("close", function (code, reason) {
          delete conn.user;
      })
      conn.on("error", function (err) {
          return true;
          console.log("错误",err);
      })
  }).listen(8002)
  function broadcast(data,uid) {
      // 获取所有连接到服务器上到人, 然后根据发送消息的id, 判断把消息发送给谁
      server.connections.forEach(function (conn) {
          console.log('连接了哪些人'+conn.user.uid)
          if(conn.user.uid == uid){
              conn.sendText(data);
          }
      })
  }

  function removeArray(val,arr) {
      var index = arr.indexOf(val);
      if (index > -1) {
          arr.splice(index, 1);
      }
  };