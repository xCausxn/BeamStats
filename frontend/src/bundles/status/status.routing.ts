import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatusComponent } from './status.component'

const statusRoutes: Routes = [
  { path: '', component: StatusComponent }
];

export const statusRoutingProviders: any[] = [

];

export const statusRouting: ModuleWithProviders = RouterModule.forChild(statusRoutes);