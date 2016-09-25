import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component'
import { UserSearchComponent } from './search';
import { UserProfileComponent } from './profile';

const userRoutes: Routes = [
  { path: 'profile/:token', component: UserProfileComponent},
  { path: 'search', component: UserSearchComponent },
  { path: '', pathMatch: 'full', redirectTo: 'search'}
];

export const userRoutingProviders: any[] = [
];

export const userRouting: ModuleWithProviders = RouterModule.forChild(userRoutes);