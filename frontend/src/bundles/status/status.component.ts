import { Component, OnInit } from '@angular/core';
import { BeamStatsApiService } from "../main/services";

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/startWith';

@Component({
    selector: 'beamstats-status',
    templateUrl: 'status.component.html',
    styleUrls: ['status.component.scss']
})
export class StatusComponent implements OnInit {

    public status$;
    constructor(private bstatsApi: BeamStatsApiService) {
    }

    ngOnInit() { 
        this.status$ = Observable.interval(20000).startWith(0)
            .mergeMap(() => this.bstatsApi.getStats())
            .do((res: {ingests: any[]}) => res.ingests = res.ingests.sort((a, b) => a['name'].localeCompare(b['name'])))
            .publishReplay(1)
            .refCount()
    }

}