/**
 * Created by admin on 2017/4/24.
 */
var express = require("express");
var session = require("express-session");
var path = require("path");
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
app.get('/',function(req,res){
    res.sendFile('public/hehe.html', { root:__dirname });
});
app.get('/session',function(req,res){
    if(req.session.hehe){
        res.sendFile( 'public/session.html' , { root:__dirname });
        req.session.hehe = false;
    }
    else{
        res.redirect("login");
    }

});
app.get('/login',function(req,res){
    res.sendFile( 'public/login.html' , { root:__dirname });

});
app.get("/welcome",function(req,res){
    if(req.session.name){
        res.sendFile( 'public/welcome.html' , { root:__dirname });
    }
    else{
        res.redirect("login");
    }
})
app.post("/welcome.html",function(req,res){
    var post = "";
    req.on("data",function(chuck){
        post += chuck;
    });
    req.on("end",function(){
        post = qs.parse(post);
        console.log(post);
        req.session.hehe = true;
        if(post.name==="fff"&&post.password==="111"){
            req.session.name = post.name;
            req.session.sign = "true";
            res.redirect("welcome");
        }
        else{
            setTimeout(function(){
                res.redirect("session");
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
app.post("/",function(req, res, next){
    res.locals.session = req.session;
    res.send(req.session);
});
app.listen(8800);