const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

const tagPool = ["Entertainment", "Education", "Finance", "Politics", "Sports", "Technology"];
const linkPool = ["https://muratbuffalo.blogspot.com/2018/02/paper-review-ipfs-content-addressed.html",
"https://www.troyhunt.com/ive-just-launched-pwned-passwords-version-2/",
"https://puri.sm/posts/the-great-purism-dns-outage-of-2018/",
"https://www.quantamagazine.org/why-self-taught-artificial-intelligence-has-trouble-with-the-real-world-20180221/"];
let titlePool = ["Paper review. IPFS: Content addressed, versioned, P2P file system",
"I've Just Launched \"Pwned Passwords\" V2 With Half a Billion Passwords for Download",
"The Great Puri.sm Outage of 2018","Why Self-Taught Artificial Intelligence Has Trouble With the Real World"];
let uuid = 13;
let LinksMap = initLinks();


function createLink(url, title, tag, summary){
    let Link = {};
    Link.id = uuid++;
    Link.title = title;
    Link.url = url;
    //Link.summary = 'summary';
    Link.vote = Math.floor(Math.random()*1000);
    if(typeof(tag) === "undefined"){
        Link.tag = generateTags();
    }else{
        Link.tag = tag;
    }
    return Link;
}

function generateTags(){
    // let tag = [];
    // for(let i = 0; i < tagPool.length; i++){
    //     if(Math.random() >= 0.6){
    //         tag.push(tagPool[i]);
    //     }
    // }
    // return tag;
    let t = tagPool[Math.floor(Math.random() * 4)];
    //console.log("生成 tag"+t);
    return t;
}


function initLinks(){
    let Links = {};
    for(let i = 0; i < linkPool.length; i++){
       let Link =  createLink(linkPool[i],titlePool[i]);
       Links[Link.id] = Link;
    }
    return Links;
}

app.use( express.static('../public') ); // serve any assets by their path under '/' directory (same dir as server.js)
app.use( bodyParser.json({ extended: true, type: '*/*' }) );



app.get("/data",(req, resp) => {
    resp.send(JSON.stringify(LinksMap));
});


app.post('/add',(req, resp) => {
    const title = req.body.title;
    const url = req.body.url;
    const tag = req.body.tag;
    const summary = req.body.summray;
    const Link = createLink(url, title, tag, summary);
    LinksMap[Link.id] = Link;
    resp.send(JSON.stringify(Link));
});

app.post('/edit',(req, resp) => {
    const id = req.body.id;
    let Link = LinksMap[id] ;
    Link.title = req.body.title;
    Link.tag = req.body.tag;
    Link.summary = req.body.summary;
    LinksMap[id] = Link;
    resp.send(JSON.stringify(Link));
});

app.post('/delete',(req, resp) => {
    const id = req.body.id;
    let Link = LinksMap[id];
    delete LinksMap[id];
    resp.send(JSON.stringify(Link));
});

app.post('/vote', (req, resp) => {
  const id = req.body.id;
  let Link = LinksMap[id] ;
  Link.vote += 1;
  resp.send(JSON.stringify(Link));
});

app.post('/unvote', (req, resp) => {
  const id = req.body.id;
  let Link = LinksMap[id] ;
  Link.vote -= 1;
  resp.send(JSON.stringify(Link));
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
