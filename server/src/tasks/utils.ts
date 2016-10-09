import * as Websocket from 'ws';

export function getWsLatency(address: string) {
    const socket = new Websocket(address);
        let start;
        return new Promise((resolve, reject) => {
            socket.on('open', () => {
                start = Date.now();
                socket.send('ping');
            });
            socket.on('message', (msg) => {
                socket.close();
                return resolve(Date.now() - start)/2;
            });
            socket.on('error', (e) => {
                return reject();
            })
        });
}