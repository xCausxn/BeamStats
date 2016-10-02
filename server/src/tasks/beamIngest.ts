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

export class BeamIngest {

    private server;
    private check$;
    private interval$ = Observable.interval(10000);

    constructor(server) {
        this.server = server;

        this.check$ = this.interval$.startWith(0)
            .mergeMap(() => this.getIngests())
            .mergeMap(res => {
                return Observable.forkJoin(
                    res.map(ingest => this.checkService(ingest))
                )
            })
            
        this.check$.subscribe(res => this.updateDB(res));
    }

    getIngests() {
        return Observable.defer(() => fetch('https://beam.pro/api/v1/ingests'))
            .mergeMap(res => res.json())
            .retry(3)
            .catch(() => Observable.of([]));
    }

    checkService(service) {
        return Observable.defer(() => getWsLatency(service.pingTest))
            .retry(3)
            .map(res => Object.assign({}, service, {status: !!res, latency: res}))
            .catch(() => Observable.of(Object.assign({}, service, {status: false, latency: -1})));
    }

    updateDB(services) {
        this.server.app.status.ingests = services;
    }
}