/**
 * Created by admin on 2017/4/19.
 */
var http = require("http");
var qs = require("querystring");
http.createServer(function(req,res){

    var post = "";
    req.on("data",function(chuck){
        post += chuck;
    });
    req.on("end",function(){
        res.writeHead(200,{"Content-Type":"text/html;charset=utf8","Access-Control-Allow-Origin":"*"});
        if(post){
            res.write(post);
        }
        else{
            res.write("nothing");
        }
        res.end();
    });
}).listen(8888);