/* -----------------------------------------------
/* Author : QuiteAFancyEmerald and YÖCTDÖNALD'S with help from MikeLime, SexyDuceDuce and Divide
/* MIT license: http://opensource.org/licenses/MIT
/* ----------------------------------------------- */

const
    express = require('express'),
    alloy = require('alloyproxy'),
    app = express(),
    http = require('http'),
    fs = require('fs'),
    path = require('path');

const config = JSON.parse(fs.readFileSync('./config.json', {
    encoding: 'utf8'
}));
 
const server = http.createServer(app);   

//Local Alloy Proxy
const unblocker = new alloy({
    prefix: '/fetch/',
    request: [],
    response: [],
    injection: true,
});    

app.use(unblocker.app);    

unblocker.ws(server);   

//Cloudflare Attack Mode Fix

app.post('/', async(req, res) => {
    switch (req.url) {
        case '/':
            return res.send(fs.readFileSync(path.join(__dirname, 'views', 'index.html'), 'utf8'));
    }
});


app.get('/', async (req, res) => {
 
    switch (req.url) {
        case '/':
            return res.send(fs.readFileSync(path.join(__dirname, 'views', 'index.html'), 'utf8'));
    }

    switch (req.url) {
        case '/?h':
            return res.send(fs.readFileSync(path.join(__dirname, 'views', 'pages', 'surf.html'), 'utf8'));
    }

});

app.use(express.static(path.join(__dirname, 'views')));

server.listen(process.env.PORT || config.port);