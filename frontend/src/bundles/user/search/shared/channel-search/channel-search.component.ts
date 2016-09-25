import { Component } from '@angular/core';
import { BeamApiService } from '../../../../main/services';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'channel-search',
    templateUrl: './channel-search.component.html',
    styleUrls: ['./channel-search.component.scss'],
})
export class ChannelSearchComponent {
    public channels$ = new BehaviorSubject<string>('')
        .distinctUntilChanged()
        .debounceTime(300)
        .mergeMap(q => {
            return this.beamApi.getChannels({limit: 10, q, scope: 'names', fields: 'token,userId'});
        })
        .map(res => res)

    constructor(private beamApi: BeamApiService) {
    }

    getAvatar(id: number) {
        return `https://beam.pro/api/v1/users/${id}/avatar?w=64&h=64&v=0`;
    }
}