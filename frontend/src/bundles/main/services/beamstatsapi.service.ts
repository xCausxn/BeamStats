import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BeamStatsApiService {

    private beamStatsApiRoot: string = 'http://localhost:8000/api';

    constructor(private http: Http) {
    }

    getStats() {
        return this.http.get(`${this.beamStatsApiRoot}/v1/status/`)
            .map(res => res.json() || {})
            .catch(this.handleError);
    }

    handleError(err: any) {
        let errMsg = (err.message) ? err.message :
            err.status ? `${err.status} - ${err.statusText}` : 'Server error';
        return Observable.throw(errMsg);
    }

}