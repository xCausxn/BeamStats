import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from "rxjs/Observable";

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BeamApiService {
    
    private beamApiRoot: string = 'https://beam.pro/api';

    constructor(private http: Http) {}

    getChannel(id: string | number) {
        return this.http.get(`${this.beamApiRoot}/v1/channels/${id}`)
            .map(res => res.json() || {})
            .catch(this.handleError);
    }

    getChannels(params: ChannelsParams) {
        const search: URLSearchParams = new URLSearchParams();
        for(let [index, item] of Object.entries(params)) {
            search.set(index, item);
        }
        return this.http.get(`${this.beamApiRoot}/v1/channels`, {search})
            .map(res => res.json() || [])
            .catch(this.handleError);
    }

    getEndpoint(endpoint: string, params?: ChannelsParams) {
        const search: URLSearchParams = new URLSearchParams();
        if(params) {
            for(let [index, item] of Object.entries(params)) {
                search.set(index, item);
            }
        }
        return this.http.get(`${this.beamApiRoot}${endpoint}`, {search})
            .catch(this.handleError);
    }

    handleError(err: any) {
        let errMsg = (err.message) ? err.message :
            err.status ? `${err.status} - ${err.statusText}` : 'Server error';
        return Observable.throw(errMsg);
    }

}

export interface ChannelsParams {
    page?: number,
    limit?: number,
    where?: string,
    fields?: string,
    order?: string,
    q?: string,
    scope?: string
}