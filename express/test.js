/**
 * Created by admin on 2017/4/24.
 */
var express = require("express");
var session = require("express-session");
var qs = require("querystring");
var app = express();
app.use(session({
    resave:false,
    sign:false,
    saveUninitialized: true,
    cookie: {maxAge:3600000},
    secret:'12345'
}));
app.use(express.static("public"));
app.get("/welcome",function(req,res){
    console.log(req.session.sign);
    if(!req.session.sign){
        res.redirect("index.html");
    }
    else{
        res.redirect("welcome.html");
    }

});
app.get('/index',function(req,res){
    res.redirect('index.html');
});
app.post("/welcome.html",function(req,res){
    var post = "";
    req.on("data",function(chuck){
        post += chuck;
    });
    req.on("end",function(){
        post = qs.parse(post);
        if(post.name==="fff"&&post.password==="111"){
            req.session.name = post.name;
            req.session.sign = "true";
            res.redirect("welcome.html");
            console.log(req.session.name);
        }
        else{
            console.log("false");
            console.log(req.session.name);
            setTimeout(function(){
                res.redirect("index.html");
            },3000);
        }
    })
});
// app.use(function(req,res,next){
//    console.log("*******");
//     next();
// },function(req,res,next){
//     console.log("++++++");
//     res.end();
// });
app.use("/",function(req, res, next){
    res.locals.session = req.session;
    console.log("2323");
    res.send(req.session.name);
});
app.listen(8800);