const tagPool = ["Entertainment", "Education", "Finance", "Politics", "Sports", "Technology"];
const linkPool = ["https://muratbuffalo.blogspot.com/2018/02/paper-review-ipfs-content-addressed.html",
"https://www.troyhunt.com/ive-just-launched-pwned-passwords-version-2/",
"https://puri.sm/posts/the-great-purism-dns-outage-of-2018/",
"https://www.quantamagazine.org/why-self-taught-artificial-intelligence-has-trouble-with-the-real-world-20180221/"];
let LinksMap = new Map();
let urlID = 0;

function createLink(url,[title, tag, summary]){
    let Link = {};
    Link.id = urlID++;
    Link.title = title;
    Link.url = url;
    Link.summary = summary;
    if(tag === null){
        Link.tag = generateTags();
    }else{
        Link.tag = tag;
    }
    Links.set(Link.id, Link);
}

function generateTags(){
    return tagPool[Math.floor(Math.random()*tagPool.length)];
}