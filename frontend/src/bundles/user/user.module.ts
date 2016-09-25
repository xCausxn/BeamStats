import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { userRouting, userRoutingProviders } from './user.routing';

import { UserComponent } from './user.component';
import { UserProfileComponent } from './profile/';
import { UserSearchComponent } from './search/';
import { ChannelSearchComponent } from './search/shared';

@NgModule({
    imports: [ CommonModule, userRouting ],
    providers: [ userRoutingProviders ],
    declarations: [ UserComponent, UserProfileComponent, UserSearchComponent, ChannelSearchComponent ]
})
export class UserModule { }