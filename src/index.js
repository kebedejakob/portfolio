/**
 *  This file is part of the boilerplate. You do NOT need to understand this. In time, you will.
 */

// Hello my name is Matt

const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

const app = express();
const router = express.Router();

app.use(connectLivereload());

// Allow clients to reach the following folder contents:
app.use("/style", express.static(__dirname + '/style'));
app.use("/img", express.static(__dirname + '/img'));
app.use("/fonts", express.static(__dirname + '/fonts'));
app.use("/scripts", express.static(__dirname + '/scripts'));
app.use("/cv", express.static(__dirname + '/cv'));
dotenv.config(express.static(__dirname + '../.env')) 

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, '/style'));
liveReloadServer.watch(path.join(__dirname, '/img'));
liveReloadServer.watch(path.join(__dirname, '/fonts'));
liveReloadServer.watch(path.join(__dirname, '/scripts'));
liveReloadServer.watch(path.join(__dirname, '/cv'));

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

//add the router
app.use('/', router);
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, function () {
	console.log(`App listening on port ${HOST}:${PORT}`);
  liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

});



