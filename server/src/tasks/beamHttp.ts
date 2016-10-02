import * as fetch from 'node-fetch';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/defer';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';

export class BeamHttp {

    private server;
    private services = [
        {id: 'mainSite', name: 'Beam.pro Website', address: 'https://beam.pro'},
        {id: 'devSite', name: 'Beam.pro Developer Website', address: 'https://dev.beam.pro'},
        {id: 'apiEndpoint', name: 'Beam.pro API', address: 'https://beam.pro/api/v1/system/health'}
    ];
    private check$;
    private interval$ = Observable.interval(10000);

    constructor(server) {
        this.server = server;
        this.check$ = this.interval$.startWith(0)
            .map(() => this.services)
            .mergeMap(res => {
                return Observable.forkJoin(
                    res.map(service => this.checkService(service))
                );
            });
            
        this.check$.subscribe(res => this.updateDB(res));

    }

    checkService(service: any) {
        const start = Date.now();
        return Observable.defer(() => fetch(service.address))
            .retry(3)
            .map(res => Object.assign({}, service, {status: !!res.status, latency: Date.now() - start}))
            .catch((e) => Observable.of(Object.assign({}, service, {status: false, latency: -1})));
    }

    updateDB(services) {
        this.server.app.status.sites = services;
    }
}