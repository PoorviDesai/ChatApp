const express = require("express");
//setting an app variable and setting it equal to 
//an instance of express function
const app = express();
const http = require("http");
const cors = require("cors");
//cors library is imp as socket.io library has bunch of issues with it..
//so we need cors
const server = http.createServer(app);
//it should generate server for us

//import class Server from socket.io library
const { Server } = require("socket.io");
 
//pass first the server created
//to solve cors issues creating an object here we can resolve
//by specifying the credentials and other settings we want

//using cors middleware
app.use(cors());


//instantiate this server by creating io and then creating object in it
const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000",
        //telling which server will be calling and making requests to socketio 
        //server..in our case react app
        //now specifying methods we accept
        methods: ["GET", "POST"],
    },
});


io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    //create an event
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID : ${socket.id} joined room : ${data}`)
      //data grabbed from frontend

    })

    socket.on("send_message", (data) => {
        //console.log(data);
        socket.to(data.room).emit("receive_message", data);
    })

    //a listening event to disconnect at the end of connection
    socket.on("disconnect", ()=> {
        console.log("User Disconnected", socket.id);
    });

});





server.listen(3001, () => {
    console.log("SERVER RUNNING!");
})
//callbaxk function to check when the server runs
//pass ports which you want the app to listen to


