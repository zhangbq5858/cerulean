let uuid = 13;

const tagPool = ["Entertainment", "Education", "Finance", "Politics", "Sports", "Technology"];
const linkPool = [
    "https://www.yelp.com/search?find_desc=Best+Chinese+Food&find_loc=Seattle%2C+WA",
    "https://defenders.org/elephant/basic-facts",
    "https://www.seattlefishguys.com/",
    "https://www.youtube.com/watch?v=hY7m5jjJ9mM",
    "https://lionheadrabbit.com/about-lionhead/appearance/",
    "https://lionheadrabbit.com/",
    "https://techcrunch.com/",
    "https://www.feedspot.com/",
    "https://www.feedspot.com/",
    "http://www.eonline.com/",
    "https://www.miniclip.com/games/en/",
    "https://www.scholastic.com/teachers/bookwizard/",
    "https://muratbuffalo.blogspot.com/2018/02/paper-review-ipfs-content-addressed.html",
    "https://www.troyhunt.com/ive-just-launched-pwned-passwords-version-2/",
    "https://puri.sm/posts/the-great-purism-dns-outage-of-2018/",
    "https://www.quantamagazine.org/why-self-taught-artificial-intelligence-has-trouble-with-the-real-world-20180221/"];
let titlePool = [
    "Best chinese food Seattle, WA - Yelp",
    "Elephant | Basic Facts About Elephants | Defenders of Wildlife",
    "Seattle Fish Guys (Home Page)",
    "CATS will make you LAUGH YOUR HEAD OFF",
    "How does a lionhead rabbit look like?",
    "Lionhead Rabbit | How to Care, Diet, Lifespan, FAQ (With Pictures)",
    "Tech Crunch",
    "SportsFlashes",
    "Go SecSports ",
    "Hail to the King: E! Online",
    "A great place for game - Miniclip. ",
    "Best for Finding Books",
    "Paper review. IPFS: Content addressed, versioned, P2P file system",
    "I've Just Launched \"Pwned Passwords\" V2 With Half a Billion Passwords for Download",
    "The Great Puri.sm Outage of 2018","Why Self-Taught Artificial Intelligence Has Trouble With the Real World"];
let summaryPool = [
    "Reviews on Best chinese food in Seattle, WA - Zheng Cafe, A + Hong Kong Kitchen, Harbor City Restaurant, Magic Dragon, Sichuanese Cuisine, Fu Shen, Red Lantern, Xi'an Noodles, Din Tai Fung, Chef Liao Asian Fusion Cuisine",
    "Habitat loss is one of the key threats facing elephants. Many climate change projections indicate that key portions of elephants’ habitat will become significantly hotter and drier, resulting in poorer foraging conditions and threatening calf survival. Increasing conflict with human populations taking over more and more elephant habitat and poaching for ivory are additional threats that are placing the elephant’s future at risk.",
    "Located in the heart of the Central District, Seattle Fish Guys is a premium seafood market & restaurant serving up fresh salmon, poke, sashimi and more.",
    "Cats are amazing creatures because they make us laugh all the time! Watching funny cats is the hardest try not to laugh challenge! Just look how all these cats & kittens",
    "At first sight the Lionhead rabbit is like all other dwarf rabbits. The rabbit belongs to the more tiny and smaller rabbit breeds. Nevertheless, they do have a unique feature why many people fell in love with this relatively new breed. Around their head, chin, chest and occasionally their skirts(flanks) they are covered with an amazing mane of wool. The rabbit weighs on average; between 2,5 and 3,5 pounds. The length of their mane is on average 2-3 inch and forms a kind of “V”. It is possible that they also have transitional wool around their hindquarters.",
    "The Lionhead Rabbit is a relatively new rabbit breed within the United States of America. Although the breed had been imported around 1998, it was not until 2014 that the American Rabbit Breeders Association (ARBA) approved the Lionhead Rabbit as an officially recognized breed. In contrast, the United Kingdom’s British Rabbit Council (BRC) already recognized all known colours and varieties of the breed, in 2002.",
    "Tech Crunch is considered as one of the well known and popular website for providing quality information related to new gadgets and technology news. Also, Tech Crunch is one of the leading technology media on the internet as well as one of the most famous technology blog online. Mainly this provides articles related to internet portals, latest tech product reviews and news etc.",
    "Get World of Sports Latest News and Live Score in your own Language English, Live Sports News, Sports Updates on sports events, live scores, commentary, cricket, football, tennis, athletics, Olympics, IPL and All The World Sports.",
    "Comprehensive coverage of SEC football, basketball, baseball and more, including live games, scores, schedules, standings and news",
    "Eonline is the most popular entertainment news source, providing us with information about almost everything that deals with the entertainment world. ",
    "There are hundreds of free online games at Miniclip and many of them are original games that are only available through the Miniclip website. ",
    "Use Scholastic’s Book Wizard to level your classroom library, discover resources for the books you teach, and find books at just the right level for students with Guided Reading, Lexile® Measure, and DRA levels for children's books.",
    "aaaaaaaaaaaaaa","bbbbbbbbbbbbbb","cccccccccccccc","dddddddddddddd"];

const createLink = (url, title, tags = null, summary = "summary") => {
    console.log("createLink",url,title,tags,summary);
    let Link = {};
    Link.id = uuid++;
    Link.title = title;
    Link.url = url;
    Link.summary = summary;
    Link.tags = tags;
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
       let Link =  createLink(linkPool[i],titlePool[i],null,summaryPool[i]);
       Links[Link.id] = Link;
    }
    return Links;
}

module.exports = {
    initLinks,
    createLink,
    tagPool,
}
