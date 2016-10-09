import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { statusRouting, statusRoutingProviders } from './status.routing';

import { StatusComponent } from './status.component';
import { LatencyClientComponent } from "./shared";
import { LatencyTagComponent } from "./shared";


@NgModule({
    imports: [statusRouting, CommonModule],
    providers: [statusRoutingProviders],
    declarations: [StatusComponent, LatencyTagComponent, LatencyClientComponent]
})
export class StatusModule {
    constructor() {}
}
