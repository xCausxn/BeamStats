import { NgModule } from '@angular/core';

import { overviewRouting, overviewRoutingProviders } from './overview.routing';

import { OverviewComponent } from './overview.component';

@NgModule({
    imports: [overviewRouting],
    providers: [overviewRoutingProviders],
    declarations: [OverviewComponent]
})
export class OverviewModule {

}
