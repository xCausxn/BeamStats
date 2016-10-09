import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Component({
    selector: 'latency-client',
    template: `
        <latency-tag [latency]="latency$ | async"></latency-tag>
    `,
})
export class LatencyClientComponent implements OnInit {

    @Input() ingest: string;

    public latency$ = new BehaviorSubject<number>(-1);
    private pings = [];
    private maxPings = 5;
    private socket;

    constructor() {
    }

    ngOnInit() {
        this.socket = new WebSocket(this.ingest);
        this.socket.onopen = () => {
            this.pingWS();
        };
    }

    pingWS() {
        if(this.pings.length === this.maxPings) {
            this.latency$.next(this.avgLatency);
            return this.socket.close();
        }
        let start = Date.now();
        this.socket.send('ping');
        this.socket.onmessage = () => {
            this.pings.push((Date.now() - start) / 2);
            return this.pingWS();
        };
        this.socket.onerror = () => {
            return this.pingWS();
        };
    }

    get avgLatency() {
        return Math.round(this.pings.reduce((a, b) => { return a + b; }, 0) / this.pings.length);
    }
}