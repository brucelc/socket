/*
 * @Author: bruce.lc
 * @Date: 2019-06-25 16:07:08
 * @Last Modified by: bruce.lc
 */
// 线上服务, 暂时不动了
// 启动可以用supervisor server.js

var ws = require("nodejs-websocket");
//加载数据库模块
var mongoose = require('mongoose');

var ChatsContent = require('./models/Content.js');

var server = ws.createServer(function (conn) {
    // conn.sendText(JSON.stringify(his));
    conn.on("text",function (str) {
        var jsdata = JSON.parse(str);
        console.log("接受消息1"+str);

        console.log("接受消息2"+jsdata);
        if(jsdata.type == 0){
            if(!conn.uid){
                conn.user = jsdata;

                ChatsContent.find().then(function(res){
                   // console.log('查找出来数据',res)
                    //把查找出来的纪录都发送出去
                    var data1={
                        records:res,
                        way:1   // 进入聊天室  请求所有记录
                    }
                    broadcast(JSON.stringify(data1));
                })


            }
        }
        //console.log('conn.user1=====',conn.user)
        if(jsdata.type == 1){
            conn.user.content = jsdata.content;

            var chatsContent=new ChatsContent({
                type:conn.user.type,
                content:conn.user.content,
                nickname:conn.user.userinfo.nickname,
                headurl:conn.user.userinfo.headurl,
                uid:conn.user.userinfo.uid
            })
            chatsContent.save();
            var sendjson=JSON.stringify({
                records:{
                    uid:conn.user.userinfo.uid,
                    nickname:conn.user.userinfo.nickname,
                    content:conn.user.content,
                    headurl:conn.user.userinfo.headurl,
                },
                way:2   // 有人发送数据
            });
            broadcast(sendjson);
            //console.log('conn.use2=====',conn.user)
        }

    })
    conn.on("close", function (code, reason) {
        delete conn.user;
    })
    conn.on("error", function (err) {
        return true;
        console.log("错误",err);
    })
}).listen(8083)

function broadcast(data,uid) {
    server.connections.forEach(function (conn) {
        console.log('连接了哪些人'+conn.user.userinfo)
        console.log('发送消息给谁'+conn.user, uid);
        // conn.sendText(data);
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
//监听http请求
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://139.199.95.41:27017/test3', function(err){
    if (err) {
        console.log('数据库连接失败');
    } else {
        console.log('数据库连接成功');
        //app.listen(8081);
    }
});