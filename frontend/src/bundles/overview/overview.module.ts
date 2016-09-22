import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { overviewRouting, overviewRoutingProviders } from './overview.routing';

import { OverviewComponent } from './overview.component';
import { StatComponent } from './shared';

@NgModule({
    imports: [overviewRouting, CommonModule],
    providers: [overviewRoutingProviders],
    declarations: [OverviewComponent, StatComponent]
})
export class OverviewModule {

}
