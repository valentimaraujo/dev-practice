const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

server.listen(3000, () => {
    console.log('Listening on %d', server.address().port);
});
