import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { userRouting, userRoutingProviders } from './user.routing';

import { UserProfileComponent, ChannelDescComponent } from './profile/';
import { UserSearchComponent } from './search/';
import { ChannelSearchComponent } from './search/shared';

@NgModule({
    imports: [ CommonModule, userRouting ],
    providers: [ userRoutingProviders ],
    declarations: [ UserProfileComponent, UserSearchComponent, ChannelSearchComponent, ChannelDescComponent ]
})
export class UserModule { }