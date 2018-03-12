let uuid = 13;

const tagPool = ["Entertainment", "Education", "Finance", "Politics", "Sports", "Technology"];
const linkPool = ["https://muratbuffalo.blogspot.com/2018/02/paper-review-ipfs-content-addressed.html",
"https://www.troyhunt.com/ive-just-launched-pwned-passwords-version-2/",
"https://puri.sm/posts/the-great-purism-dns-outage-of-2018/",
"https://www.quantamagazine.org/why-self-taught-artificial-intelligence-has-trouble-with-the-real-world-20180221/"];
let titlePool = ["Paper review. IPFS: Content addressed, versioned, P2P file system",
"I've Just Launched \"Pwned Passwords\" V2 With Half a Billion Passwords for Download",
"The Great Puri.sm Outage of 2018","Why Self-Taught Artificial Intelligence Has Trouble With the Real World"];

const createLink = (url, title, tags = null, summary = "summary") => {
    console.log("createLink",url,title,tags,summary);
    let Link = {};
    Link.id = uuid++;
    Link.title = title;
    Link.url = url;
    Link.summary = summary;
    Link.tags = [];
    Link.vote = Math.floor(Math.random()*1000);
    if(tags === null){
        Link.tags = generateTags();
    }else{
        Link.tags.push(tags);
    }
    return Link;
}

const generateTags = () => {
    let tag = [];
    for(let i = 0; i < tagPool.length; i++){
        if(Math.random() >= 0.6){
            tag.push(tagPool[i]);
        }
    }
    return tag;
    // let t = tagPool[Math.floor(Math.random() * 4)];
    // //console.log("生成 tag"+t);
    // return t;
}

const initLinks = () => {
    let Links = {};
    for(let i = 0; i < linkPool.length; i++){
       let Link =  createLink(linkPool[i],titlePool[i]);
       Links[Link.id] = Link;
    }
    return Links;
}

module.exports = {
    initLinks,
    createLink,
    tagPool,
}
