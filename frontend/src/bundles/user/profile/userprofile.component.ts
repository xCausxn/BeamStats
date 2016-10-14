import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/publishReplay';

import { BeamApiService } from '../../main/services';


@Component({
    selector: 'user-profile',
    templateUrl: './userprofile.component.html',
    styleUrls: ['./userprofile.component.scss']
})
export class UserProfileComponent implements OnInit {

    public channel$;

    constructor(private r: ActivatedRoute, private beamApi: BeamApiService) {}

    ngOnInit() { 
        this.channel$ = this.r.params.map(res => res['token'])
            .mergeMap(res => this.beamApi.getChannel(res))
            .publishReplay(1)
            .refCount()
    }

}