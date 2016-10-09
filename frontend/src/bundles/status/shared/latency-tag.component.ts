import { Component, Input } from '@angular/core';
@Component({
    selector: 'latency-tag',
    template: `
        <span *ngIf="latency >= 0" [class]="statusColor">{{latency}}ms</span>
        <i *ngIf="latency < 0" class="zmdi zmdi-hc-spin zmdi-spinner"></i>
    `,
    styles: [`

    `]
})
export class LatencyTagComponent {

    @Input() latency: number;

    constructor() {}

    get statusColor() {
        if(this.latency <= 60) return 'tag tag-success';
        if(this.latency >= 61 && this.latency <= 100) return 'tag tag-warning';
        if(this.latency >= 101) return 'tag tag-danger';
    }
}