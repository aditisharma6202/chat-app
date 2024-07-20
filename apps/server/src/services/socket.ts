import {Server} from 'socket.io'

class SocketService {
    private _io: Server;
    constructor(){
        console.log("Init socket server")
        this._io = new Server();
    }
    public initListners(){
        console.log("Initializing socket listeners")
        const io =this.io;
        io.on("connect",(socket)=>{
            console.log("New Socket Connected", socket.id);
            socket.on("event:message", async({message}:{message:string})=>{
                console.log("New message recieved", message);
            })
        })
    }
    get io(){
        return this._io;
    }
}
export default SocketService;