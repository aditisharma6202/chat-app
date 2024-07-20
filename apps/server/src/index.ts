import http from "http"
import Socketservice from "./services/socket"
async function init(){
    const socketService = new Socketservice;
    const httpServer = http.createServer();
    const PORT = process.env.PORT ?? 4000;
    socketService.io.attach(httpServer);
    httpServer.listen(PORT,()=>{console.log(`HTTP Server running on port ${PORT}`)})
}
init() 