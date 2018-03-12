const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;

const link = require('./link');
const user = require('./user');
const debug = true;

app.use( express.static('../public') ); // serve any assets by their path under '/' directory (same dir as server.js)
app.use( bodyParser.json({ extended: true, type: '*/*' }) );


let LinksMap = link.initLinks();
let UsersMap = user.initUsers();
let UserId = 0; //返回
const returnUser = () => {
    const userid = (UserId++) % 3;
    return UsersMap[userid];
}


app.get("/data",(req, resp) => {
    resp.send(JSON.stringify({
        linksMap: LinksMap,
        user: returnUser(),
        tagPool: link.tagPool,
    }));
});


app.post('/add',(req, resp) => {   // 用户给予添加内容和用户id，服务器返回新的Link
    const title = req.body.title;
    const url = req.body.url;
    const tag = req.body.tag;
    const summary = req.body.summary;
    const Link = link.createLink(url, title, tag, summary);
    Link.vote = 0;
    LinksMap[Link.id] = Link;
    resp.status(200);
    resp.send(JSON.stringify(Link));
});

app.post('/edit',(req, resp) => { // 用户
    const id = req.body.id;
    let Link = LinksMap[id] ;
    Link.title = req.body.title;
    Link.tag = req.body.tag;
    Link.summary = req.body.summary;
    LinksMap[id] = Link;
    resp.send(JSON.stringify(Link));
});

app.post('/delete',(req, resp) => {
    const linkId = req.body.linkId;
    console.log("delete post data check -> ", linkId);
    let Link = LinksMap[linkId];
    delete LinksMap[linkId];
    resp.send(JSON.stringify({
        linkId:linkId,
    }));
});

app.post('/vote', (req, resp) => {
  const linkId = req.body.linkId;
  const userId = req.body.userId;
  console.log("votepart -> ", linkId, userId)
  let Link = LinksMap[linkId];
  let User = UsersMap[userId];
  Link.vote += 1;
  User.votedUrls.push(linkId);
  resp.send(JSON.stringify({
      Link: Link,
      User: User,
  }));
});

app.post('/unvote', (req, resp) => {
    const linkId = req.body.linkId;
    const userId = req.body.userId;
    let Link = LinksMap[linkId];
    let User = UsersMap[userId];
    const votedIndex = User.votedUrls.indexOf(linkId);
    Link.vote -= 1;
    User.votedUrls.splice(votedIndex,1);
    resp.send(JSON.stringify({
        Link: Link,
        User: User,
    }));
});

app.post('/title',(req,resp) => {
   // const url = "http://cloudplatform.googleblog.com/2018/02/how-Google-Cloud-Storage-offers-strongly-consistent-object-listing-thanks-to-Spanner.html";
   const url = "https://blog.cryptographyengineering.com/2018/01/16/icloud-in-china/";
   let h;
    if(url.startsWith("https")){
        h = https;
    }else{
        h = http;
    }
    h.get(url,function(res){
        var html = ""; //用来储存整个页面的html内容
        res.setEncoding("utf-8");//防止中文乱码
        res.on('data',function(chunk){
            html  += chunk;

        }
        );//监听data事件，每次取一块数据
        res.on('end',function(){
            //console.log(html);
            let $ = cheerio.load(html);//用cheerio模块解析html

            var author = $(".panel_body #blog_userface .user_name").text().trim();//获取文章的作者

            var title = $("title").text().trim();//获取文章的标题

           // var link = $(".atrcwtitle .contenttitle a").attr("href");//获取文章的网页地址

            let newitem = {};
            newitem.title = title;
           // newitem.link = link;
            console.log(newitem);
            resp.send(JSON.stringify(newitem));});//监听end事件，如果整个网页内容都获取完毕，执行回调函数

    }).on('error',function (err) {
        console.log(err);
    });
});

app.listen(PORT, () => {  // this will start the server waiting for incoming requests
    console.log(`Server listening at http://localhost:${PORT}`);
    console.log('use Ctrl-C to stop this server');
  });