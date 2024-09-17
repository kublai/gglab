import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
app.use(express.static('js'));
app.use('/img', express.static('img'));
const server = createServer(app);
const io = new Server(server);
const maxData = 10000;
const __dirname = dirname(fileURLToPath(import.meta.url));


app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on("message event", (msg)=>{
        console.log(msg);
    });
});

//broadcast a message to connected clients every second
setInterval(function(){
    io.emit("server message","Data: " + Math.floor(Math.random() * maxData));
},2000);

server.listen(3000, () => {
  console.log('server in http://localhost:3000');
});
