import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeamApiService } from '../main/services';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

@Component({
    selector: 'beamstats-ranking',
    templateUrl: './ranking.component.html',
    styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

    public ranking$;

    constructor(private beamApi: BeamApiService, private r: ActivatedRoute) {
        this.ranking$ = r.params.map(res => res['order'])
            .mergeMap(order => beamApi.getChannels({order: `${order}:desc`}))
    }

    ngOnInit() { 

    }


    getChannelUrl(token: string) {
        return `https://beam.pro/${token}`;
    }

}