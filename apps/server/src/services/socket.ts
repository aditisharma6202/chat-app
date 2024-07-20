import {Server} from 'socket.io'
import Redis  from 'ioredis';

const pub = new Redis(
   { host:'caching-eb2d3db-aditi6202-0280.i.aivencloud.com',
    port:20900,
    username:'default',
    password:'your_pass'
    }
);
const sub = new Redis( 
    { host:'caching-eb2d3db-aditi6202-0280.i.aivencloud.com',
    port:20900,
    username:'default',
    password:'your_pass'
}
);

class SocketService {
    private _io: Server;
    constructor(){
        console.log("Init socket server")
        this._io = new Server({
            cors:{
                allowedHeaders:['*'],
                origin:'*'
            }
        });
        sub.subscribe('MESSAGES')
    }
    public initListners(){
        console.log("Initializing socket listeners")
        const io =this.io;
        io.on("connect",(socket)=>{
            console.log("New Socket Connected", socket.id);
            socket.on("event:message", async({message}:{message:string})=>{
                console.log("New message recieved", message);
           
                await pub.publish('MESSAGES',JSON.stringify({message}))
            })
        })
        sub.on('message',(channel,message)=>{
            if(channel === 'MESSAGES'){
                io.emit("message", message)
            }
        })
    }
    get io(){
        return this._io;
    }
}
export default SocketService;