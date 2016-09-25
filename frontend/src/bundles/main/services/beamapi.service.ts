import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class BeamApiService {
    
    private beamApiRoot: string = 'https://beam.pro/api';

    constructor(private http: Http) {}

    getChannel(id: string | number) {
        return this.http.get(`${this.beamApiRoot}/v1/channels/${id}`)
            .map(res => res.json());
    }

    getChannels(params: ChannelsParams) {
        const search: URLSearchParams = new URLSearchParams();
        for(let [index, item] of Object.entries(params)) {
            search.set(index, item);
        }
        return this.http.get(`${this.beamApiRoot}/v1/channels`, {search})
            .map(res => res.json());
    }

    getEndpoint(endpoint: string, params?: ChannelsParams) {
        const search: URLSearchParams = new URLSearchParams();
        if(params) {
            for(let [index, item] of Object.entries(params)) {
                search.set(index, item);
            }
        }
        return this.http.get(`${this.beamApiRoot}${endpoint}`, {search});
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