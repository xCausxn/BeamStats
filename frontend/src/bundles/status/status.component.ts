import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { BeamStatsApiService } from "../main/services";
import { orderBy } from 'lodash';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/startWith';

@Component({
    selector: 'bs-status',
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
            .publishReplay(1)
            .refCount();
    }

}


@Pipe({ name: 'orderBy', pure: false })
export class OrderByPipe implements PipeTransform {
    transform(array: any[], keys: string[], ) {
        return orderBy(array, keys);
    }
}