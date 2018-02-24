const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

const dataModule = require('./LINK');
let LinksMap = dataModule.LinksMap;


app.use( express.static('public') ); // serve any assets by their path under 'public' directory
app.use( bodyParser.json({ extended: true, type: '*/*' }) );



app.get("/data",(req, resp) => {
    resp.send(JSON.stringify(LinksMap));
});


app.post('/add',(req, resp) => {
    const id = req.body.id;
    LinksMap[id] = req.body;
    resp.send('OK');
});

app.post('/edit',(req, resp) => {
    const id = req.body.id;
    LinksMap[id] = req.body;
    resp.send('OK');
});

app.post('/delete',(req, resp) => {
    const id = req.body.id;
    // const link = req.body;
    // console.log(link);
    delete LinksMap[id];
    resp.send('OK');
    //
});

app.post('/vote', (req, resp) => {
    const Link = req.query.Link;
    // add vote change function

});

app.listen(PORT, () => {  // this will start the server waiting for incoming requests
    console.log(`Server listening at http://localhost:${PORT}`);
    console.log('use Ctrl-C to stop this server');
  });