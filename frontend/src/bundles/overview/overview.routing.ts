import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverviewComponent } from './overview.component'

const overviewRoutes: Routes = [
  { path: '', component: OverviewComponent }
];

export const overviewRoutingProviders: any[] = [

];

export const overviewRouting: ModuleWithProviders = RouterModule.forChild(overviewRoutes);