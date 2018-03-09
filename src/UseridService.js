let express = require('express');
let app = express();
let counter = 3;
let user = {
    "userid": 0
}

app.post('/UserId', function (req, res) {
    switch (counter) {
        case 1:
            counter = 2;
            break;
        case 2:
            counter = 3;
            break;
        case 3:
            counter = 1;
    }

    user["userid"] = counter;
    console.log(user);
    res.end(JSON.stringify(user));
});

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example UserID Service Call listening at http://%s:%s", host, port)

})