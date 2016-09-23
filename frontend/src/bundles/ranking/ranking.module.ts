import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { rankingRouting, rankingRoutingProviders } from './ranking.routing';

import { RankingComponent } from './ranking.component';

@NgModule({
    imports: [rankingRouting, CommonModule],
    providers: [rankingRoutingProviders],
    declarations: [RankingComponent]
})
export class RankingModule {
    constructor() {}
}
