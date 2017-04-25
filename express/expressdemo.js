/**
 * Created by admin on 2017/4/24.
 */
var express = require("express");
var session = require("express-session");
var qs = require("querystring");
var app = express();
app.use(session({
    secret:"12345"
}));
app.use(express.static("public"));
app.get("/index.html",function(req,res){
    if(!session.sign){
        console.log("1111111111");
    }
    res.send("22");
    res.sendfile("index.html");
});
app.post("/",function(req,res){
    var post = "";
    req.on("data",function(chuck){
        post += chuck;
    });
    req.on("end",function(){
        console.log(post);
        post = qs.parse(post);
        if(post.name==="ff"&&post.password==="11"){
            res.redirect("welcome.html");
            session.sign = "true";
            session.name = "ff";
        }
        else{
            res.redirect("index.html");
        }
    })

});
app.listen(8888);