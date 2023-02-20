import io, {Socket} from "socket.io-client";

const {REACT_APP_SOCKET_IO_PATH, REACT_APP_SOCKET_IO_HOST} = process.env;

class SocketClass {
    private socket: Socket;

    constructor() {
        this.socket = io(REACT_APP_SOCKET_IO_HOST ? REACT_APP_SOCKET_IO_HOST : 'http://localhost:9000',
            {path: REACT_APP_SOCKET_IO_PATH ? REACT_APP_SOCKET_IO_PATH : "/events/socket.io"})
        this.socket.on('broadcast', (dataFromServer: any) => {
            console.log(dataFromServer);
        });

    }

    listenToEvent(topic: string, callback: (dataFromServer: any) => void) {
        this.socket.on(topic, callback);
    }
}

const socketIO = new SocketClass()
export default socketIO;
