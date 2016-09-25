import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/startWith';

import { BeamApiService } from '../../main/services';


@Component({
    selector: 'live-stat',
    template: `
        {{statistic$ | async}}
    `
})
export class StatComponent implements OnInit {


    @Input() endpoint: string = '/v1/channels';
    @Input() params: Object = {};
    @Input() interval: number  = 5000;

    public statistic$;

    constructor(private beamApi: BeamApiService) {}

    ngOnInit() { 
        const defaults = {
            limit: 1
        };
        this.statistic$ = Observable.interval(this.interval).startWith(0)
            .mergeMap(() => this.beamApi.getEndpoint(`${this.endpoint}`, Object.assign(defaults, this.params)))
            .map(res => res.headers.get('x-total-count') || res.json().length);
    }

}