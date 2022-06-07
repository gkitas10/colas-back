const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const cors = require('cors');

const path = require('path');

const app = express();
// const corsOptions = {
//     origin: 'https://localhost:3000',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }

app.use(cors())
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 4000;

app.use(express.static(publicPath));

// IO = esta es la comunicacion del backend
module.exports.io = socketIO(server, {
        cors: {
          origin: "http://localhost:3000",
          methods: ["GET", "POST"]
        }
});

require('./sockets/socket');

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});