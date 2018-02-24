const tagPool = ["Entertainment", "Education", "Finance", "Politics", "Sports", "Technology"];
const linkPool = ["https://muratbuffalo.blogspot.com/2018/02/paper-review-ipfs-content-addressed.html",
"https://www.troyhunt.com/ive-just-launched-pwned-passwords-version-2/",
"https://puri.sm/posts/the-great-purism-dns-outage-of-2018/",
"https://www.quantamagazine.org/why-self-taught-artificial-intelligence-has-trouble-with-the-real-world-20180221/"];
let uuid = 0;
let LinksMap = initLinks();


function createLink(url, title, tag, summary){
    let Link = {};
    Link.id = uuid++;
    Link.title = title;
    Link.url = url;
    Link.summary = summary;
    Link.vote = Math.floor(Math.random()*1000);
    if(typeof(pi) === "undefined"){
        Link.tag = generateTags();
    }else{
        Link.tag = tag;
    }
    return Link;
}

function generateTags(){
    let tag = [];
    for(let i = 0; i < tagPool.length; i++){
        if(Math.random() >= 0.6){
            tag.push(tagPool[i]);
        }
    }
    return tag;
}


function initLinks(){
    let Links = {};
    for(let i = 0; i < linkPool.length; i++){
       let Link =  createLink(linkPool[i]);
       Links[Link.id] = Link;
    }
    return Links;
}


module.exports = {
    LinksMap,
};
