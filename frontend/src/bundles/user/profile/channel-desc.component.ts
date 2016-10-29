import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'bs-channel-desc',
    template: `
        <p [innerHTML]="description"></p>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styles: [`
        img { max-width: 100%; }
    `]
})
export class ChannelDescComponent {

    @Input() description: string;

    constructor() {}

}