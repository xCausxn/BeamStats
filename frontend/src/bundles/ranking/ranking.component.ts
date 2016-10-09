import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeamApiService } from '../main/services';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Component({
    selector: 'beamstats-ranking',
    templateUrl: './ranking.component.html',
    styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

    public ranking$;
    public title: string;
    constructor(private beamApi: BeamApiService, private r: ActivatedRoute) {
        
    }

    ngOnInit() { 
        this.ranking$ = this.r.params.map(res => {
                this.title = res['order'];
                return res['order'];
            })
            .mergeMap(order => this.beamApi.getChannels({order: `${order}:desc`, limit: 100, fields: 'token,partnered,numFollowers,viewersTotal,user'}))
    }


    getChannelUrl(token: string) {
        return `https://beam.pro/${token}`;
    }

}



@Pipe({
    name: 'rankType'
})
export class RankTypePipe implements PipeTransform {

    transform(value: string) {
        const types = {
            'numFollowers': 'Followers',
            'viewersTotal': 'Total Views',
            'viewersCurrent': 'Current Viewers'
        };
        return types[value] || value;
    }

}