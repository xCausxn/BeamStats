import * as fetch from 'node-fetch';
import * as Websocket from 'ws';

import { getWsLatency } from './utils';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/defer';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';

export class BeamSockets {

    private server;

    // TODO: Make this more dynamic so more sockets can be added later
    private services = [
        {id: 'constellation', name: 'Constellation', address: 'wss://constellation.beam.pro'},
    ];

    private check$;
    private interval$ = Observable.interval(10000);

    constructor(server) {
        this.server = server;

        this.check$ = this.interval$.startWith(0)
            .mergeMap(() => this.getChatServers())
            .mergeMap(res => {
                const services = [...res, ...this.services];
                return Observable.forkJoin(
                    services.map(socket => this.checkService(socket))
                )
            })
            
        this.check$.subscribe(res => this.updateDB(res));
    }

    getChatServers() {
        return Observable.defer(() => fetch('https://beam.pro/api/v1/chats/endpoints'))
            .mergeMap(res => res.json())
            .map(res => {
                return res.map((url, i) => {
                    const id = url.match(/((\w+(\d))-(.*?))\.beam\.pro/)[0];
                    return {id, name: id, address: url};
                });
            })
            .retry(3)
            .catch(() => Observable.of([]));
    }

    checkService(service) {
        return Observable.defer(() => getWsLatency(service.address))
            .retry(3)
            .map(res => Object.assign({}, service, {status: !!res}))
            .catch(() => Observable.of(Object.assign({}, service, {status: false})));
    }

    updateDB(services) {
        this.server.app.status.sockets = services;
    }
}