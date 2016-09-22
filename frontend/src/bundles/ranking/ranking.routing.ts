import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RankingComponent } from './ranking.component'

const rankingRoutes: Routes = [
  { path: ':order', component: RankingComponent },
  { path: '', pathMatch: 'full', redirectTo: 'viewersTotal' }
];

export const rankingRoutingProviders: any[] = [

];

export const rankingRouting: ModuleWithProviders = RouterModule.forChild(rankingRoutes);