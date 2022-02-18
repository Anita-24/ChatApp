const express = require('express');
const app = express();
const server = require('http').createServer(app);
const PORT = process.env.PORT || 3000;

const io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

app.get('/' , (req,res)=>{
    res.sendFile(__dirname + '/index.html');
});


server.listen(PORT , ()=>{
    console.log(`LISTENING ON PORT:${PORT}`);
});

//Socket

io.on('connection' , (socket)=>{
    console.log('connected');

    socket.on('message' , (msg)=>{
        // console.log(msg);
        socket.broadcast.emit('message' , msg)
    })
})