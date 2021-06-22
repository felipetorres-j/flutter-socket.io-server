const express = require('express');
require('dotenv').config();
const path = require('path');

//App de express
const app = express();

//Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server, {
    cors: {
      origin: "*",
    },});
require('./sockets/socket');



//Path publico
const publicPath = path.resolve( __dirname, 'public')

app.use(express.static(publicPath));

server.listen( process.env.PORT, (err ) => {
    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto', 3000);
});