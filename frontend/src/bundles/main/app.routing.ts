import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'overview' },
  { path: 'overview', loadChildren: 'overview#OverviewModule'},
  { path: 'ranking', loadChildren: 'ranking#RankingModule'},
  { path: 'user', loadChildren: 'user#UserModule'},
  { path: 'status', loadChildren: 'status#StatusModule'},
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);