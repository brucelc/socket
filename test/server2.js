var ws = require("nodejs-websocket");
var server = ws.createServer(function (conn) {
    // conn.sendText(JSON.stringify(his));
    conn.on("text",function (str) {
        var jsdata = JSON.parse(str);
        //console.log("接受消息"+jsdata,jsdata.uid);
        if(jsdata.type == 0){
            if(!conn.uid){
                conn.user = jsdata;
            }
        }

        if(jsdata.type == 1){
            conn.user.content = jsdata.content;
            var sendjson = JSON.stringify(conn.user)
            broadcast(sendjson,jsdata.to_uid);
            console.log(jsdata.to_uid)
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

function broadcast(msg,uid) {
    server.connections.forEach(function (conn) {
        console.log('连接了哪些人'+conn.user.uid)
        if(conn.user.uid == uid){
            conn.sendText(msg);
        }
    })
}

function removeArray(val,arr) {
    var index = arr.indexOf(val);
    if (index > -1) {
        arr.splice(index, 1);
    }
};