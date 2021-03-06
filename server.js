const express = require('express');
const jsonServer = require('json-server');
const server = express();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'coins.json'));
var PORT = process.env.SERVERPORT || 3001;

server.use('/api/v1', router);

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(path.join(__dirname, 'build')));
  server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
  });
} else {
  server.use(express.static('public'));
  server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });
}

server.listen(PORT, function() {
  console.log(`API Server now listening on PORT ${PORT}`);
});
