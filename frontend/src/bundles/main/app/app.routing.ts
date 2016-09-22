import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../+home/'

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'overview', loadChildren: () => System.import('../../overview').then(res => res.OverviewModule)},
  { path: 'ranking', loadChildren: () => System.import('../../ranking').then(res => res.RankingModule)}
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);