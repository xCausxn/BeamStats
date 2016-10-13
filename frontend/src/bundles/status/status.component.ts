import { Component, OnInit } from '@angular/core';
import { BeamStatsApiService } from "../main/services";

import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


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
        this.status$ = this.bstatsApi.getStats()
            .do((res: {ingests: any[]}) => res.ingests = res.ingests.sort((a, b) => a['name'].localeCompare(b['name'])))
            .publishReplay(1)
            .refCount()
    }

}